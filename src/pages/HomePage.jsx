import { useMemo, useState } from 'react'

const navItems = [
  { label: 'Inicio', icon: 'bi-house-door-fill' },
  { label: 'Desafíos', icon: 'bi-lightning-charge-fill' },
  { label: 'Mi progreso', icon: 'bi-bar-chart-fill' },
  { label: 'Biblioteca', icon: 'bi-journal-text' },
]

function HomePage() {
  const [activeSection, setActiveSection] = useState('Inicio')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('funciones')

  const handleSearch = () => {
    const trimmedQuery = searchValue.trim()
    if (!trimmedQuery) {
      return
    }

    console.log('Buscar:', trimmedQuery)
  }

  const relatedSuggestions = [
    'función afín',
    'gráfica de una parábola',
    'pendiente de una recta',
    'dominio e imagen',
    'función exponencial',
    'ejercicios guiados',
  ]

  const resourceTabs = ['Definición', 'Gráfico', 'Fórmulas', 'Aplicación', 'Ejemplos']

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
                className={activeSection === item.label ? 'nav-item active' : 'nav-item'}
                onClick={() => {
                  setActiveSection(item.label)
                  setIsSidebarOpen(false)
                }}
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
              <p className="eyebrow dashboard-eyebrow">Pantalla en blanco</p>
            </div>
            <button type="button" className="header-action" aria-label="Notificaciones">
              <i className="bi bi-bell-fill" aria-hidden="true" />
            </button>
          </header>

          <section className="search-results-shell" aria-label="Resultados de búsqueda">
            <div className="search-bar-row">
              <div className="search-bar-wrap">
                <label className="search-bar" aria-label="Buscar en la biblioteca">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Buscar en la biblioteca"
                    className="search-input"
                  />
                </label>
                <button type="button" className="search-button" onClick={handleSearch}>
                  <i className="bi bi-search" aria-hidden="true" />
                  <span>Buscar</span>
                </button>
              </div>
            </div>

            <div className="search-results-layout">
              <div className="results-column">
                <article className="google-result-card">
                  <h2>Función lineal</h2>
                  <p>
                    Una función lineal tiene la forma y = mx + b, donde m representa la pendiente y
                    b la ordenada al origen. Su gráfica es una recta y permite modelar relaciones
                    proporcionales entre dos variables.
                  </p>
                </article>

                <article className="wiki-result-card">
                  <h2>Funciones y gráficos</h2>

                  <div className="result-tabs" role="tablist" aria-label="Secciones">
                    {resourceTabs.map((tab, index) => (
                      <button
                        key={tab}
                        type="button"
                        className={index === 0 ? 'result-tab active' : 'result-tab'}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="wiki-content-row">
                    <div className="wiki-copy">
                      <p>
                        En matemática, una función asocia a cada valor de entrada exactamente un valor
                        de salida. El dominio indica los valores posibles de x y la imagen, los valores
                        que toma y. A partir del gráfico se puede leer la tendencia, los puntos de corte
                        y el crecimiento o decrecimiento de la función.
                      </p>
                    </div>

                    <div className="wiki-image-wrap">
                      <img
                        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80"
                        alt="Gráfico de función matemática"
                      />
                    </div>
                  </div>
                </article>

                <div className="bottom-result-header" aria-label="Preguntas sugeridas" />
              </div>

              <aside className="related-column">
                <h3>También te puede interesar</h3>
                <ul className="related-list">
                  {relatedSuggestions.map((item) => (
                    <li key={item}>
                      <span className="search-icon" aria-hidden="true">
                        <i className="bi bi-search" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default HomePage
