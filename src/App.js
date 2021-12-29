import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState("Email cannot be empty")
  const [passwordError, setPasswordError] = useState("Password cannot be empty")
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Wrong email")
    } else {
      setEmailError("")
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 4 || e.target.value.length > 8) {
      setPasswordError("A password must contain 4 to 8 characters")
      if (!e.target.value) {
        setPasswordError("")
      }
    } else {
      setPasswordError("")
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true)
        break
      case "password":
        setPasswordDirty(true)
        break
      default:
    }
  }

  return (
    <div className={styles.register}>
      <form className={styles.register_form}>
        <h1 className={styles.register_h1}>SIGN UP</h1>
        {(emailDirty && emailError) && <div className={styles.error}>{emailError}</div>}
        <input className={styles.input} onChange={(e) => emailHandler(e)}
          value={email}
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Enter your email" />

        {(passwordDirty && passwordError) && <div className={styles.error}>{passwordError}</div>}
        <input className={styles.input} onChange={(e) => passwordHandler(e)}
          value={password}
          onBlur={(e) => blurHandler(e)}
          name="password" type="text"
          placeholder="Enter your password" />
        <button
          className={styles.input + " " + styles.input_button}
          disabled={!formValid}
          type="submit">SIGN UP</button>
      </form>
    </div>
  );
}

export default App;
