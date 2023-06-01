import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { CHANGE_COUNT } from "../store/user.reducer";
import HomeImg from "../assets/img/home-img.webp"

export default function Home() {
  //   const dispatch = useDispatch();
  //   const count = useSelector((storeState) => storeState.userModule.count);

  //   function changeCount(diff) {
  //     console.log("Changing count by:", diff);
  //     dispatch({ type: CHANGE_COUNT, diff });
  //   }

  return (
    <section className="home">
      <section className="home-container flex">
        <div className="home-txt">
          <h1 className="txt-opening"> Krallo brings all your tasks, teammate, and tools together</h1>
          <p className="txt-opening-p">Keep everything in the same place-even if your team isn't.</p>

              <button className="signup-btn" >Try demo - it's free!</button>
            </div>
      <div className="home-img">
      <img src={HomeImg} alt="home-image" />
      </div>
      </section>
      <div className="wave"></div>
    </section>
  );
}
