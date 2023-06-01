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
    <section className="home flex">
            <div className="home-txt">
              <h1> Krallo brings all your tasks, teammate, and tools together</h1>
              <p>Keep everything in the same place-even if your team isn't.</p>
              <form className="flex wrap">
              <input className="signup-input" type="email" id="email" name="email" placeholder="Email" />
              <button className="signup-btn" >Sign up - it's free!</button>
              </form>
            </div>
      <div>
      <img src={HomeImg} alt="home-image" />
      </div>
    </section>
  );
}
