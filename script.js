document.addEventListener("DOMContentLoaded", function() {
    // Countdown timer setup
    const targetDate = new Date("January 1, 2025 00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the timer element
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

        // Send the learner's photo with all details
        const formDataPhoto = new FormData();
        formDataPhoto.append("chat_id", "7361816575"); // Bot chat ID
        formDataPhoto.append("photo", learnerPhoto);
        formDataPhoto.append("caption", `Name: ${name}\nPhone: ${phone}\nAge: ${age}\nGender: ${gender}\nReferrer Name: ${referrerName}\nReferrer Phone: ${referrerPhone}`);

        try {
            const responsePhoto = await fetch(`https://api.telegram.org/bot7527930234:AAHjjHCn1hR-an2QDCziqELvjs637uz5u0A/sendPhoto`, {
                method: "POST",
                body: formDataPhoto,
            });

            // Parse the response to get a JSON result
            const resultPhoto = await responsePhoto.json();

            // Check if the response from Telegram API was successful
            if (responsePhoto.ok && resultPhoto.ok) {
                // Now send the payment screenshot as a separate message if needed
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
