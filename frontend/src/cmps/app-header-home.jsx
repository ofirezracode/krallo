import { Link, NavLink, useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import Img from '../assets/img/logo.svg'
import { userService } from '../services/user.service'
import { login } from '../store/user.actions'

export function AppHeaderHome() {
  const navigate = useNavigate()

  async function onNavToWorkspaces() {
    if (!userService.getLoggedinUser()) {
      await login({ email: 'guest@krallo.com', password: '123' })
    }
    navigate('/workspaces')
  }

  async function onKralloForFree() {
    sessionStorage.setItem('isKralloForFree', true)
    navigate('/login')
  }

  return (
    <header className="app-header-home flex between">
      <div className="logo flex column between">
        <Link to={'/'}>
          <img className="logo-img" src={Img} alt="logo" />
        </Link>
      </div>
      <nav className="nav flex">
        <label onClick={onNavToWorkspaces}>Workspaces</label>
        {/* <NavLink to={'/workspaces'}>Workspaces</NavLink> */}
      </nav>
      <div className="header-btns flex">
        <Link to={'/login'} className="login-btn flex align-center justify-center">
          Log in
        </Link>
        <label className="try-btn flex align-center justify-center" onClick={onKralloForFree}>
          Get Krallo for free
        </label>
        {/* <Link to={'/login'} className="try-btn flex align-center justify-center">
          Get Krallo for free
        </Link> */}
      </div>
    </header>
  )
}
