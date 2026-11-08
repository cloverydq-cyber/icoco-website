// Stop website effects when navigating into the application without a reload.
export function createEffectScope() {
  const controller = new AbortController()
  const frames = new Set()
  const observers = []
  let disposed = false
  return {
    listen(target, type, callback, options = {}) {
      target.addEventListener(type, callback, { ...options, signal: controller.signal })
    },
    frame(callback) {
      if (disposed) return
      const id = requestAnimationFrame(now => {
        frames.delete(id)
        if (!disposed) callback(now)
      })
      frames.add(id)
    },
    observer(callback, options) {
      const observer = new IntersectionObserver(callback, options)
      observers.push(observer)
      return observer
    },
    dispose() {
      disposed = true
      controller.abort()
      frames.forEach(cancelAnimationFrame)
      observers.forEach(observer => observer.disconnect())
    },
  }
}
