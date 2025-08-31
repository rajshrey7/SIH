"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, WifiOff, Download, CheckCircle, AlertCircle } from "lucide-react"
import { offlineService } from "@/lib/offline"

export function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'pending'>('synced')
  const [offlineCount, setOfflineCount] = useState(0)

  useEffect(() => {
    // Check initial online status
    setIsOnline(offlineService.isOnline())

    // Setup listeners for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      syncOfflineData()
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check offline data count
    updateOfflineCount()

    // Check sync status periodically
    const interval = setInterval(() => {
      updateOfflineCount()
    }, 5000)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [])

  const updateOfflineCount = () => {
    const unsyncedData = offlineService.getStoredData().filter(item => !item.synced)
    setOfflineCount(unsyncedData.length)
    setSyncStatus(unsyncedData.length > 0 ? 'pending' : 'synced')
  }

  const syncOfflineData = async () => {
    if (!isOnline) return

    setSyncStatus('syncing')
    try {
      await offlineService.syncData()
      updateOfflineCount()
    } catch (error) {
      console.error('Sync failed:', error)
    } finally {
      setSyncStatus('synced')
    }
  }

  const downloadContentForOffline = async () => {
    // Simulate downloading content for offline use
    const modules = [
      { id: 'science-photosynthesis', title: 'Photosynthesis Adventure', size: '2.5 MB' },
      { id: 'math-geometry', title: 'Geometry Quest', size: '1.8 MB' },
      { id: 'tech-python', title: 'Python Basics', size: '3.2 MB' },
      { id: 'engineering-machines', title: 'Simple Machines', size: '2.1 MB' }
    ]

    // In a real app, this would download and cache actual content
    console.log('Downloading content for offline use:', modules)
    
    // Store download info in localStorage
    localStorage.setItem('downloaded_modules', JSON.stringify(modules))
    alert('Content downloaded successfully! You can now access it offline.')
  }

  const getDownloadedModules = () => {
    if (typeof window === 'undefined') return []
    try {
      const downloaded = localStorage.getItem('downloaded_modules')
      return downloaded ? JSON.parse(downloaded) : []
    } catch {
      return []
    }
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-600" />
                <span className="text-red-600">Offline</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {syncStatus === 'syncing' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Syncing...
                </Badge>
              )}
              {syncStatus === 'pending' && offlineCount > 0 && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {offlineCount} items to sync
                </Badge>
              )}
              {syncStatus === 'synced' && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Synced
                </Badge>
              )}
            </div>
            {syncStatus === 'pending' && isOnline && (
              <Button size="sm" onClick={syncOfflineData}>
                Sync Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Offline Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Offline Content
          </CardTitle>
          <CardDescription>
            Download learning modules to access them without internet connection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={downloadContentForOffline} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download All Modules
          </Button>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Downloaded Modules:</h4>
            {getDownloadedModules().length > 0 ? (
              getDownloadedModules().map((module: any) => (
                <div key={module.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{module.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{module.size}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4" />
                No modules downloaded for offline use
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Offline Info */}
      {!isOnline && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium text-sm">
                You're currently offline. Your progress will be saved locally and synced when you reconnect.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}