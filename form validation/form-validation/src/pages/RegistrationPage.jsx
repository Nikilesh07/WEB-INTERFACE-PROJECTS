import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const statesAndTerritories = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

const initialValues = {
  fullName: '', dateOfBirth: '', gender: '', mobile: '', email: '', aadhaar: '', epic: '',
  address: '', state: '', district: '', pincode: '', password: '', confirmPassword: '', terms: false,
}

function validate(values) {
  const errors = {}
  const aadhaarDigits = values.aadhaar.replace(/\s/g, '')
  if (!values.fullName.trim()) errors.fullName = 'Enter your full name.'
  else if (!/^[A-Za-z ]+$/.test(values.fullName.trim())) errors.fullName = 'Use letters and spaces only.'
  else if (values.fullName.trim().length < 3) errors.fullName = 'Name must be at least 3 characters.'

  if (!values.dateOfBirth) errors.dateOfBirth = 'Enter your date of birth.'
  else {
    const [year, month, day] = values.dateOfBirth.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(values.dateOfBirth) && date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (!isValidDate) errors.dateOfBirth = 'Enter a valid date.'
    else if (date > today) errors.dateOfBirth = 'Date of birth cannot be in the future.'
  }

  if (!values.gender) errors.gender = 'Select a gender.'
  if (!values.mobile) errors.mobile = 'Enter your mobile number.'
  else if (!/^[6-9]\d{9}$/.test(values.mobile)) errors.mobile = 'Enter a valid 10-digit Indian mobile number.'
  if (!values.email.trim()) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'

  if (!values.aadhaar.trim()) errors.aadhaar = 'Enter your 12-digit Aadhaar number.'
  else if (!/^[\d ]+$/.test(values.aadhaar) || aadhaarDigits.length !== 12) errors.aadhaar = 'Enter exactly 12 digits. Spaces are allowed.'
  if (!values.epic.trim()) errors.epic = 'Enter your Voter ID / EPIC number.'
  else if (!/^[A-Z]{3}\d{7}$/.test(values.epic)) errors.epic = 'Use 3 uppercase letters followed by 7 digits.'
  if (!values.address.trim()) errors.address = 'Enter your address.'
  else if (values.address.trim().length < 10) errors.address = 'Address must be at least 10 characters.'
  if (!values.state) errors.state = 'Select a state or union territory.'
  if (!values.district.trim()) errors.district = 'Enter your district.'
  else if (!/^[A-Za-z][A-Za-z .'-]{1,}$/.test(values.district.trim())) errors.district = 'Enter a valid district name.'
  if (!values.pincode) errors.pincode = 'Enter your 6-digit pincode.'
  else if (!/^\d{6}$/.test(values.pincode)) errors.pincode = 'Pincode must contain exactly 6 digits.'

  if (!values.password) errors.password = 'Create a password.'
  else if (values.password.length < 8 || !/[A-Z]/.test(values.password) || !/[a-z]/.test(values.password) || !/\d/.test(values.password) || !/[^A-Za-z0-9]/.test(values.password)) errors.password = 'Use 8+ characters with uppercase, lowercase, number, and special character.'
  if (!values.confirmPassword) errors.confirmPassword = 'Confirm your password.'
  else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.'
  if (!values.terms) errors.terms = 'Accept the terms to continue.'
  return errors
}

function formatAadhaar(value) {
  if (!/^[\d ]*$/.test(value)) return value
  const digits = value.replace(/\s/g, '')
  return digits.match(/.{1,4}/g)?.join(' ') || ''
}

function FormField({ id, label, required = true, error, valid, hint, children }) {
  const messageId = `${id}-message`
  const hintId = `${id}-hint`
  const describedBy = [hint ? hintId : null, error ? messageId : null].filter(Boolean).join(' ') || undefined
  return (
    <div className={`form-field${error ? ' has-error' : valid ? ' is-valid' : ''}`}>
      <label htmlFor={id}>{label}{required && <span className="required-mark" aria-hidden="true"> *</span>}</label>
      {children({ describedBy, invalid: Boolean(error) })}
      {hint && <small className="field-hint" id={hintId}>{hint}</small>}
      {error && <small className="field-error" id={messageId} role="alert">{error}</small>}
      {valid && !error && <small className="field-success">Looks good</small>}
    </div>
  )
}

function RegistrationPage() {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [summary, setSummary] = useState(false)
  const formRef = useRef(null)
  const navigate = useNavigate()
  const allErrors = validate(values)
  const visibleErrors = Object.fromEntries(Object.entries(allErrors).filter(([name]) => touched[name] || submitted))

  function updateValue(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    setTouched((current) => ({ ...current, [name]: true }))
  }

  function field(name, id, label, options = {}) {
    const error = visibleErrors[name]
    const valid = touched[name] && !allErrors[name] && values[name]
    return (
      <FormField id={id} label={label} error={error} valid={Boolean(valid)} hint={options.hint}>
        {({ describedBy, invalid }) => options.render({ describedBy, invalid, value: values[name], onChange: (value) => updateValue(name, value), onBlur: () => setTouched((current) => ({ ...current, [name]: true })) })}
      </FormField>
    )
  }

  function submitForm(event) {
    event.preventDefault()
    setSubmitted(true)
    setSummary(true)
    if (Object.keys(allErrors).length) {
      requestAnimationFrame(() => {
        const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]')
        firstInvalid?.focus()
        firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      return
    }
    const reference = `FV-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString().slice(-6)}`
    navigate('/success', { state: { reference } })
  }

  const input = (name, id, label, type = 'text', extra = {}) => field(name, id, label, {
    ...extra,
    render: ({ describedBy, invalid, value, onChange, onBlur }) => (
      <input id={id} name={name} type={type} value={value} onChange={(event) => onChange(extra.transform ? extra.transform(event.target.value) : event.target.value)} onBlur={onBlur} aria-invalid={invalid} aria-describedby={describedBy} autoComplete={extra.autoComplete} inputMode={extra.inputMode} />
    ),
  })

  return (
    <section className="registration-page container" aria-labelledby="registration-heading">
      <div className="page-intro">
        <div><p className="eyebrow">APPLICATION · STEP 1 OF 1</p><h1 id="registration-heading">Registration form</h1><p>Complete each section. Fields marked with <span className="required-mark">*</span> are required.</p></div>
        <Link className="back-link" to="/">← Back to home</Link>
      </div>
      <div className="notice-banner" role="note"><span className="notice-symbol" aria-hidden="true">i</span><p><strong>College project simulation.</strong> This form is not an official government application. ID numbers are checked for format only, not verified against a government database.</p></div>

      <form ref={formRef} className="application-form" onSubmit={submitForm} noValidate>
        {summary && Object.keys(allErrors).length > 0 && <div className="validation-summary" role="alert" aria-live="assertive"><strong>Please review your application</strong><span>{Object.keys(allErrors).length} {Object.keys(allErrors).length === 1 ? 'field needs' : 'fields need'} attention before you can continue.</span></div>}

        <fieldset className="form-section">
          <legend><span className="section-number">01</span><span><strong>Personal information</strong><small>Enter your details as they appear on your records.</small></span></legend>
          <div className="form-grid">
            {input('fullName', 'fullName', 'Full name', 'text', { autoComplete: 'name' })}
            {input('dateOfBirth', 'dateOfBirth', 'Date of birth', 'date', { autoComplete: 'bday' })}
            {field('gender', 'gender', 'Gender', { render: ({ describedBy, invalid, value, onChange, onBlur }) => <select id="gender" name="gender" value={value} onChange={(event) => onChange(event.target.value)} onBlur={onBlur} aria-invalid={invalid} aria-describedby={describedBy}><option value="">Select gender</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select> })}
            {input('mobile', 'mobile', 'Mobile number', 'tel', { inputMode: 'numeric', autoComplete: 'tel-national' })}
            {input('email', 'email', 'Email address', 'email', { autoComplete: 'email' })}
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend><span className="section-number">02</span><span><strong>Identity details</strong><small>These entries are validated for format only.</small></span></legend>
          <div className="form-grid">
            {input('aadhaar', 'aadhaar', 'Aadhaar number', 'text', { inputMode: 'numeric', hint: '12 digits, shown in groups of four. Not stored or transmitted.', transform: formatAadhaar })}
            {input('epic', 'epic', 'Voter ID / EPIC number', 'text', { hint: 'Format check only; this is not verified against a government database.', transform: (value) => value.toUpperCase() })}
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend><span className="section-number">03</span><span><strong>Address</strong><small>Provide your current residential address.</small></span></legend>
          <div className="form-grid">
            {field('address', 'address', 'Address', { render: ({ describedBy, invalid, value, onChange, onBlur }) => <textarea id="address" name="address" rows="3" value={value} onChange={(event) => onChange(event.target.value)} onBlur={onBlur} aria-invalid={invalid} aria-describedby={describedBy} autoComplete="street-address" /> })}
            {field('state', 'state', 'State / Union Territory', { render: ({ describedBy, invalid, value, onChange, onBlur }) => <select id="state" name="state" value={value} onChange={(event) => onChange(event.target.value)} onBlur={onBlur} aria-invalid={invalid} aria-describedby={describedBy}><option value="">Select state or territory</option>{statesAndTerritories.map((state) => <option key={state}>{state}</option>)}</select> })}
            {input('district', 'district', 'District')}
            {input('pincode', 'pincode', 'Pincode', 'text', { inputMode: 'numeric', autoComplete: 'postal-code' })}
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend><span className="section-number">04</span><span><strong>Secure your application</strong><small>Create a password for this demonstration form.</small></span></legend>
          <div className="form-grid">
            {input('password', 'password', 'Password', 'password', { autoComplete: 'new-password', hint: 'At least 8 characters, including uppercase, lowercase, number, and special character.' })}
            {input('confirmPassword', 'confirmPassword', 'Confirm password', 'password', { autoComplete: 'new-password' })}
          </div>
          <div className={`terms-field${visibleErrors.terms ? ' has-error' : ''}`}>
            <input id="terms" name="terms" type="checkbox" checked={values.terms} onChange={(event) => updateValue('terms', event.target.checked)} aria-invalid={Boolean(visibleErrors.terms)} aria-describedby={visibleErrors.terms ? 'terms-message' : 'terms-copy'} />
            <label htmlFor="terms" id="terms-copy">I confirm that the information entered is accurate and understand this is a college project simulation.</label>
            {visibleErrors.terms && <small className="field-error" id="terms-message" role="alert">{visibleErrors.terms}</small>}
          </div>
        </fieldset>

        <div className="form-actions"><p>Your information remains in this page only and is not saved or sent.</p><button className="button button-primary submit-button" type="submit" disabled={submitted && Object.keys(allErrors).length > 0}>Review and submit <span aria-hidden="true">→</span></button></div>
      </form>
    </section>
  )
}

export default RegistrationPage