document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const registerButton = form.querySelector("button[type='submit']");
    const statusMessage = document.getElementById("statusMessage");

    let registrationCompleted = false; // Flag to prevent multiple submissions

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (registrationCompleted) {
            showSlideInPopup("You have already registered. You cannot register twice.");
            return;
        }

        // Start the countdown
        let countdown = 10;
        registerButton.disabled = true;

        const countdownTimer = setInterval(() => {
            if (countdown > 0) {
                registerButton.textContent = `Please wait... ${countdown--}s`;
            } else {
                clearInterval(countdownTimer);
                registerButton.textContent = "Register";
                if (!registrationCompleted) {
                    registerButton.disabled = false; // Re-enable if registration fails
                }
            }
        }, 1000);

        // Send registration info to Telegram asynchronously
        await submitToTelegram();
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

        const botToken = "8151588048:AAHkI1KzbC0c8_Ws0ilIiUnS1mD42bDuEnA";
        const chatId = "5952407902";

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
                    statusMessage.innerHTML = `Registration successful! Click <a href="https://wa.me/254791190745?text=I%20have%20done%20the%20registration.%20I%20need%20a%20username" target="_blank" style="color: red; text-decoration: none;">here</a> to get your unique username.`;
                    statusMessage.style.color = "green";

                    // Disable button permanently after success
                    registerButton.disabled = true;
                    registerButton.textContent = "Registered";
                    registrationCompleted = true; // Prevent further submissions
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

    // Function to show slide-in popup notification
    function showSlideInPopup(message) {
        let popup = document.getElementById("slideInPopup");
        if (!popup) {
            popup = document.createElement("div");
            popup.id = "slideInPopup";
            popup.style.position = "fixed";
            popup.style.top = "-100px"; // Start off-screen
            popup.style.left = "50%";
            popup.style.transform = "translateX(-50%)";
            popup.style.backgroundColor = "#ff0000";
            popup.style.color = "#fff";
            popup.style.padding = "15px 20px";
            popup.style.borderRadius = "5px";
            popup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            popup.style.fontSize = "16px";
            popup.style.textAlign = "center";
            popup.style.transition = "top 0.5s ease-in-out";
            popup.style.zIndex = "1000";
            popup.style.width = "90%";
            popup.style.maxWidth = "400px";
            popup.style.fontWeight = "bold";
            document.body.appendChild(popup);
        }

        popup.textContent = message;
        popup.style.top = "20px"; // Slide in

        setTimeout(() => {
            popup.style.top = "-100px"; // Slide out after 3 seconds
        }, 3000);
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
