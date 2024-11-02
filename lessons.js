function goBack() {
    window.history.back(); // This will navigate back to the previous page in the browser history
}

// Alternatively, if you want to specify a particular page to go back to, you can do:
// function goBack() {
//     window.location.href = 'lessons.html'; // Change 'lessons.html' to your desired page
// }

document.addEventListener('DOMContentLoaded', () => {
    const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', '#85E3FF'];
    
    // Change the background color to a random color from the array
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Fade-in effect
    document.body.style.opacity = 0;
    let opacity = 0;

    const fadeEffect = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.05;  // Adjust this value for faster or slower fading
            document.body.style.opacity = opacity;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50); // Adjust timing for smoothness
});
