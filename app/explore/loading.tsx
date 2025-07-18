import { Loader2 } from "lucide-react"

export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-strikingly-purple" />
          <span className="text-gray-700 text-lg">Loading issues...</span>
        </div>
      </div>
    </div>
  )
}
