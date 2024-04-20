import React, { useEffect, useState } from "react";
import "./App.css";

const FollowComponent = ({ img, topText, bottomText, step }) => {
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const isJoined = localStorage.getItem(img) === "true";
      setJoined(isJoined);
    };

    handleStorageChange(); // Initialize the joined state
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [img]);

  return (
    <div className="fl-wrap">
      <span className="step-sp">Step {step}</span>

      <div className="f-l">
        {!joined && <img src={`/assets/images/${img}.png`} alt={topText} />}
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
  useEffect(() => {
    if (!localStorage.getItem("tiktok")) {
      localStorage.setItem("tiktok", "false");
    }
    if (!localStorage.getItem("youtube")) {
      localStorage.setItem("youtube", "false");
    }
    if (!localStorage.getItem("onlyfans")) {
      localStorage.setItem("onlyfans", "false");
    }
  }, []);

  useEffect(() => {
    tele.ready();
    tele.MainButton.show();
    tele.MainButton.text = "Start with tasks";
    tele.MainButton.color = "#F4AD00";
    tele.MainButton.textColor = "#fff";
    tele.expand();
  }, []);

  const [yT, setYt] = useState(false)
  const [oF, setOF] = useState(false)


  const handleClick = (link) => {
    window.open(link, "_blank", "rel=noreferrer noopener");
  };

  const setJoined = (platform) => {
    localStorage.setItem(platform, "true");
  };

  tele.MainButton.onClick(() => {
    if (!localStorage.getItem("tiktok")) {
      handleClick("https://www.tiktok.com/@crypto");
      setTimeout(() => {
        tele.MainButton.text = "Continue with tasks";
        setJoined("tiktok");
        setYt(true) //show youtube when this is clicked
      }, 1800);
      return;
    }

    if (!localStorage.getItem("youtube")) {
      handleClick("https://www.youtube.com/crypto");
      setTimeout(() => {
        tele.MainButton.text = "Continue with tasks";
        setJoined("youtube");
        setOF(true) //show onlyfans when this is clicked
      }, 1800);
      return;
    }

    if (!localStorage.getItem("onlyfans")) {
      setTimeout(() => {
        handleClick("https://onlyfans.com/crypto");
        tele.MainButton.text = "Done! Proceed Forward";
        setJoined("onlyfans");
      }, 1800);
      return;
    }

    window.location.href = "https://t.me/crypto";
  });

  return (
    <main className="app_wrapper">
      <h1>Welcome to @crypto</h1>
      <section className="s-1">
        <section>
          <img src="/assets/images/logo.jpg" alt="@crypto" />
          <span>@crypto</span>
        </section>
        <p>Get 100,000 $Loot by joining the @Crypto Army</p>
      </section>

      <section className="s-2">
        <h2>Steps to Join the @Crypto Army</h2>
        <FollowComponent
          img={"tiktok"}
          topText={"Follow @crypto on Tiktok"}
          bottomText={"@crypto is on Tiktok"}
          step={"1"}
        />
        {yT && (
          <FollowComponent
            img={"youtube"}
            topText={"Subscribe to @crypto on Youtube"}
            bottomText={"@crypto on Youtube"}
            step={"2"}
          />
        )}
        {oF && (
          <FollowComponent
            img={"onlyfans"}
            topText={"Subscribe to our Onlyfans"}
            bottomText={"@crypto is on Onlyfans"}
            step={"3"}
          />
        )}
      </section>
    </main>
  );
};

export default App;
