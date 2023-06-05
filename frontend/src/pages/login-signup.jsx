import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { login, signup } from "../store/user.actions.js";
import footerImgRight from '../assets/img/right-footer-img.svg'
import footerImgLeft from '../assets/img/left-footer-img.svg'
import KralloLogo from "../assets/img/krallo-logo-blue.svg"
import { loadUsers } from '../store/user.actions';
import { useNavigate } from "react-router-dom";

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [isSignup, setIsSignup] = useState(false)
    const users = useSelector((storeState) => storeState.userModule.users)
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

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
            <img className='login-logo-img' src={KralloLogo} alt="logo" />
            <section className='main-login'>
                <div className='login-container'>
                    <div className='login-container-layout flex column'>
                        {isSignup && <div>
                            <h1 className='login-title'>Log in to Krallo</h1>
                            <div className='login-password-container'>
                                <form className='login-form' onSubmit={(e) => onLogin(e)}>
                                    <input className='email-input login-input' type="email" placeholder='Enter email' name="email"
                                        value={credentials.email} onChange={handleChange} />
                                    <button className='continue-btn'>Continue</button>
                                </form>
                            </div>
                        </div>}
                        {!isSignup && <div>
                            <h1 className='sginup-title'>Sing up for your account</h1>
                            <div className='login-password-container'>
                                <form className='login-form' onSubmit={(e) => onSignup(e)}>
                                    <input className='email-input signup-input' type="email" placeholder='Enter email' name="email"
                                        value={credentials.email} onChange={handleChange} />
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
                        <button className={`account ${!isSignup ? 'signup-account' : 'login-account '} `} onClick={toggleSignup}>{!isSignup ? 'Already have an account? Log In' : 'Sign up for an account'}</button>
                    </div>
                </div>
            </section>
            <footer >
                <div className='img-footer-container'>
                    <div className='footer-img-left'><img src={footerImgLeft} alt="footer image" /></div>
                    <div className='footer-img-right'><img src={footerImgRight} alt="footer image" /></div>
                </div>
            </footer>
        </div>
    )
}