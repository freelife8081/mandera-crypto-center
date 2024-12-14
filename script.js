document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const registerButton = form.querySelector("button[type='submit']");
    const statusMessage = document.getElementById("statusMessage");

    let countdownTimer;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Start a 30-second countdown
        let countdown = 30;
        registerButton.disabled = true;

        countdownTimer = setInterval(() => {
            if (countdown > 0) {
                registerButton.textContent = `Registering in ${countdown--}s...`;
            } else {
                clearInterval(countdownTimer);
                registerButton.textContent = "Register";
                registerButton.disabled = false;

                // Proceed with registration after countdown
                submitToTelegram();
            }
        }, 1000);
    });

    async function submitToTelegram() {
        // Input values
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const age = document.getElementById("age").value;
        const gender = document.getElementById("gender").value;
        const referrerName = document.getElementById("referrerName").value;
        const referrerPhone = document.getElementById("referrerPhone").value;
        const learnerPhoto = document.getElementById("learnerPhoto").files[0];
        const screenshot = document.getElementById("screenshot").files[0];

        // Check for required file uploads
        if (!screenshot || !learnerPhoto) {
            statusMessage.textContent = "Please upload your photo and payment screenshot.";
            statusMessage.style.color = "red";
            return;
        }

        // Check network connection
        if (!navigator.onLine) {
            statusMessage.textContent = "No internet connection. Please try again.";
            statusMessage.style.color = "red";
            return;
        }

        const botToken = "7527930234:AAGtGzngXhsAS7JnLsooCECvBBPvTPBy2SM";
        const chatId = "7361816575";

        try {
            // Send learner photo with details
            const formDataPhoto = new FormData();
            formDataPhoto.append("chat_id", chatId);
            formDataPhoto.append("photo", learnerPhoto);
            formDataPhoto.append(
                "caption", 
                `Name: ${name}\nPhone: ${phone}\nAge: ${age}\nGender: ${gender}\nReferrer: ${referrerName}\nReferrer Phone: ${referrerPhone}`
            );

            const responsePhoto = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                method: "POST",
                body: formDataPhoto,
            });

            const resultPhoto = await responsePhoto.json();

            if (responsePhoto.ok && resultPhoto.ok) {
                // Send the payment screenshot
                const formDataScreenshot = new FormData();
                formDataScreenshot.append("chat_id", chatId);
                formDataScreenshot.append("photo", screenshot);
                formDataScreenshot.append("caption", `Payment Screenshot for ${name}`);

                const responseScreenshot = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                    method: "POST",
                    body: formDataScreenshot,
                });

                const resultScreenshot = await responseScreenshot.json();

                if (responseScreenshot.ok && resultScreenshot.ok) {
                    statusMessage.textContent = "Registration successful! Ask for a username from Huska..";
                    statusMessage.style.color = "green";
                } else {
                    statusMessage.textContent = `Failed to send payment screenshot: ${resultScreenshot.description || "Unknown error occurred."}`;
                    statusMessage.style.color = "red";
                }
            } else {
                statusMessage.textContent = `Failed to send your photo: ${resultPhoto.description || "Unknown error occurred."}`;
                statusMessage.style.color = "red";
            }
        } catch (error) {
            statusMessage.textContent = `An error occurred: ${error.message}`;
            statusMessage.style.color = "red";
        }
    }

    // Notification Dismiss Handler
    const closeNotification = document.getElementById("closeNotification");
    if (closeNotification) {
        closeNotification.addEventListener("click", function () {
            const notification = document.getElementById("notification");
            if (notification) notification.style.display = "none";
        });
    }
});
