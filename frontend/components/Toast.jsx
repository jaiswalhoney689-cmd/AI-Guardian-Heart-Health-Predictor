import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ show, type = 'info', message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="glass-card px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ background: type === 'error' ? '#fb7185' : '#34d399' }} />
            <div className="text-sm text-slate-100">{message}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
