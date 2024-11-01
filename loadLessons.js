document.addEventListener("DOMContentLoaded", async function() {
    const lessonList = document.getElementById("lessonList");

    try {
        // Fetch lesson data from the JSON file
        const response = await fetch("lessons.json");
        if (!response.ok) throw new Error("Could not load lessons.");
        const lessons = await response.json();

        // Populate each lesson with a link and progress bar
        lessons.forEach(lesson => {
            const lessonDiv = document.createElement("div");
            lessonDiv.className = "lesson-item";

            // Create a link to the lesson
            const lessonLink = document.createElement("a");
            lessonLink.href = lesson.link;
            lessonLink.textContent = lesson.title;
            lessonLink.className = "lesson-title";
            lessonLink.target = "_blank";

            // Progress bar
            const progressContainer = document.createElement("div");
            progressContainer.className = "progress-bar";
            const progressBar = document.createElement("div");
            progressBar.className = "progress";
            progressBar.style.width = `${lesson.progress}%`;
            progressContainer.appendChild(progressBar);

            // Append elements to the lesson item div
            lessonDiv.appendChild(lessonLink);
            lessonDiv.appendChild(progressContainer);
            lessonList.appendChild(lessonDiv);
        });
    } catch (error) {
        console.error("Error loading lessons:", error);
        lessonList.textContent = "Failed to load lessons. Please try again later.";
    }
});
