// Scroll to the bottom of the page with smooth animation
const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight || document.body.scrollHeight,
    behavior: "smooth",
  });
};

module.exports = scrollToBottom