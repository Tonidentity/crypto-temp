import React, { useEffect, useState } from "react";
import "./App.css";

const FollowComponent = ({ img, topText, bottomText, joined, step }) => {
  return (
    <div className="fl-wrap">
      <span className="step-sp">Step {step}</span>

      <div className="f-l">
        {!joined && <img src={img} alt={topText} />}
        {joined && (
          <section className="check">
            <img src="/assets/icons/check.svg" className="ci" />
          </section>
        )}
        <section>
          <p>{topText}</p>
          <span>{bottomText}</span>
        </section>
      </div>
    </div>
  );
};

const tele = window.Telegram.WebApp;
const App = () => {
  //Executes whenever query is changed
  useEffect(() => {
    tele.ready();
    tele.MainButton.show();
    tele.BackButton.show()
    tele.MainButton.text = "Start with tasks";
    tele.MainButton.color = "#F4AD00";
    tele.MainButton.textColor = "#fff";
    tele.expand();
  }, []);

  const [youtubeJoined, setYoutubeJoined] = useState(false);
  const [tiktokJoined, setTiktokJoined] = useState(false);
  const [onlyfansJoined, setOnlyfansJoined] = useState(false);

  const handleClick = () => {
    if (!tiktokJoined) {
      window.open("https://www.tiktok.com/@crypto", "_self");
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setTiktokJoined(true, () => {});
      }, 2200);
      return;
    }

    if (!youtubeJoined) {
      window.open("https://www.youtube.com/crypto", "_self");
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setYoutubeJoined(true, () => {});
      }, 2200);
      return;
    }

    if (!onlyfansJoined) {
      window.open("https://onlyfans.com/crypto", "_self");
      setTimeout(() => {
        tele.MainButton.text = "Done! Proceed Forward";
        setOnlyfansJoined(true, () => {});
      }, 2200);
      return;
    }

    if (onlyfansJoined && youtubeJoined && tiktokJoined) {
      window.location.href = "https://t.me/crypto";
    }
  };

  // const handleProceed = () => {
  //   if (onlyfansJoined && youtubeJoined && tiktokJoined) {
  //     tele.MainButton.text = "Proceed to our channel";
  //   }
  // };

  tele.MainButton.onClick(handleClick);
  tele.BackButton.onClick(()=>window.history.back())

  return (
    <main className="app_wrapper">
      <h1>Welcome to @crypto</h1>
      <section className="s-1">
        <section>
          <img src="/assets/images/logo.jpg" />
          <span>@crypto</span>
        </section>
        <p>Get 100,000 $Loot by joining the @Crypto Army</p>
      </section>

      <section className="s-2">
        <h2>Steps to Join the @Crypto Army</h2>
        <FollowComponent
          img={"/assets/images/tiktok.png"}
          topText={"Follow @crypto on Tiktok"}
          bottomText={"@crypto is on Tiktok"}
          joined={tiktokJoined}
          step={"1"}
        />

        {tiktokJoined && (
          <FollowComponent
            img={"/assets/images/youtube.png"}
            topText={"Subscribe to @crypto on Youtube"}
            bottomText={"@crypto on Youtube"}
            joined={youtubeJoined}
            step={"2"}
          />
        )}

        {youtubeJoined && (
          <FollowComponent
            img={"/assets/images/onlyfans.png"}
            topText={"Subscribe to our Onlyfans"}
            bottomText={"@crypto is on Onlyfans"}
            joined={onlyfansJoined}
            step={"3"}
          />
        )}
      </section>
    </main>
  );
};

export default App;
