document.addEventListener("DOMContentLoaded", function () {
    // Registration form submission
    document.getElementById("registrationForm").addEventListener("submit", async function (event) {
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

        const botToken = "7527930234:AAEECA9JA7hgChK4ynOd59WRbNJiUE68LnQ";
        const chatId = "7361816575";

        try {
            // Send the learner photo with details
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
                    document.getElementById("statusMessage").textContent = "Registration successful! We've received your details.";
                    document.getElementById("statusMessage").style.color = "green";
                } else {
                    document.getElementById("statusMessage").textContent = `Failed to send payment screenshot: ${resultScreenshot.description || "Unknown error occurred."}`;
                    document.getElementById("statusMessage").style.color = "red";
                }
            } else {
                document.getElementById("statusMessage").textContent = `Failed to send your photo: ${resultPhoto.description || "Unknown error occurred."}`;
                document.getElementById("statusMessage").style.color = "red";
            }
        } catch (error) {
            document.getElementById("statusMessage").textContent = `An error occurred: ${error.message}`;
            document.getElementById("statusMessage").style.color = "red";
        }
    });

    // Function to show the floating discount box
    function showFloatingBox() {
        document.getElementById("floatingDiscountBox").style.display = "block";
    }

    // Function to close the floating discount box
    function closeFloatingBox() {
        document.getElementById("floatingDiscountBox").style.display = "none";
    }

    // Show the floating box when the page loads
    window.onload = function () {
        showFloatingBox();
        const savedTheme = localStorage.getItem("theme") || "light";
        document.body.setAttribute("data-theme", savedTheme);

        // Update the toggle button text based on the saved theme
        const toggleButton = document.getElementById("themeToggle");
        toggleButton.textContent = savedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    };

    // Toggle theme between light and dark
    function toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");

        // Switch the theme
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);

        // Update the button text
        const toggleButton = document.getElementById("themeToggle");
        toggleButton.textContent = newTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

        // Save the user's preference in localStorage
        localStorage.setItem("theme", newTheme);
    }

    // Attach the theme toggle function to the button
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
});
