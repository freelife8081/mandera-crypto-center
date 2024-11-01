document.getElementById("registrationForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const screenshot = document.getElementById("screenshot").files[0];

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append("chat_id", "7361816575"); // Bot ID
    formData.append("caption", `Name: ${name}\nPhone: ${phone}\nAge: ${age}\nGender: ${gender}`);
    formData.append("photo", screenshot);

    // Send the data to Telegram bot
    try {
        const response = await fetch(`https://api.telegram.org/bot7527930234:AAHjjHCn1hR-an2QDCziqELvjs637uz5u0A/sendPhoto`, {
            method: "POST",
            body: formData,
        });
        
        if (response.ok) {
            document.getElementById("statusMessage").textContent = "Registration successful! We've received your details.";
        } else {
            document.getElementById("statusMessage").textContent = "Registration failed. Please try again.";
        }
    } catch (error) {
        document.getElementById("statusMessage").textContent = "An error occurred. Please check your internet connection and try again.";
    }
});
