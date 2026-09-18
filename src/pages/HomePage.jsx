import DashboardLayout from '../components/DashboardLayout'

function HomePage() {
  return (
    <DashboardLayout eyebrow="Inicio">
      <section className="dashboard-welcome" aria-labelledby="welcome-title">
        <p className="eyebrow">Tu espacio de aprendizaje</p>
        <h1 id="welcome-title">Hola, Agustina</h1>
        <p>Continúa practicando y descubre nuevos recursos para avanzar en matemática.</p>
      </section>
    </DashboardLayout>
  )
}

export default HomePage
