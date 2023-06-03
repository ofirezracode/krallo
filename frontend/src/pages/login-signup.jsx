import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { Link } from "react-router-dom";
// import { ImgUploader } from '../cmps/img-uploader'
import footerImgRight from '../assets/img/right-footer-img.svg'
import footerImgLeft from '../assets/img/left-footer-img.svg'
import KralloLogo from "../assets/img/krallo-logo-blue.svg"

export default function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        props.onLogin(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        props.onSignup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="login-page">
            <img className='login-logo-img' src={KralloLogo} alt="logo" />
            <section className='main-login'>
                <div className='login-container'>
                    <div className='login-container-layout'>
                        {isSignup && <div>
                            <h1 className='login-title'>Log in to Krallo</h1>
                            <div className='login-password-container'>
                                <form className='login-form' onSubmit={onLogin}>
                                    <input className='email-input' type="email" placeholder='Enter email' />
                                    <button className='continue-btn'>Continue</button>
                                </form>
                            </div>
                        </div>}
                        {!isSignup && <div>
                            <h1 className='sginup-title'>Sing up for your account</h1>
                            <div className='login-password-container'>
                                <form className='login-form' onSubmit={onLogin}>
                                    <input className='email-input' type="email" placeholder='Enter email' />
                                    <p className='acknowledge-pra'>By clicking “Continue” below, you agree to the Atlassian Cloud Terms of Service and acknowledge the Privacy Policy.</p>
                                    <button className='continue-btn-gray'>Continue</button>
                                </form>
                            </div>
                        </div>}
                        <div className='login-separator'>OR</div>
                        <ul className='login-links clean-list'>
                            <li><Link><span><img className='login-icon google' src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg" alt="slack" /></span><span className='login-label'>Continue with Google</span></Link></li>
                            <li><Link><span ><img className='login-icon microsoft' src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/72ece804e5285ab6507e2406157cda3c/microsoft-logo.svg" alt="slack" /></span><span className='login-label'>Continue with Microsoft</span></Link></li>
                            <li><Link><span ><img className='login-icon apple' src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/6fc4ecf05a97cfb43cfcbb14738a5aa0/apple-logo-black.svg" alt="slack" /></span><span className='login-label' >Continue with Apple</span></Link></li>
                            <li><Link><span ><img className='login-icon slack' src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/267584bf90783090ede8f337d9baf909/slack-logo.svg" alt="slack" /></span><span className='login-label'>Continue with Slack</span></Link></li>
                        </ul>
                        <hr />
                        {isSignup && < ul className='signup-account clean-list'>
                            <li ><Link>Sign up for an account</Link></li>
                        </ul>}
                        {!isSignup && < ul className='login-account clean-list'>
                            <li ><Link>Already have an account? Log In</Link></li>
                        </ul>}
                    </div>
                </div>
            </section>
            <footer >
                <div className='img-footer-container'>
                    <div className='footer-img-left'><img src={footerImgLeft} alt="footer image" /></div>
                    <div className='footer-img-right'><img src={footerImgRight} alt="footer image" /></div>
                </div>
            </footer>

            {/* <p>
                <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
            </p>
            {!isSignup && <form className="login-form" onSubmit={onLogin}>
                <select
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                >
                    <option value="">Select User</option>
                    {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                </select> */}
            {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    /> */}
            {/* <button>Login!</button>
            </form>}
            <div className="signup-section">
                {isSignup && <form className="signup-form" onSubmit={onSignup}>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Fullname"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <ImgUploader onUploaded={onUploaded} />
                    <button >Signup!</button>
                </form>}
            </div> */}
        </div>
    )
}