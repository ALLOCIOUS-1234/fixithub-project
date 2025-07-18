import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-strikingly-purple flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-white text-5xl font-bold mb-8">Universe</h1>
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <span className="text-white text-lg">Loading...</span>
        </div>
      </div>
    </div>
  )
}
