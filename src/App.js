import React, { useEffect, useState } from "react";
import "./App.css";

const FollowComponent = ({
  img,
  topText,
  bottomText,
  link,
  joined,
  handleClick,
}) => {
  return (
    <a className="f-l" onClick={() => handleClick()}>
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
    </a>
  );
};

const tele = window.Telegram.WebApp;
const App = () => {
  //Executes whenever query is changed
  useEffect(() => {
    tele.ready();
    tele.MainButton.show();
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
      window.open("https://www.tiktok.com/@crypto", "_blank");
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setTiktokJoined(true, () => {
          handleProceed();
        });
      }, 3000);
      return;
    }

    if (!youtubeJoined) {
      window.open("https://www.youtube.com/crypto", "_blank");
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setYoutubeJoined(true, () => {
          handleProceed();
        });
      }, 3000);
      return;
    }

    if (!onlyfansJoined) {
      window.open("https://onlyfans.com/crypto", "_blank");
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setOnlyfansJoined(true, () => {
          handleProceed();
        });
      }, 3000);
      return;
    }

    if (onlyfansJoined && youtubeJoined && tiktokJoined) {
      window.location.href = "https://t.me/crypto";
    }
  };

  const handleProceed = () => {
    if (onlyfansJoined && youtubeJoined && tiktokJoined) {
      tele.MainButton.text = "Proceed to our channel";
    }
  };

  tele.onEvent("mainButtonClicked", handleClick);

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
          link={"https://www.tiktok.com/@crypto"}
          joined={tiktokJoined}
          handleClick={handleClick}
        />
        <FollowComponent
          img={"/assets/images/youtube.png"}
          topText={"Subscribe to @crypto on Youtube"}
          bottomText={"@crypto on Youtube"}
          link={"https://www.youtube.com/crypto"}
          joined={youtubeJoined}
          handleClick={handleClick}
        />

        <FollowComponent
          img={"/assets/images/onlyfans.png"}
          topText={"Subscribe to our Onlyfans"}
          bottomText={"@crypto is on Onlyfans"}
          link={"https://onlyfans.com/crypto"}
          joined={onlyfansJoined}
          handleClick={handleClick}
        />
      </section>
    </main>
  );
};

export default App;
