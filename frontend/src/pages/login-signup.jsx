import { useState, useEffect } from 'react'
import { login, signup } from '../store/user.actions.js'
import footerImgRight from '../assets/img/right-footer-img.svg'
import footerImgLeft from '../assets/img/left-footer-img.svg'
import KralloLogo from '../assets/img/krallo-logo-blue.svg'
import { loadUsers } from '../store/user.actions'
import { useNavigate } from 'react-router-dom'
import { GoogleLoginBtn } from '../cmps/google-login-btn.jsx'

export function LoginSignup() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [isSignup, setIsSignup] = useState(sessionStorage.getItem('isKralloForFree'))
  const navigate = useNavigate()

  useEffect(() => {
    loadUsers()
    sessionStorage.removeItem('isKralloForFree')
  }, [])

  async function onGoogleLogin(userData) {
    const { email, name, picture } = userData;

    const googleUser = {
      email,
      password: '',
      fullname: name,
      imgUrl: picture,
    }
    try{
    const user = await signup(googleUser)
    navigate(`/workspaces`)
    clearState()
    } catch (err) {
      console.log('Google login has failed:', err)
    }
  }

  async function onLogin(ev) {
    if (ev) ev.preventDefault()
    try {
      const user = await login(credentials)
      navigate(`/workspaces`)
      clearState()
    } catch (err) {
      console.log('cannot login')
    }
  }

  async function onSignup(ev) {
    if (ev) ev.preventDefault()
    try {
      const user = await signup(credentials)
      navigate(`/workspaces`)
      clearState()
    } catch (err) {
      console.log('cannot sign up')
    }
  }

  function clearState() {
    setCredentials({ email: '', password: '', fullname: '', imgUrl: '' })
    setIsSignup(false)
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
  }

  return (
    <div className="login-page">
      <img className="login-logo-img" src={KralloLogo} alt="logo" />
      <section className="main-login">
        <div className="login-container">
          <div className="login-container-layout flex column">
            {!isSignup && (
              <div>
                <h1 className="login-title">Log in to Krallo</h1>
                <div className="login-password-container">
                  <form className="login-form" onSubmit={(e) => onLogin(e)}>
                    <input
                      className="email-input login-input"
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                    <button className="continue-btn flex center">Continue</button>
                  </form>
                  <p>OR</p>
                  <GoogleLoginBtn onGoogleLogin={onGoogleLogin} />
                </div>
              </div>
            )}
            {isSignup && (
              <div>
                <h1 className="signup-title">Sign up for your account</h1>
                <div className="login-password-container">
                  <form className="login-form" onSubmit={(e) => onSignup(e)}>
                    <input
                      className="email-input signup-input"
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                    <p className="acknowledge-pra">
                      By clicking “Continue” below, you agree to the Atlassian Cloud Terms of Service and acknowledge the Privacy Policy.
                    </p>
                    <button className="continue-btn-gray flex center">Continue</button>
                  </form>
                </div>
              </div>
            )}
            <hr />
            <button className={`account ${!isSignup ? 'signup-account' : 'login-account '} `} onClick={toggleSignup}>
              {!isSignup ? 'Sign up for an account' : 'Already have an account? Log In'}
            </button>
          </div>
        </div>
      </section>
      <footer>
        <div className="img-footer-container">
          <div className="footer-img-left">
            <img src={footerImgLeft} alt="footer image" />
          </div>
          <div className="footer-img-right">
            <img src={footerImgRight} alt="footer image" />
          </div>
        </div>
      </footer>
    </div>
  )
}
