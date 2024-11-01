// Add a simple message to attract attention when users hover over the Telegram link
const tgLink = document.querySelector('.tg-link');
tgLink.addEventListener('mouseover', () => {
    tgLink.textContent = "Join Us for Free!";
});
tgLink.addEventListener('mouseleave', () => {
    tgLink.textContent = "Join us on Telegram";
});
