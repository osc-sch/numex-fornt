import { useMemo, useState } from 'react'

const navItems = [
  { label: 'Inicio', icon: 'bi-house-door-fill' },
  { label: 'Desafíos', icon: 'bi-lightning-charge-fill' },
  { label: 'Mi progreso', icon: 'bi-bar-chart-fill' },
  { label: 'Glosario', icon: 'bi-journal-text' },
]

function HomePage() {
  const [activeSection, setActiveSection] = useState('Inicio')

  const sectionContent = useMemo(
    () => ({
      Inicio: {
        eyebrow: 'Tu espacio de estudio',
        title: '¡Vamos a seguir avanzando juntos!',
        description:
          'Hoy podés repasar conceptos clave, resolver un desafío nuevo y revisar tu progreso en matemática con más confianza.',
        highlights: [
          { label: 'Desafíos hoy', value: '4' },
          { label: 'Meta semanal', value: '72%' },
          { label: 'Tiempo de práctica', value: '48 min' },
        ],
      },
      Desafíos: {
        eyebrow: 'Practicá con propósito',
        title: 'Desafíos para seguir entrenando',
        description:
          'Elegí una actividad según tu nivel y reforzá los conceptos que más te cuestan con ejercicios guiados.',
        highlights: [
          { label: 'Nivel actual', value: 'Avanzado' },
          { label: 'Ejercicios sin responder', value: '6' },
          { label: 'Racha', value: '5 días' },
        ],
      },
      'Mi progreso': {
        eyebrow: 'Seguimiento académico',
        title: 'Tu progreso está creciendo',
        description:
          'Revisá tus avances por tema, tus rachas y el rendimiento de tus últimas sesiones para mantener el impulso.',
        highlights: [
          { label: 'Temas dominados', value: '11' },
          { label: 'Aciertos', value: '84%' },
          { label: 'Puntaje promedio', value: '9.2' },
        ],
      },
      Glosario: {
        eyebrow: 'Repaso rápido',
        title: 'Conceptos clave del curso',
        description:
          'Recordá definiciones y fórmulas útiles con acceso rápido a los términos más importantes de cada unidad.',
        highlights: [
          { label: 'Términos nuevos', value: '14' },
          { label: 'Fórmulas guardadas', value: '8' },
          { label: 'Último tema', value: 'Trigonometría' },
        ],
      },
    }),
    [],
  )

  const content = sectionContent[activeSection]

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <span className="brand-mark">NUMEX</span>
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
                onClick={() => setActiveSection(item.label)}
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

        <main className="dashboard-main">
          <header className="main-topbar">
            <div>
              <p className="eyebrow dashboard-eyebrow">{content.eyebrow}</p>
            </div>
            <button type="button" className="header-action">
              <i className="bi bi-bell-fill" aria-hidden="true" />
            </button>
          </header>

          <section className="welcome-panel">
            <div>
              <h1>{content.title}</h1>
              <p>{content.description}</p>
            </div>
            <button type="button" className="primary-cta">
              <i className="bi bi-play-fill" aria-hidden="true" />
              <span>Continuar</span>
            </button>
          </section>

          <section className="metrics-grid">
            {content.highlights.map((metric) => (
              <article key={metric.label} className="metric-card">
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </section>

          <section className="content-grid">
            <article className="info-card large-card">
              <div className="card-header-row">
                <h3>Actividad reciente</h3>
                <span>Esta semana</span>
              </div>

              <div className="lesson-row">
                <div className="lesson-bullet lesson-blue" aria-hidden="true" />
                <div>
                  <h4>Ecuaciones lineales</h4>
                  <p>Completaste 3 ejercicios con un 90% de aciertos.</p>
                </div>
              </div>

              <div className="lesson-row">
                <div className="lesson-bullet lesson-pink" aria-hidden="true" />
                <div>
                  <h4>Funciones</h4>
                  <p>Revisaste gráficos y resolviste 2 preguntas desafiantes.</p>
                </div>
              </div>
            </article>

            <article className="info-card">
              <div className="card-header-row">
                <h3>Próxima clase</h3>
                <span>Hoy</span>
              </div>

              <div className="mini-schedule">
                <div className="schedule-time">17:30</div>
                <div>
                  <h4>Álgebra aplicada</h4>
                  <p>Repaso de sistemas de ecuaciones.</p>
                </div>
              </div>

              <button type="button" className="secondary-cta">
                <i className="bi bi-calendar3" aria-hidden="true" />
                <span>Ver agenda</span>
              </button>
            </article>
          </section>
        </main>
      </div>
    </div>
  )
}

export default HomePage
