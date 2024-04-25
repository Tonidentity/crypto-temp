import React, { useEffect, useState } from "react";
import "./App.css";
import scroll from "./helpers/scroll";
import scrollToBottom from "./helpers/scroll";

const CheckMark = () => {
  return (
    <figure className="w-full h-full absolute flex justify-center items-center check">
      <section className="w-[50%] h-[50%] flex justify-center items-center bg-[#31333D]">
        <img src="/assets/icons/check.svg" className="w-[70%] h-[70%]" />
      </section>
    </figure>
  );
};

const FollowComponent = ({ joined, step, type, prompt }) => {
  return (
    <>
      {type == 1 && (
        <section className="w-full my-[40px] relative h-[93px] flex justify-center items-center">
          {/* Border image */}
          <img
            src="/assets/images/gradient_border.svg"
            className="w-full h-full absolute top-0 left-0"
          />

          <section className="flex justify-between items-center w-[95%] h-[65px]">
            <section className="flex justify-start items-center h-full">
              <figure className="w-[69px] h-full mr-[12px]">
                <img
                  src="/assets/icons/Group 33567.svg"
                  className="w-full h-full"
                />
              </figure>

              <section className="flex flex-col justify-center items-start">
                <span className="mb-[12px] text-[#D6D6D6] text-[18px]">
                  100,000 $LOOT
                </span>
                <p className="text-[#B2B5BB] text-[12px] font-[Aldrich] font-normal">
                  Pool reward
                </p>
              </section>
            </section>

            <section className="flex justify-start items-center mr-[5px]">
              <span className="text-[#B0B7C7] text-[14px]">Claim Pool</span>
              <figure className="w-[18px] h-[11px] ml-[5px]">
                <img
                  src="/assets/icons/Arrow - Right 3 (1).svg"
                  className="w-full h-full"
                />
              </figure>
            </section>
          </section>
        </section>
      )}

      {type == 2 && (
        <section className="flex flex-col justify-start items-start mb-[40px] w-full">
          <span className="mb-[20px] font-[Aldrich] font-normal">
            STEP {step}
          </span>

          <section className="w-full relative h-[93px] flex justify-center items-center">
            {/* Border image */}
            <img
              src="/assets/images/gradient_border.svg"
              className="w-full h-full absolute top-0 left-0"
            />

            <section className="flex justify-start items-center w-[95%] h-[65px]">
              <section className="flex justify-start items-center h-full">
                <figure className="w-[69px] h-full mr-[12px] relative">
                  {joined && <CheckMark />}
                  <img
                    src="/assets/icons/Group 33567.svg"
                    className="w-full h-full"
                  />
                </figure>

                <span>{prompt}</span>
              </section>
            </section>
          </section>
        </section>
      )}
    </>
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
    console.log(tele);
    setTimeout(() => {
      scrollToBottom();
    }, 1200);
  }, []);

  const [youtubeJoined, setYoutubeJoined] = useState(false);
  const [tiktokJoined, setTiktokJoined] = useState(false);
  const [onlyfansJoined, setOnlyfansJoined] = useState(false);

  useEffect(() => {
    scrollToBottom();
    setTimeout(() => {
      scrollToBottom();
    }, [850]);
  }, [youtubeJoined, tiktokJoined, onlyfansJoined]);

  const handleLinks = () => {
    if (!tiktokJoined) {
      window.open("https://www.tiktok.com/@crypto", "_blank");
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setTiktokJoined(true);
      }, 1300);
      return;
    }

    if (!youtubeJoined) {
      window.open("https://www.youtube.com/crypto", "_blank");
      tele.MainButton.text = "Continue with tasks";
      setTimeout(() => {
        setYoutubeJoined(true);
      }, 1300);
      return;
    }

    if (!onlyfansJoined) {
      window.open("https://onlyfans.com/crypto", "_blank");
      setTimeout(() => {
        tele.MainButton.text = "Done! Proceed Forward";
        setOnlyfansJoined(true);
      }, 1300);
      return;
    }
  };

  const handleClick = () => {
    if (document.querySelectorAll(".check").length == 3) {
      document.getElementById("click").click();
      tele.close();
    } else {
      handleLinks();
    }
  };

  // const handleProceed = () => {
  //   if (onlyfansJoined && youtubeJoined && tiktokJoined) {
  //     tele.MainButton.text = "Proceed to our channel";
  //   }
  // };

  tele.MainButton.onClick(handleClick);

  return (
    <main className="relative main font-medium bg-themeBlack w-[100vw] text-[#F2EFEF] max-w-[400px] min-w-[280px] min-h-screen pt-[30px] px-[15px] flex flex-col justify-start items-center">
      <a
        href="https://t.me/crypto"
        className="click opacity-0 absolute z-[-5]"
      ></a>
      <section className="flex justify-between items-center px-[5px] w-full">
        <figure className="flex justify-start items-center">
          <img
            src="/assets/icons/nav_logo.svg"
            className="w-[30px] h-[30px] mr-[5px]"
          />
          <img src="/assets/icons/@Welcome.svg" className="h-[24px]" />
        </figure>

        <figure className="flex justify-start">
          <img
            src="/assets/icons/Notification.svg"
            className="w-[24px] h-[24px] mr-[22px] items-center"
          />
          <img src="/assets/icons/Group.svg" className="w-[24px] h-[24px]" />
        </figure>
      </section>
      {/* White Line */}
      <figure className="w-full h-[10px] mt-[20px]">
        <img src="/assets/icons/Navbar Line.svg" className="w-full h-full" />
      </figure>

      <figure className="h-[260px] w-[320px] mt-[20px]">
        <img src="/assets/icons/Group 33562.svg" className="w-full h-full" />
      </figure>

      <FollowComponent type={1} />

      <span className="text-left text-[#F2EFEF] w-full block ml-[10px] text-[20px] mt-[20px]">
        Welcome to @Crypto
      </span>

      {/* White line */}
      <figure className="w-full h-[10px] my-[20px]">
        <img
          src="/assets/icons/Navbar Line (1).svg"
          className="w-full h-full"
        />
      </figure>

      <section className="flex justify-between items-start px-[5px] w-full h-[46px] mb-[10px]">
        {/* logo and text section */}
        <section className="flex justify-start items-center h-[46px]">
          <figure className="w-[46px] h-full flex justify-center items-center bg-[#31333D] rounded-[50px] mr-[10px]">
            <img
              src="/assets/images/logo-2.svg"
              className="w-[32px] h-[32px]"
            />
          </figure>

          <section className="flex flex-col justify-center items-start h-full">
            <section className="flex justify-start items-center mb-[4px]">
              <span className="font-normal">Crypto</span>
              <figure className="ml-[4px] w-[17px] h-[17px] flex justify-center items-center">
                <img src="/assets/images/badge.svg" className="w-full h-full" />
              </figure>
            </section>

            <span className="text-[15px] text-[#8698A9]">@Crypto</span>
          </section>
        </section>

        {/* Options btn section */}
        <section className="w-[24px] h-[24px] flex justify-evenly items-center">
          <div className="bg-[#8698A9] rounded-[20px] w-[4px] h-[4px]"></div>
          <div className="bg-[#8698A9] rounded-[20px] w-[4px] h-[4px]"></div>
          <div className="bg-[#8698A9] rounded-[20px] w-[4px] h-[4px]"></div>
        </section>
      </section>

      <span className="block w-full text-left mt-[30px] mb-[40px] text-[20px]">
        Follow These Steps To Claim Reward
      </span>

      <FollowComponent
        type={2}
        step={1}
        prompt={"Follow to @Crypto Tiktok"}
        joined={tiktokJoined}
      />
      {tiktokJoined && (
        <FollowComponent
          type={2}
          step={2}
          prompt={"Subscribe to @Crypto YouTube"}
          joined={youtubeJoined}
        />
      )}
      {youtubeJoined && (
        <FollowComponent
          type={2}
          step={3}
          prompt={"Subscribe to @Crypto Onlyfans"}
          joined={onlyfansJoined}
        />
      )}
    </main>
  );
};

export default App;
