export default function CompensacionLaboralLoading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero section skeleton */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="h-12 bg-gray-800 rounded-lg w-3/4 mx-auto mb-4 animate-pulse" />
            <div className="h-8 bg-gray-800 rounded-lg w-1/2 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-800 rounded-lg w-2/3 mx-auto animate-pulse" />
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-900 rounded-lg p-6">
                <div className="h-8 bg-gray-800 rounded w-20 mx-auto mb-2 animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-24 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services section skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-8 bg-gray-800 rounded-lg w-64 mb-8 animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-6">
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-3 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-800 rounded w-4/6 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ section skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="h-8 bg-gray-800 rounded-lg w-48 mb-8 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-6">
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-4 bg-gray-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}