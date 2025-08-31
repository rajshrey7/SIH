"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LearningModule from "./LearningModule"
import { OfflineStatus } from "./OfflineStatus"
import { offlineService } from "@/lib/offline"
import { 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Star, 
  Target, 
  Flame,
  Gamepad2,
  Award,
  BarChart3,
  ArrowLeft
} from "lucide-react"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentModule, setCurrentModule] = useState<string | null>(null)

  // Mock data for demonstration
  const studentData = {
    name: "Priya Sharma",
    grade: "8th Grade",
    school: "Rural Public School",
    level: 12,
    points: 2450,
    streak: 7,
    avatar: "/placeholder-avatar.jpg"
  }

  const progressData = {
    science: 75,
    math: 82,
    technology: 68,
    engineering: 71
  }

  const recentActivities = [
    { id: 1, subject: "Science", activity: "Completed Chemical Reactions Quiz", score: 85, time: "2 hours ago", points: 50 },
    { id: 2, subject: "Mathematics", activity: "Finished Algebra Challenge", score: 92, time: "5 hours ago", points: 75 },
    { id: 3, subject: "Technology", activity: "Started Coding Basics Module", score: null, time: "1 day ago", points: 0 },
    { id: 4, subject: "Engineering", activity: "Built Bridge Simulation", score: 78, time: "2 days ago", points: 60 }
  ]

  const achievements = [
    { id: 1, title: "Science Explorer", description: "Complete 10 science activities", icon: "🧪", earned: true },
    { id: 2, title: "Math Wizard", description: "Score 90+ in 5 math quizzes", icon: "📊", earned: true },
    { id: 3, title: "Code Ninja", description: "Complete first coding module", icon: "💻", earned: false },
    { id: 4, title: "Engineering Master", description: "Build 5 successful projects", icon: "⚙️", earned: false },
    { id: 5, title: "Week Warrior", description: "7-day learning streak", icon: "🔥", earned: true },
    { id: 6, title: "Perfect Score", description: "Score 100% in any quiz", icon: "⭐", earned: false }
  ]

  const recommendedModules = [
    { id: "science-photosynthesis", subject: "Science", title: "Photosynthesis Adventure", difficulty: "Medium", duration: "15 min", icon: "🌱" },
    { id: "math-geometry", subject: "Mathematics", title: "Geometry Quest", difficulty: "Easy", duration: "20 min", icon: "📐" },
    { id: "tech-python", subject: "Technology", title: "Python Basics", difficulty: "Hard", duration: "30 min", icon: "🐍" },
    { id: "engineering-machines", subject: "Engineering", title: "Simple Machines", difficulty: "Easy", duration: "25 min", icon: "⚙️" }
  ]

  const allModules = [
    ...recommendedModules,
    { id: "science-chemistry", subject: "Science", title: "Chemical Reactions Lab", difficulty: "Medium", duration: "25 min", icon: "🧪" },
    { id: "math-algebra", subject: "Mathematics", title: "Algebra Puzzles", difficulty: "Medium", duration: "20 min", icon: "🔢" },
    { id: "tech-web", subject: "Technology", title: "Web Development Intro", difficulty: "Hard", duration: "40 min", icon: "🌐" },
    { id: "engineering-robotics", subject: "Engineering", title: "Robotics Basics", difficulty: "Hard", duration: "35 min", icon: "🤖" }
  ]

  if (currentModule) {
    return (
      <div>
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold text-green-600">Learning Module</h1>
            </div>
          </div>
        </nav>
        <LearningModule />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={studentData.avatar} alt={studentData.name} />
                  <AvatarFallback className="bg-green-100 text-green-600 text-lg">
                    {studentData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{studentData.name}</h1>
                  <p className="text-gray-600">{studentData.grade} • {studentData.school}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Level {studentData.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">{studentData.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{studentData.points}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Points</p>
                    <p className="text-2xl font-bold text-green-600">{studentData.points}</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                    <p className="text-2xl font-bold text-orange-600">{studentData.streak} days</p>
                  </div>
                  <Flame className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Activities Completed</p>
                    <p className="text-2xl font-bold text-blue-600">24</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-purple-600">82%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="modules">Learning Modules</TabsTrigger>
            </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Subject Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Subject Progress
                  </CardTitle>
                  <CardDescription>Your progress across STEM subjects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Science</span>
                        <span>{progressData.science}%</span>
                      </div>
                      <Progress value={progressData.science} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mathematics</span>
                        <span>{progressData.math}%</span>
                      </div>
                      <Progress value={progressData.math} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Technology</span>
                        <span>{progressData.technology}%</span>
                      </div>
                      <Progress value={progressData.technology} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Engineering</span>
                        <span>{progressData.engineering}%</span>
                      </div>
                      <Progress value={progressData.engineering} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">{activity.subject}</Badge>
                            {activity.score && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                {activity.score}%
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{activity.activity}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        {activity.points > 0 && (
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600">+{activity.points}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  Recommended for You
                </CardTitle>
                <CardDescription>Personalized learning modules based on your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommendedModules.map((module) => (
                    <Card key={module.id} className="border-2 hover:border-green-300 transition-colors cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{module.icon}</div>
                        <h4 className="font-semibold text-sm mb-1">{module.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{module.subject}</p>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">{module.difficulty}</Badge>
                          <span>{module.duration}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-3 bg-green-600 hover:bg-green-700"
                          onClick={() => setCurrentModule(module.id)}
                        >
                          Start
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Progress Analytics</CardTitle>
                <CardDescription>Comprehensive view of your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Detailed progress charts and analytics coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Achievements & Badges
                </CardTitle>
                <CardDescription>Unlock achievements as you progress through your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <Card 
                      key={achievement.id} 
                      className={`border-2 ${achievement.earned ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50 opacity-60'}`}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                        <p className="text-xs text-gray-600 mb-3">{achievement.description}</p>
                        {achievement.earned ? (
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                            <Award className="w-3 h-3 mr-1" />
                            Earned
                          </Badge>
                        ) : (
                          <Badge variant="outline">Locked</Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  All Learning Modules
                </CardTitle>
                <CardDescription>Browse all available STEM learning modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {allModules.map((module) => (
                    <Card key={module.id} className="border-2 hover:border-green-300 transition-colors cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{module.icon}</div>
                        <h4 className="font-semibold text-sm mb-1">{module.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{module.subject}</p>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">{module.difficulty}</Badge>
                          <span>{module.duration}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-3 bg-green-600 hover:bg-green-700"
                          onClick={() => setCurrentModule(module.id)}
                        >
                          Start
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <OfflineStatus />
        </div>
      </div>
    </div>
  )
}