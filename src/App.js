import { useEffect, useState } from "react";
import "./App.css"
import "./index.css"

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
  useEffect(() => {
    tele.ready();
    tele.MainButton.show();
    tele.MainButton.text = "Start with tasks";
    tele.MainButton.color = "#F4AD00";
    tele.MainButton.textColor = "#fff";
    tele.expand();
  }, []);

  const [tiktokJoined, setTiktokJoined] = useState(
    localStorage.getItem("tiktok") == "true"
  );
  const [youtubeJoined, setYoutubeJoined] = useState(
    localStorage.getItem("youtube") == "true"
  );
  const [onlyfansJoined, setOnlyfansJoined] = useState(
    localStorage.getItem("onlyfans") == "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      if(localStorage.getItem("tiktok")=="true"){
        setTiktokJoined(true)
      }

      if(localStorage.getItem("youtube")=="true"){
        setYoutubeJoined(true)
      }

      if(localStorage.getItem("onlyfans")=="true"){
        setOnlyfansJoined(true)
      }
    };

    handleStorageChange(); // Initialize the joined state
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleClick = (link) => {
    window.open(link, "_blank", "rel=noreferrer noopener");
  };

  tele.MainButton.onClick(() => {
    if (!tiktokJoined) {
      handleClick("https://www.tiktok.com/@crypto");
      setTimeout(() => {
        tele.MainButton.text = "Continue with tasks";
        localStorage.setItem("tiktok", true);
      }, 1800);
      return;
    }

    if (youtubeJoined) {
      handleClick("https://www.youtube.com/crypto");
      setTimeout(() => {
        tele.MainButton.text = "Continue with tasks";
        localStorage.setItem("youtube", true);
      }, 1800);
      return;
    }

    if (onlyfansJoined) {
      handleClick("https://onlyfans.com/crypto");
      setTimeout(() => {
        tele.MainButton.text = "Done! Proceed Forward";
        localStorage.setItem("onlyfans", true);
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
