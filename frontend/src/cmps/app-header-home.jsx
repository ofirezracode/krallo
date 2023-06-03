import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "../routes";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { login, logout, signup } from "../store/user.actions.js";
import { LoginSignup } from "../pages/login-signup.jsx";
import Img from "../assets/img/logo.svg"


export function AppHeaderHome() {
    // const user = useSelector(storeState => storeState.userModule.user)

    // async function onLogin(credentials) {
    //     try {
    //         const user = await login(credentials)
    //         showSuccessMsg(`Welcome: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot login')
    //     }
    // }
    // async function onSignup(credentials) {
    //     try {
    //         const user = await signup(credentials)
    //         showSuccessMsg(`Welcome new user: ${user.fullname}`)
    //     } catch(err) {
    //         showErrorMsg('Cannot signup')
    //     }
    // }
    // async function onLogout() {
    //     try {
    //         await logout()
    //         showSuccessMsg(`Bye now`)
    //     } catch(err) {
    //         showErrorMsg('Cannot logout')
    //     }
    // }

    return (
        <header className="app-header-home flex between">
            <div className="logo flex column between">
                {/* <span>ATTLASSIAN</span> */}
                <Link to={'/'}><img className="logo-img" src={Img} alt="logo" /></Link>
            </div>
            <nav className="nav flex">
                <Link to={'/workspaces'}>Workspaces</Link>

                {/* {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                } */}
            </nav>
            <div className="header-btns flex">
                <Link to={'/login'} className="login-btn flex align-center justify-center">Log in</Link>
                <Link className="try-btn flex align-center justify-center">Get Krallo for free</Link>
            </div>
        </header>
    )
}
