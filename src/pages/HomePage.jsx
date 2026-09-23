import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

import DashboardLayout from '../components/DashboardLayout'

function HomePage() {
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const diagnosticModalSeen = localStorage.getItem(
      'numex_diagnostic_modal_seen'
    )

    if (!diagnosticModalSeen) {
      setShowDiagnosticModal(true)
    }
  }, [])

  const handleGoToDiagnostic = () => {
    localStorage.setItem('numex_diagnostic_modal_seen', 'true')

    setShowDiagnosticModal(false)

    navigate('/diagnostic')
  }

  return (
    <>
      <DashboardLayout eyebrow="Inicio">
        <section
          className="dashboard-welcome"
          aria-labelledby="welcome-title"
        >
          <p className="eyebrow">Tu espacio de aprendizaje</p>

          <h1 id="welcome-title">
            Hola, Agustina
          </h1>

          <p>
            Continúa practicando y descubre nuevos recursos
            para avanzar en matemática.
          </p>
        </section>
      </DashboardLayout>

      <Modal
        show={showDiagnosticModal}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            Antes de comenzar
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Para comenzar a usar Numex necesitamos conocer un poco
            mejor tus conocimientos actuales de matemática.
          </p>

          <p>
            Por eso vas a realizar un breve <strong>test de diagnóstico</strong>.
            No es un examen y no afecta tus calificaciones.
          </p>

          <p>
            Tus respuestas nos permitirán identificar los temas que ya
            dominas y aquellos que todavía necesitan un poco más de práctica.
          </p>

          <p className="mb-0">
            Con esta información, Numex podrá preparar actividades
            adaptadas especialmente a tus necesidades.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleGoToDiagnostic}
          >
            Ir al test de diagnóstico
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default HomePage