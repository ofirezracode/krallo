import { Link, NavLink } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import Img from "../assets/img/logo.svg"


export function AppHeaderHome() {
 

    return (
        <header className="app-header-home flex between">
            <div className="logo flex column between">
                <Link to={'/'}><img className="logo-img" src={Img} alt="logo" /></Link>
            </div>
            <nav className="nav flex">
                <NavLink to={'/workspaces'}>Workspaces</NavLink>
            </nav>
            <div className="header-btns flex">
                <Link to={'/login'} className="login-btn flex align-center justify-center">Log in</Link>
                <Link className="try-btn flex align-center justify-center">Get Krallo for free</Link>
            </div>
        </header>
    )
}
