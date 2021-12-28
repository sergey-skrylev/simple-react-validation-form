import { useEffect, useState } from "react";

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState("Поле не может быть пустым")
  const [passwordError, setPasswordError] = useState("Поле не может быть пустым")
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  },[emailError, passwordError])

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Wrong email')
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 4 || e.target.value.length > 8) {
      setPasswordError('Пароль должен быть длиннее 3 и не больше 8 символов')
      if (!e.target.value) {
        setPasswordError('')
      }
    } else {
      setPasswordError('')
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      default:
    }
  }

  return (
    <div className="App">
      <form>
        <h1>Регистрация</h1>
        {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
        <input onChange={e => emailHandler(e)}
          value={email}
          onBlur={e => blurHandler(e)}
          name="email"
          type="text"
          placeholder='Enter your email' />

        {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
        <input onChange={e => passwordHandler(e)}
          value={password}
          onBlur={e => blurHandler(e)}
          name="password" type="text"
          placeholder='Enter your password' />
        <button disabled={!formValid}type="submit">Регистрация</button>
      </form>
    </div>
  );
}

export default App;
