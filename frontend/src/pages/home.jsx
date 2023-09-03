import React from 'react'
import HomeImg from '../assets/img/home-img.webp'
import { boardService } from '../services/board.service'
import { Link, useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'
import { login } from '../store/user.actions'

export function Home() {

  const navigate = useNavigate()

  async function onTryDemo() {
    if (!userService.getLoggedInUser()) {
      await login({ email: 'guest@krallo.com', password: '123' })
    }
    navigate('/workspaces')
  }

  return (
    <section className="home">
      <section className="home-first-container">
        <section className="home-container flex">
          <div className="home-txt">
            <h1 className="txt-opening"> Krallo brings all your tasks, teammates, and tools together</h1>
            <p className="txt-opening-p">Keep everything in the same place-even if your team isn’t.</p>
            <Link className="signup-btn" onClick={onTryDemo}>
              Try demo - it’s free!
            </Link>
          </div>
          <div className="home-img">
            <img src={HomeImg} alt="home-image" />
          </div>
        </section>
      </section>
      <div className="bg-color-productivity">
        <div className="productivity-container">
          <div className="productivity-text-container flex wrap">
            <div className="productivity-header">
              <div className="krallo-101">KRALLO 101</div>
              <h2>A productivity powerhouse</h2>
            </div>
            <div className="productivity-text">
              <p>
                Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what
                needs to get done.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
