document.addEventListener("DOMContentLoaded", function() {
    // Fetch lessons from lessons.json
    fetch('lessons.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const lessonContainer = document.getElementById("lesson-container");
            data.forEach(lesson => {
                // Create a new element for each lesson
                const lessonDiv = document.createElement("div");
                lessonDiv.className = "lesson";

                // Add lesson title and description
                lessonDiv.innerHTML = `
                    <h2>${lesson.title}</h2>
                    <p>${lesson.description}</p>
                    <a href="${lesson.link}" target="_blank">Read More</a>
                `;
                
                // Append to the container
                lessonContainer.appendChild(lessonDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching lessons:", error);
            document.getElementById("lesson-container").innerHTML = "<p>Could not load lessons.</p>";
        });
});
