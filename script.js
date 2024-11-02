document.addEventListener("DOMContentLoaded", function() {
    // Countdown timer setup for next Monday at 10:30 AM
    function getNextMondayAtTime(hour, minute) {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        let daysUntilMonday = (1 - dayOfWeek + 7) % 7; // Days until next Monday

        // If today is Monday and time has passed 10:30, count for the following Monday
        if (dayOfWeek === 1 && (now.getHours() > hour || (now.getHours() === hour && now.getMinutes() >= minute))) {
            daysUntilMonday += 7;
        }

        const nextMonday = new Date(now);
        nextMonday.setDate(now.getDate() + daysUntilMonday);
        nextMonday.setHours(hour, minute, 0, 0); // Set to the desired hour and minute

        return nextMonday.getTime();
    }

    function updateCountdown() {
        const targetDate = getNextMondayAtTime(10, 30); // Set countdown to Monday 10:30 AM
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("timer").textContent = "Class has started!";
        }
    }

    // Update the countdown every 1 second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Registration form submission
    document.getElementById("registrationForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const age = document.getElementById("age").value;
        const gender = document.getElementById("gender").value;
        const referrerName = document.getElementById("referrerName").value;
        const referrerPhone = document.getElementById("referrerPhone").value;
        const learnerPhoto = document.getElementById("learnerPhoto").files[0];
        const screenshot = document.getElementById("screenshot").files[0];

        if (!screenshot || !learnerPhoto) {
            document.getElementById("statusMessage").textContent = "Please upload your photo and payment screenshot.";
            return;
        }

        // Send the learner photo with details
        const formDataPhoto = new FormData();
        formDataPhoto.append("chat_id", "7361816575"); // Bot chat ID
        formDataPhoto.append("photo", learnerPhoto);
        formDataPhoto.append("caption", `Name: ${name}\nPhone: ${phone}\nAge: ${age}\nGender: ${gender}\nReferrer: ${referrerName}\nReferrer Phone: ${referrerPhone}`);

        try {
            const responsePhoto = await fetch(`https://api.telegram.org/bot7527930234:AAHjjHCn1hR-an2QDCziqELvjs637uz5u0A/sendPhoto`, {
                method: "POST",
                body: formDataPhoto,
            });

            // Parse the response to get a JSON result
            const resultPhoto = await responsePhoto.json();

            // Check if the response from Telegram API was successful
            if (responsePhoto.ok && resultPhoto.ok) {
                // Send the payment screenshot
                const formDataScreenshot = new FormData();
                formDataScreenshot.append("chat_id", "7361816575"); // Bot chat ID
                formDataScreenshot.append("photo", screenshot);
                formDataScreenshot.append("caption", `Payment Screenshot for ${name}`);

                const responseScreenshot = await fetch(`https://api.telegram.org/bot7527930234:AAHjjHCn1hR-an2QDCziqELvjs637uz5u0A/sendPhoto`, {
                    method: "POST",
                    body: formDataScreenshot,
                });

                const resultScreenshot = await responseScreenshot.json();

                if (responseScreenshot.ok && resultScreenshot.ok) {
                    document.getElementById("statusMessage").textContent = "Registration successful! We've received your details.";
                    document.getElementById("statusMessage").style.color = "green";
                } else {
                    document.getElementById("statusMessage").textContent = `Failed to send payment screenshot: ${resultScreenshot.description || "Unknown error occurred."}`;
                    document.getElementById("statusMessage").style.color = "red";
                }
            } else {
                // Display the error message returned by Telegram's API
                document.getElementById("statusMessage").textContent = `Failed to send learner photo: ${resultPhoto.description || "Unknown error occurred."}`;
                document.getElementById("statusMessage").style.color = "red";
            }
        } catch (error) {
            // Catch any network or unexpected errors
            document.getElementById("statusMessage").textContent = `An error occurred: ${error.message}`;
            document.getElementById("statusMessage").style.color = "red";
        }
    });
});

// Function to show the modal
function showModal() {
    document.getElementById("discountModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
    document.getElementById("discountModal").style.display = "none";
}

// Show the modal when the page loads
window.onload = function() {
    showModal();
};
