import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }

    const email = document.getElementById('loginEmail')?.value || ''
    const password = document.getElementById('loginPassword')?.value || ''

    console.log('Datos del login:', {
      email,
      password,
    })

    navigate('/home')
  }

  return (
    <Form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <span className="brand-mark">NUMEX</span>
        <span className="mini-tag">Iniciá sesión</span>
      </div>

      <div className="form-title-block mb-3">
        <h3>Ingresá a tu cuenta</h3>
        <p>Continuá con tus ejercicios, seguimientos y desafíos de matemáticas.</p>
      </div>

      <Form.Group className="mb-3" controlId="loginEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="tuemail@ejemplo.com" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="••••••••" required />
      </Form.Group>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Check type="checkbox" id="rememberMe" label="Recordarme" />
        <button type="button" className="step-link" style={{ float: 'none', marginTop: 0 }}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <Button type="submit" className="w-100 create-account-btn">
        Iniciar sesión
      </Button>

      <div className="text-center mt-4 mb-0 text-muted small fw-semibold">
        ¿No tenés cuenta?{' '}
        <Link to="/register" className="step-link" style={{ float: 'none', marginTop: 0 }}>
          Crear cuenta
        </Link>
      </div>
    </Form>
  )
}

export default LoginForm
