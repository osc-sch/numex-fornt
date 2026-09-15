import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function RegisterForm({ onStepChange, onProfileTypeChange }) {
  const navigate = useNavigate()
  const [profilePhoto, setProfilePhoto] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [profileType, setProfileType] = useState('alumno')
  const [institutionType, setInstitutionType] = useState('')
  const [schoolYear, setSchoolYear] = useState('')

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      setProfilePhoto(URL.createObjectURL(selectedFile))
      setShowPhotoModal(false)
    }
  }

  const handleUrlSubmit = (event) => {
    event.preventDefault()

    if (photoUrl.trim()) {
      setProfilePhoto(photoUrl.trim())
      setShowPhotoModal(false)
    }
  }

  const handleInstitutionChange = (event) => {
    setInstitutionType(event.target.value)
    setSchoolYear('')
  }

  const goToPersonalData = (event) => {
    event.preventDefault()

    const accountFields = ['formUsername', 'formEmail', 'formPassword', 'formConfirmPassword']
    const firstInvalidField = accountFields
      .map((fieldId) => document.getElementById(fieldId))
      .find((field) => field && !field.checkValidity())

    if (firstInvalidField) {
      firstInvalidField.reportValidity()
      return
    }

    setCurrentStep(2)
    onStepChange?.(2)
  }

  const curricularStage = schoolYear
    ? Number(schoolYear) <= 3
      ? institutionType === 'tecnica' ? 'Ciclo Básico Técnico (CBT)' : 'Ciclo Básico (CB)'
      : institutionType === 'tecnica' ? 'Ciclo Superior Técnico (CST)' : 'Ciclo Superior (CS)'
    : ''

  const handleProfileTypeChange = (type) => {
    setProfileType(type)
    onProfileTypeChange?.(type)
  }

  const handleRegistrationSubmit = (event) => {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }

    const getFieldValue = (fieldId) => document.getElementById(fieldId)?.value || ''
    const password = getFieldValue('formPassword')
    const confirmPassword = getFieldValue('formConfirmPassword')

    if (password !== confirmPassword) {
      document.getElementById('formConfirmPassword')?.setCustomValidity('Las contraseñas no coinciden.')
      document.getElementById('formConfirmPassword')?.reportValidity()
      document.getElementById('formConfirmPassword')?.setCustomValidity('')
      return
    }

    const registrationData = {
      idRol: profileType === 'alumno' ? 3 : 2,
      tipoPerfil: profileType,
      fotoPerfil: profilePhoto,
      username: getFieldValue('formUsername'),
      email: getFieldValue('formEmail'),
      password,
      confirmarPassword: confirmPassword,
      nombre: getFieldValue('formName'),
      apellido: getFieldValue('formLastName'),
      dni: getFieldValue(profileType === 'alumno' ? 'formDni' : 'formTeacherDni'),
      fechaNacimiento: getFieldValue('formBirthDate'),
      ...(profileType === 'alumno'
        ? {
            tipoInstitucion: getFieldValue('formInstitutionType'),
            anioEscolar: getFieldValue('formSchoolYear'),
            etapaCurricular: getFieldValue('formCurricularStage'),
          }
        : {
            codigoVerificacion: getFieldValue('formVerificationCode'),
          }),
    }

    console.log('Datos completos del registro:', registrationData)
    navigate('/login')
  }

  return (
    <Form className="auth-form" onSubmit={handleRegistrationSubmit}>
      <div className={`registration-flow registration-step-${currentStep}`}>
        <div className="registration-step registration-step-account">
          <div className="form-header">
            <span className="brand-mark">NUMEX</span>
            <span className="mini-tag">Matemáticas para secundario</span>
          </div>

          <div className="form-title-block mb-3">
            <h3>Creá tu cuenta</h3>
            <p>Empezá a aprender con ejercicios, desafíos y seguimiento personalizado.</p>
          </div>

          <div className="profile-photo-group">
            <button
              type="button"
              className="profile-photo-picker"
              onClick={() => setShowPhotoModal(true)}
              aria-label="Elegir foto de perfil"
            >
              {profilePhoto ? (
                <img src={profilePhoto} alt="Vista previa del perfil" />
              ) : (
                <i className="bi bi-person-fill" aria-hidden="true" />
              )}
            </button>
            <span className="profile-photo-caption">Foto de perfil</span>
          </div>

          <Modal show={showPhotoModal} onHide={() => setShowPhotoModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Elegir foto de perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleUrlSubmit}>
                <Form.Group className="mb-3" controlId="profilePhotoUrl">
                  <Form.Label>Usar una URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://ejemplo.com/mi-foto.jpg"
                    value={photoUrl}
                    onChange={(event) => setPhotoUrl(event.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100 mb-3">
                  Usar URL
                </Button>
              </Form>

              <div className="photo-modal-divider">o</div>

              <Form.Group controlId="profilePhotoFile">
                <Form.Label>Subir desde el computador</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
              </Form.Group>
            </Modal.Body>
          </Modal>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Elegí tu nombre de usuario" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="tuemail@ejemplo.com" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="••••••••" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" placeholder="Repetí tu contraseña" required />
          </Form.Group>

          <div className="d-flex flex-column align-items-end gap-2 mt-2">
            <button type="button" className="step-link" onClick={goToPersonalData}>
              Paso 2 <i className="bi bi-arrow-right" aria-hidden="true" />
            </button>

            <div className="text-center text-muted small fw-semibold">
              ¿Ya tenés cuenta?{' '}
              <Link to="/login" className="step-link" style={{ float: 'none', marginTop: 0 }}>
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>

        <div className="registration-step registration-step-personal">
          <div className="form-header">
            <span className="brand-mark">NUMEX</span>
            <span className="mini-tag">Paso 2 de 2</span>
          </div>

          <div className="form-title-block mb-3">
            <h3>Datos personales</h3>
            <p>Contanos un poco más sobre vos para personalizar tu experiencia.</p>
          </div>

          <div className="profile-tabs" role="tablist" aria-label="Tipo de usuario">
            <button
              type="button"
              role="tab"
              aria-selected={profileType === 'alumno'}
              className={profileType === 'alumno' ? 'profile-tab active' : 'profile-tab'}
              onClick={() => handleProfileTypeChange('alumno')}
            >
              <i className="bi bi-backpack-fill" aria-hidden="true" /> Alumno
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={profileType === 'docente'}
              className={profileType === 'docente' ? 'profile-tab active' : 'profile-tab'}
              onClick={() => handleProfileTypeChange('docente')}
            >
              <i className="bi bi-person-workspace" aria-hidden="true" /> Docente
            </button>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Tu nombre" required />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="formLastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Tu apellido" required />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3" controlId="formBirthDate">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control type="date" required />
          </Form.Group>

          {profileType === 'alumno' ? (
            <>
              <Form.Group className="mb-3" controlId="formDni">
                <Form.Label>DNI</Form.Label>
                <Form.Control type="text" inputMode="numeric" placeholder="Tu número de DNI" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formInstitutionType">
                <Form.Label>Tipo de institución</Form.Label>
                <Form.Select
                  value={institutionType}
                  onChange={handleInstitutionChange}
                  required
                >
                  <option value="" disabled>Elegí el tipo de institución</option>
                  <option value="comun">Escuelas Comunes</option>
                  <option value="tecnica">Escuelas Técnicas</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSchoolYear">
                <Form.Label>Año escolar</Form.Label>
                <Form.Select
                  value={schoolYear}
                  onChange={(event) => setSchoolYear(event.target.value)}
                  required
                >
                  <option value="" disabled>Elegí tu año</option>
                  {[1, 2, 3, 4, 5, 6, ...(institutionType === 'tecnica' ? [7] : [])].map((year) => (
                    <option key={year} value={year}>{year}° año</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCurricularStage">
                <Form.Label>Etapa curricular</Form.Label>
                <Form.Control
                  type="text"
                  value={curricularStage}
                  placeholder="Se completa según el tipo y año"
                  readOnly
                  required
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3" controlId="formTeacherDni">
                <Form.Label>DNI</Form.Label>
                <Form.Control type="text" inputMode="numeric" placeholder="Tu número de DNI" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formVerificationCode">
                <Form.Label>Código de verificación</Form.Label>
                <Form.Control type="text" placeholder="Ingresá el código docente" required />
                <Form.Text className="verification-help">
                  Este código confirma que sos docente y protege el acceso de los alumnos.
                </Form.Text>
              </Form.Group>
            </>
          )}

          <button
            type="button"
            className="back-step-link"
            onClick={() => {
              setCurrentStep(1)
              onStepChange?.(1)
            }}
          >
            <i className="bi bi-arrow-left" aria-hidden="true" /> Volver al paso 1
          </button>
          <Button className="w-100 create-account-btn" type="submit">
            Crear cuenta
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default RegisterForm
