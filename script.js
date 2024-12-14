document.addEventListener("DOMContentLoaded", function () {
    // Handle the dismiss button
    document.getElementById("closeNotification").addEventListener("click", function () {
        document.getElementById("notification").style.display = "none";
        console.log("Notification dismissed");
    });

    // Handle form submission
    document.getElementById("registrationForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Form submission intercepted");

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const age = document.getElementById("age").value;
        const gender = document.getElementById("gender").value;
        const referrerName = document.getElementById("referrerName").value;
        const referrerPhone = document.getElementById("referrerPhone").value;
        const learnerPhoto = document.getElementById("learnerPhoto").files[0];
        const screenshot = document.getElementById("screenshot").files[0];

        if (!learnerPhoto || !screenshot) {
            document.getElementById("statusMessage").textContent = "Please upload all required files.";
            document.getElementById("statusMessage").style.color = "red";
            return;
        }

        if (!navigator.onLine) {
            document.getElementById("statusMessage").textContent = "No internet connection. Please try again.";
            document.getElementById("statusMessage").style.color = "red";
            return;
        }

        const botToken = "7527930234:AAGtGzngXhsAS7JnLsooCECvBBPvTPBy2SM";
        const chatId = "7361816575";

        try {
            const formDataPhoto = new FormData();
            formDataPhoto.append("chat_id", chatId);
            formDataPhoto.append("photo", learnerPhoto);
            formDataPhoto.append("caption", `Name: ${name}\nPhone: ${phone}\nAge: ${age}\nGender: ${gender}\nReferrer: ${referrerName}\nReferrer Phone: ${referrerPhone}`);

            const responsePhoto = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                method: "POST",
                body: formDataPhoto,
            });

            if (responsePhoto.ok) {
                const formDataScreenshot = new FormData();
                formDataScreenshot.append("chat_id", chatId);
                formDataScreenshot.append("photo", screenshot);
                formDataScreenshot.append("caption", `Payment Screenshot for ${name}`);

                const responseScreenshot = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                    method: "POST",
                    body: formDataScreenshot,
                });

                if (responseScreenshot.ok) {
                    document.getElementById("statusMessage").textContent = "Registration successful!";
                    document.getElementById("statusMessage").style.color = "green";
                } else {
                    document.getElementById("statusMessage").textContent = "Failed to upload payment screenshot.";
                    document.getElementById("statusMessage").style.color = "red";
                }
            } else {
                document.getElementById("statusMessage").textContent = "Failed to upload your photo.";
                document.getElementById("statusMessage").style.color = "red";
            }
        } catch (error) {
            document.getElementById("statusMessage").textContent = `Error: ${error.message}`;
            document.getElementById("statusMessage").style.color = "red";
        }
    });
});
