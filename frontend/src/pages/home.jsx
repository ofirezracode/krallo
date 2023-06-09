import React from 'react'
import HomeImg from '../assets/img/home-img.webp'
import { boardService } from '../services/board.service'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <section className="home">
      <section className="home-first-container">
        <section className="home-container flex">
          <div className="home-txt">
            <h1 className="txt-opening"> Krallo brings all your tasks, teammates, and tools together</h1>
            <p className="txt-opening-p">Keep everything in the same place-even if your team isn’t.</p>
            {/* <button className="signup-btn"  >Try demo - it’s free!</button>å */}
            <Link className="signup-btn" to="/workspaces">
              Try demo - it’s free!
            </Link>
          </div>
          <div className="home-img">
            <img src={HomeImg} alt="home-image" />
          </div>
        </section>
      </section>
      <div className="productivity-container">
        <div className="productivity-text-container flex wrap">
          <div>
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
