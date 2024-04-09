import React, { useEffect, useState } from "react";
import "./App.css";

const FollowComponent = ({ img, topText, bottomText, link }) => {
  return (
    <a href={link} className="f-l">
      <img src={img} alt={topText} />
      <section>
        <p>{topText}</p>
        <span>{bottomText}</span>
      </section>
    </a>
  );
};

const tele = window.Telegram.WebApp
const App = () => {
  //Executes whenever query is changed
  useEffect(() => {
    tele.ready()
    tele.BackButton.isVisible = true
    tele.BackButton.show()
  }, []);

  return (
    <main className="app_wrapper">
      <h1>Welcome to @crypto</h1>
      <section className="s-1">
        <img src="/assets/images/logo.jpg" />
        <span>@crypto</span>
      </section>

      <section className="s-2">
        <span className="f-t-h">Follow our socials</span>
        <FollowComponent
          img={"/assets/images/youtube.png"}
          topText={"Subscribe to @crypto on Youtube"}
          bottomText={"@crypto on Youtube"}
          link={"https://www.youtube.com/crypto"}
        />

        <FollowComponent
          img={"/assets/images/tiktok.png"}
          topText={"Follow @crypto on Tiktok"}
          bottomText={"@crypto is on Tiktok"}
          link={"https://www.tiktok.com/@crypto"}
        />

        <FollowComponent
          img={"/assets/images/onlyfans.png"}
          topText={"Subscribe to our Onlyfans"}
          bottomText={"@crypto is on Onlyfans"}
          link={"https://onlyfans.com/crypto"}
        />
      </section>
    </main>
  );
};

export default App;
