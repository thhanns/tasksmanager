function SkeletonCard({ delay = 0 }) {
  return (
    <div
      className="card p-4 animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards', opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded shimmer-bg animate-shimmer" />
          <div className="h-3 w-1/2 rounded shimmer-bg animate-shimmer" style={{ animationDelay: '0.1s' }} />
        </div>
        <div className="flex gap-1">
          <div className="w-7 h-7 rounded shimmer-bg animate-shimmer" />
          <div className="w-7 h-7 rounded shimmer-bg animate-shimmer" style={{ animationDelay: '0.05s' }} />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="h-5 w-20 rounded-full shimmer-bg animate-shimmer" style={{ animationDelay: '0.15s' }} />
        <div className="h-3 w-16 rounded shimmer-bg animate-shimmer" style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  );
}

function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="card p-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards', opacity: 0 }}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded shimmer-bg animate-shimmer" />
              <div className="h-7 w-10 rounded shimmer-bg animate-shimmer" style={{ animationDelay: '0.1s' }} />
            </div>
            <div className="w-10 h-10 rounded-lg shimmer-bg animate-shimmer" style={{ animationDelay: '0.15s' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LoadingSpinner({ text = 'Loading...', variant = 'spinner' }) {
  if (variant === 'skeleton') {
    return (
      <div className="space-y-4 animate-fade-in">
        <SkeletonStats />
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} delay={i * 60} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin" />
      </div>
      <p className="mt-4 text-sm text-gray-500 animate-pulse">{text}</p>
    </div>
  );
}
