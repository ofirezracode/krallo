import React from "react";
import HomeImg from "../assets/img/home-img.webp"
import { boardService } from "../services/board.service.local";

export function Home() {

  return (
    <section className="home">
      <section className="home-container flex">
        <div className="home-txt">
          <h1 className="txt-opening"> Krallo brings all your tasks, teammate, and tools together</h1>
          <p className="txt-opening-p">Keep everything in the same place-even if your team isn’t.</p>
          <button className="signup-btn" onClick={() => boardService.createBoardFromTemplate()} >Try demo - it’s free!</button>
        </div>
        <div className="home-img">
          <img src={HomeImg} alt="home-image" />
        </div>
      </section>
    </section>
  )
}