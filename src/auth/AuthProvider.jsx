import { useCallback, useEffect, useRef, useState } from 'react'
import { AuthContext } from './authContext'
import * as api from '../services/auth'

export default function AuthProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', session: null, error: '' })
  const revision = useRef(0)

  const refreshSession = useCallback(async (signal) => {
    const current = ++revision.current
    try {
      const session = await api.getSession({ signal })
      if (current === revision.current) {
        setState({ status: session ? 'authenticated' : 'anonymous', session, error: '' })
      }
    } catch (error) {
      if (error.name !== 'AbortError' && current === revision.current) {
        setState({ status: 'error', session: null, error: error.message })
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    refreshSession(controller.signal)
    const refresh = () => {
      if (document.visibilityState === 'visible') refreshSession(controller.signal)
    }
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    const timer = window.setInterval(refresh, 60000)
    return () => {
      controller.abort()
      window.clearInterval(timer)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [refreshSession])

  const login = async (credentials) => {
    const current = ++revision.current
    await api.login(credentials)
    const session = await api.getSession()
    if (!session) throw new Error('No se pudo mantener la sesión. Revisá que las cookies estén habilitadas.')
    if (current === revision.current) setState({ status: 'authenticated', session, error: '' })
  }

  const logout = async () => {
    ++revision.current
    await api.logout()
    ++revision.current
    setState({ status: 'anonymous', session: null, error: '' })
  }

  return (
    <AuthContext.Provider value={{ ...state, user: state.session?.user, profile: state.session?.profile, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}
