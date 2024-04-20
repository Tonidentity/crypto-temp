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
  const [youtubeJoined, setYoutubeJoined] = useState(false);
  const [tiktokJoined, setTiktokJoined] = useState(false);
  const [onlyfansJoined, setOnlyfansJoined] = useState(false);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(
      sessionStorage.getItem("cryptoJoined") || "{}"
    );
    setYoutubeJoined(storedData.youtubeJoined || false);
    setTiktokJoined(storedData.tiktokJoined || false);
    setOnlyfansJoined(storedData.onlyfansJoined || false);
    setAllTasksCompleted(storedData.allTasksCompleted || false);
  }, []);

  useEffect(() => {
    tele.ready(); // Keep this line for initialization
    tele.MainButton.show(); // Keep this line to show the button
    tele.MainButton.text = "Start with tasks"; // Keep this line to set button text
    tele.MainButton.color = "#F4AD00"; // Keep this line for button color
    tele.MainButton.textColor = "#fff"; // Keep this line for button text color
    tele.expand(); // Keep this line to expand content
  }, []);

  const handleClick = () => {
    // if (allTasksCompleted) return; // All tasks completed, do nothing

    if (!tiktokJoined) {
      window.open(
        "https://www.tiktok.com/@crypto",
        "_blank",
        "rel=noreferrer noopener"
      );
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setTiktokJoined(true);
        sessionStorage.setItem(
          "cryptoJoined",
          JSON.stringify({
            tiktokJoined: true,
            allTasksCompleted: !youtubeJoined && !onlyfansJoined, // Update flag only after first task
          })
        );
      }, 2200);
      return;
    }

    if (!youtubeJoined) {
      window.open(
        "https://www.youtube.com/crypto",
        "_blank",
        "rel=noreferrer noopener"
      );
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setYoutubeJoined(true);
        sessionStorage.setItem(
          "cryptoJoined",
          JSON.stringify({
            tiktokJoined: true,
            youtubeJoined: true,
            allTasksCompleted: !onlyfansJoined, // Update flag after second task
          })
        );
      }, 2200);
      return;
    }

    if (!onlyfansJoined) {
      window.open(
        "https://onlyfans.com/crypto",
        "_blank",
        "rel=noreferrer noopener"
      );
      setTimeout(() => {
        tele.MainButton.text = "Done! Proceed Forward"; // Set button text only after completing Onlyfans
        setOnlyfansJoined(true);
        // Update flag and redirect to Telegram group after completing the final task (Onlyfans)
        sessionStorage.setItem(
          "cryptoJoined",
          JSON.stringify({
            tiktokJoined: true,
            youtubeJoined: true,
            onlyfansJoined: true,
            allTasksCompleted: true,
          })
        );
        if (allTasksCompleted) {
          window.location.href = "https://t.me/crypto";
        }
      }, 2200);
      return;
    }
  };

  tele.MainButton.onClick(handleClick);

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
