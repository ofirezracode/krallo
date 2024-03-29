import { Link, useNavigate } from 'react-router-dom'
import Img from '../assets/img/logo.svg'
import { userService } from '../services/user.service'
import { login } from '../store/user.actions'

export function AppHeaderHome() {
  const navigate = useNavigate()

  async function onNavToWorkspaces() {
    if (!userService.getLoggedInUser()) {
      await login({ email: 'guest@krallo.com', password: '123' })
    }
    navigate('/workspaces')
  }

  async function onKralloForFree() {
    onNavToWorkspaces()
  }

  return (
    <div className="app-header-home-container">
      <header className="app-header-home flex between">
        <div className="logo flex column between">
          <Link to={'/'}>
            <img className="logo-img" src={Img} alt="logo" />
          </Link>
        </div>
        <nav className="nav flex">
          <label onClick={onNavToWorkspaces}>Workspaces</label>
        </nav>
        <div className="header-btns flex">
          <Link to={'/login'} className="login-btn flex align-center justify-center">
            Log in
          </Link>
          <label className="try-btn flex align-center justify-center" onClick={onKralloForFree}>
            Get Krallo for free
          </label>
        </div>
      </header>
    </div>
  )
}
