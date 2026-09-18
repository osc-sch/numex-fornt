import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Inicio', icon: 'bi-house-door-fill', path: '/home' },
  { label: 'Desafíos', icon: 'bi-lightning-charge-fill', path: '/challenges' },
  { label: 'Mi progreso', icon: 'bi-bar-chart-fill', path: '/progress' },
  { label: 'Biblioteca', icon: 'bi-journal-text', path: '/library' },
]

function DashboardLayout({ children, eyebrow }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const currentDate = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
  const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1)

  const handleNavigation = (path) => {
    setIsSidebarOpen(false)
    if (path) {
      navigate(path)
    }
  }

  return (
    <div className="dashboard-page">
      <div className={isSidebarOpen ? 'dashboard-shell sidebar-open' : 'dashboard-shell'}>
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Cerrar menú"
          onClick={() => setIsSidebarOpen(false)}
        />

        <aside className="dashboard-sidebar" aria-label="Menú lateral">
          <div className="sidebar-header">
            <span className="brand-mark">NUMEX</span>
            <button
              type="button"
              className="sidebar-close"
              aria-label="Cerrar menú"
              onClick={() => setIsSidebarOpen(false)}
            >
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </div>

          <div className="profile-summary">
            <div className="profile-avatar">A</div>
            <div>
              <p className="profile-label">Usuario</p>
              <h4>Agustina</h4>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Navegación principal">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={item.path && location.pathname.startsWith(item.path) ? 'nav-item active' : 'nav-item'}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="nav-icon" aria-hidden="true">
                  <i className={`bi ${item.icon}`} />
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-card">
            <p className="sidebar-card-label">Objetivo del día</p>
            <h5>Completar 2 desafíos</h5>
            <div className="progress-track" aria-label="Progreso diario">
              <span style={{ width: '72%' }} />
            </div>
            <small>72% completado</small>
          </div>
        </aside>

        <main className="dashboard-main dashboard-main-empty">
          <header className="main-topbar">
            <div className="topbar-heading">
              <button
                type="button"
                className="menu-toggle"
                aria-label="Abrir menú"
                aria-expanded={isSidebarOpen}
                onClick={() => setIsSidebarOpen(true)}
              >
                <i className="bi bi-list" aria-hidden="true" />
              </button>
              <p className="eyebrow dashboard-eyebrow">{eyebrow}</p>
            </div>
            <div className="header-actions">
              <time className="current-date" dateTime={new Date().toISOString().split('T')[0]}>
                <i className="bi bi-calendar-event-fill" aria-hidden="true" />
                <span>{formattedDate}</span>
              </time>
              <button type="button" className="header-action" aria-label="Notificaciones">
                <i className="bi bi-bell-fill" aria-hidden="true" />
              </button>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
