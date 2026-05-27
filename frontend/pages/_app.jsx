import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Component {...pageProps} />
        <Analytics />
      </AuthProvider>
    </ErrorBoundary>
  )
}
