import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PerformanceMetrics {
  bundleSize: string
  hydrationTime: string
  renderTime: string
  memoryUsage: string
  fps: number
}

const PerformancePanel = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    bundleSize: '0 KB',
    hydrationTime: '0 ms',
    renderTime: '0 ms',
    memoryUsage: '0 MB',
    fps: 0,
  })

  useEffect(() => {
    const updateMetrics = () => {
      // Bundle size (simulated - in real app, get from build stats)
      const bundleSize = '245 KB' // This would come from webpack-bundle-analyzer or similar

      // Hydration time (simulated)
      const hydrationTime = performance.timing
        ? `${performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart} ms`
        : 'N/A'

      // Render time
      const renderTime = performance.timing
        ? `${performance.timing.loadEventEnd - performance.timing.domLoading} ms`
        : 'N/A'

      // Memory usage
      const memory = (performance as any).memory
      const memoryUsage = memory
        ? `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`
        : 'N/A'

      // FPS (simulated - would need RAF loop in real implementation)
      const fps = 60 // This would be calculated from frame timings

      setMetrics({
        bundleSize,
        hydrationTime,
        renderTime,
        memoryUsage,
        fps,
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 glass rounded-2xl p-6 max-w-sm"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.8 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gradient">Performance Panel</h3>
        <span className="text-xs text-gray-400 font-mono">Dev Only</span>
      </div>

      <div className="space-y-3">
        <MetricRow label="Bundle Size" value={metrics.bundleSize} />
        <MetricRow label="Hydration Time" value={metrics.hydrationTime} />
        <MetricRow label="Render Time" value={metrics.renderTime} />
        <MetricRow label="Memory Usage" value={metrics.memoryUsage} />
        <MetricRow label="FPS" value={`${metrics.fps}`} />
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400 font-mono">
          Press Ctrl+Shift+P to toggle
        </p>
      </div>
    </motion.div>
  )
}

interface MetricRowProps {
  label: string
  value: string
}

const MetricRow = ({ label, value }: MetricRowProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-300">{label}:</span>
      <span className="text-sm font-mono text-gradient font-semibold">{value}</span>
    </div>
  )
}

export default PerformancePanel

