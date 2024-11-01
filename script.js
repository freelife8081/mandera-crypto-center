document.addEventListener("DOMContentLoaded", function() {
    // Countdown timer setup
    const targetDate = new Date("January 1, 2025 00:00:00").getTime();

    function getRandomFlicker() {
        return Math.floor(Math.random() * 10);  // random digit from 0-9
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("timer").textContent = "Class has started!";
            return;
        }

        // Temporary flickering effect with random digits
        document.getElementById("timer").textContent = `${getRandomFlicker()}d ${getRandomFlicker()}h ${getRandomFlicker()}m ${getRandomFlicker()}s`;

        // Set actual values after flicker effect
        setTimeout(() => {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the timer element
            document.getElementById("timer").textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 200); // Short delay for flicker effect
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
        const screenshot = document.getElementById("screenshot").files[0];

        if (!screenshot) {
            document.getElementById("statusMessage").textContent = "Please upload a payment screenshot.";
            return;
        }

        const formData = new FormData();
        formData.append("chat_id", "7361816575"); // Bot chat ID
        formData.append("caption", `Name: ${name}\nPhone: ${phone}\nAge: ${age}\nGender: ${gender}`);
        formData.append("photo", screenshot);

        try {
            const response = await fetch(`https://api.telegram.org/bot7527930234:AAHjjHCn1hR-an2QDCziqELvjs637uz5u0A/sendPhoto`, {
                method: "POST",
                body: formData,
            });

            // Parse the response to get a JSON result
            const result = await response.json();

            // Check if the response from Telegram API was successful
            if (response.ok && result.ok) {
                document.getElementById("statusMessage").textContent = "Registration successful! We've received your details.";
                document.getElementById("statusMessage").style.color = "green";
            } else {
                // Display the error message returned by Telegram's API
                document.getElementById("statusMessage").textContent = `Registration failed: ${result.description || "Unknown error occurred."}`;
                document.getElementById("statusMessage").style.color = "red";
            }
        } catch (error) {
            // Catch any network or unexpected errors
            document.getElementById("statusMessage").textContent = `An error occurred: ${error.message}`;
            document.getElementById("statusMessage").style.color = "red";
        }
    });
});
