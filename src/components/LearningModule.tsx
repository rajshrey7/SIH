"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Star, 
  Clock, 
  Target,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Award,
  Zap
} from "lucide-react"

interface Question {
  id: number
  type: "multiple-choice" | "true-false" | "fill-blank" | "simulation"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  points: number
  difficulty: "easy" | "medium" | "hard"
}

interface ModuleData {
  id: string
  title: string
  subject: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  duration: string
  totalPoints: number
  questions: Question[]
}

const scienceModule: ModuleData = {
  id: "science-photosynthesis",
  title: "Photosynthesis Adventure",
  subject: "Science",
  description: "Learn about the amazing process of photosynthesis through interactive experiments!",
  difficulty: "medium",
  duration: "15 minutes",
  totalPoints: 100,
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What is the primary pigment involved in photosynthesis?",
      options: ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"],
      correctAnswer: 1,
      explanation: "Chlorophyll is the green pigment that captures light energy for photosynthesis.",
      points: 20,
      difficulty: "easy"
    },
    {
      id: 2,
      type: "true-false",
      question: "Photosynthesis produces oxygen as a byproduct.",
      correctAnswer: "true",
      explanation: "Yes, oxygen is released as a waste product during the light-dependent reactions.",
      points: 15,
      difficulty: "easy"
    },
    {
      id: 3,
      type: "fill-blank",
      question: "The chemical equation for photosynthesis is: 6CO₂ + 6H₂O → ________ + 6O₂",
      correctAnswer: "C6H12O6",
      explanation: "Glucose (C6H12O6) is produced along with oxygen during photosynthesis.",
      points: 25,
      difficulty: "medium"
    },
    {
      id: 4,
      type: "simulation",
      question: "Drag the components to build the photosynthesis equation",
      correctAnswer: "simulation-complete",
      explanation: "Great job! You've successfully assembled the photosynthesis equation.",
      points: 40,
      difficulty: "hard"
    }
  ]
}

export default function LearningModule() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [isPlaying, setIsPlaying] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [module] = useState<ModuleData>(scienceModule)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && timeLeft > 0 && !showResults) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      setShowResults(true)
    }
    return () => clearTimeout(timer)
  }, [timeLeft, isPlaying, showResults])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answer: string | number) => {
    if (isAnswered) return
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    setIsAnswered(true)
    const question = module.questions[currentQuestion]
    const isCorrect = selectedAnswer === question.correctAnswer
    
    if (isCorrect) {
      setScore(score + question.points)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < module.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResults(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  const resetModule = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setTimeLeft(900)
    setIsPlaying(false)
    setStreak(0)
    setShowResults(false)
  }

  const startModule = () => {
    setIsPlaying(true)
  }

  const togglePause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentQ = module.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / module.questions.length) * 100

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-3xl text-green-600">Module Complete!</CardTitle>
              <CardDescription className="text-lg">
                Congratulations on finishing {module.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-green-600">{score}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round((score / module.totalPoints) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-purple-600">{streak}</div>
                    <div className="text-sm text-gray-600">Best Streak</div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Badge className="text-lg px-4 py-2 bg-yellow-500 hover:bg-yellow-600">
                  <Award className="w-4 h-4 mr-2" />
                  Module Completed
                </Badge>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={resetModule} variant="outline" size="lg">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={() => window.history.back()} size="lg" className="bg-green-600 hover:bg-green-700">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-green-600">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">{module.subject}</Badge>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="w-4 h-4" />
                  <span>{module.difficulty}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{module.duration}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {!isPlaying ? (
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                This interactive module will guide you through {module.title} with engaging questions and activities. 
                Earn points, build your streak, and master the concepts!
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{module.questions.length}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{module.totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{module.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </CardContent>
                </Card>
              </div>
              <Button onClick={startModule} size="lg" className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Progress and Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-green-600">{score}</div>
                  <div className="text-xs text-gray-600">Points</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-orange-600">{streak}</div>
                  <div className="text-xs text-gray-600">Streak</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-blue-600">{formatTime(timeLeft)}</div>
                  <div className="text-xs text-gray-600">Time Left</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-purple-600">{currentQuestion + 1}/{module.questions.length}</div>
                  <div className="text-xs text-gray-600">Question</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Question {currentQuestion + 1}</Badge>
                  <Badge className={`${
                    currentQ.difficulty === "easy" ? "bg-green-500" : 
                    currentQ.difficulty === "medium" ? "bg-yellow-500" : "bg-red-500"
                  }`}>
                    {currentQ.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{currentQ.question}</CardTitle>
                <CardDescription>Worth {currentQ.points} points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQ.type === "multiple-choice" && currentQ.options && (
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto p-4"
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {currentQ.type === "true-false" && (
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={selectedAnswer === "true" ? "default" : "outline"}
                      className="h-20"
                      onClick={() => handleAnswerSelect("true")}
                      disabled={isAnswered}
                    >
                      True
                    </Button>
                    <Button
                      variant={selectedAnswer === "false" ? "default" : "outline"}
                      className="h-20"
                      onClick={() => handleAnswerSelect("false")}
                      disabled={isAnswered}
                    >
                      False
                    </Button>
                  </div>
                )}

                {currentQ.type === "fill-blank" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your answer..."
                      value={selectedAnswer as string || ""}
                      onChange={(e) => handleAnswerSelect(e.target.value)}
                      disabled={isAnswered}
                    />
                  </div>
                )}

                {currentQ.type === "simulation" && (
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <div className="text-6xl mb-4">🧪</div>
                    <p className="text-gray-600 mb-4">Interactive simulation would be embedded here</p>
                    <Button onClick={() => handleAnswerSelect("simulation-complete")} disabled={isAnswered}>
                      Complete Simulation
                    </Button>
                  </div>
                )}

                {isAnswered && (
                  <Card className={`border-l-4 ${
                    selectedAnswer === currentQ.correctAnswer ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {selectedAnswer === currentQ.correctAnswer ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800">Correct!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="font-medium text-red-800">Incorrect</span>
                          </>
                        )}
                        {selectedAnswer === currentQ.correctAnswer && (
                          <Badge className="bg-green-600">
                            <Zap className="w-3 h-3 mr-1" />
                            +{currentQ.points} points
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{currentQ.explanation}</p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button variant="outline" onClick={togglePause}>
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? "Pause" : "Resume"}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isAnswered ? (
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-700">
                        {currentQuestion === module.questions.length - 1 ? "Finish" : "Next"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}