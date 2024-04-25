// Scroll to the bottom of the page with smooth animation
module.exports = scrollToBottom = () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight || document.body.scrollHeight,
        behavior: 'smooth'
    });
}
