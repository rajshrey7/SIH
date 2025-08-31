// Offline storage and synchronization utilities

export interface OfflineData {
  id: string
  type: 'progress' | 'achievement' | 'module-result' | 'user-preferences'
  data: any
  timestamp: number
  synced: boolean
}

class OfflineService {
  private readonly STORAGE_KEY = 'stem_learning_offline_data'
  private readonly SYNC_QUEUE_KEY = 'stem_learning_sync_queue'

  // Check if online
  isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine
  }

  // Save data for offline use
  async saveOffline(data: Omit<OfflineData, 'timestamp' | 'synced'>): Promise<void> {
    const offlineData: OfflineData = {
      ...data,
      timestamp: Date.now(),
      synced: false
    }

    const existingData = this.getStoredData()
    existingData.push(offlineData)
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData))
    
    // Try to sync immediately if online
    if (this.isOnline()) {
      await this.syncData()
    }
  }

  // Get all stored offline data
  getStoredData(): OfflineData[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error reading offline data:', error)
      return []
    }
  }

  // Get data by type
  getDataByType(type: OfflineData['type']): OfflineData[] {
    return this.getStoredData().filter(item => item.type === type)
  }

  // Sync offline data with server
  async syncData(): Promise<void> {
    if (!this.isOnline()) return

    const offlineData = this.getStoredData().filter(item => !item.synced)
    
    if (offlineData.length === 0) return

    try {
      // Here you would normally sync with your backend API
      // For demo purposes, we'll just mark as synced
      const allData = this.getStoredData()
      const updatedData = allData.map(item => 
        offlineData.some(offline => offline.id === item.id) 
          ? { ...item, synced: true }
          : item
      )
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData))
      
      console.log(`Synced ${offlineData.length} items successfully`)
    } catch (error) {
      console.error('Error syncing data:', error)
    }
  }

  // Clear synced data older than specified days
  clearOldSyncedData(days: number = 7): void {
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000)
    const allData = this.getStoredData()
    const filteredData = allData.filter(item => 
      !item.synced || item.timestamp > cutoffTime
    )
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredData))
  }

  // Save learning progress offline
  async saveProgressOffline(userId: string, moduleId: string, progress: any): Promise<void> {
    await this.saveOffline({
      id: `progress_${userId}_${moduleId}_${Date.now()}`,
      type: 'progress',
      data: { userId, moduleId, progress }
    })
  }

  // Save achievement offline
  async saveAchievementOffline(userId: string, achievement: any): Promise<void> {
    await this.saveOffline({
      id: `achievement_${userId}_${achievement.id}_${Date.now()}`,
      type: 'achievement',
      data: { userId, achievement }
    })
  }

  // Save module result offline
  async saveModuleResultOffline(userId: string, moduleId: string, result: any): Promise<void> {
    await this.saveOffline({
      id: `result_${userId}_${moduleId}_${Date.now()}`,
      type: 'module-result',
      data: { userId, moduleId, result }
    })
  }

  // Save user preferences offline
  async saveUserPreferencesOffline(userId: string, preferences: any): Promise<void> {
    await this.saveOffline({
      id: `preferences_${userId}`,
      type: 'user-preferences',
      data: { userId, preferences }
    })
  }

  // Get user progress for a module
  getModuleProgress(userId: string, moduleId: string): any {
    const progressData = this.getDataByType('progress')
    const userProgress = progressData.filter(item => 
      item.data.userId === userId && item.data.moduleId === moduleId
    )
    
    // Return the most recent progress
    return userProgress.length > 0 ? userProgress[userProgress.length - 1].data.progress : null
  }

  // Setup online/offline event listeners
  setupEventListeners(): void {
    if (typeof window === 'undefined') return

    window.addEventListener('online', () => {
      console.log('Back online, syncing data...')
      this.syncData()
    })

    window.addEventListener('offline', () => {
      console.log('Went offline, data will be saved locally')
    })
  }
}

// Export singleton instance
export const offlineService = new OfflineService()

// Initialize event listeners when module is loaded
if (typeof window !== 'undefined') {
  offlineService.setupEventListeners()
  
  // Attempt to sync when page loads
  window.addEventListener('load', () => {
    setTimeout(() => offlineService.syncData(), 1000)
  })
}