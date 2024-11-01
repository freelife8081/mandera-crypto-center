document.addEventListener("DOMContentLoaded", async function() {
    const lessonList = document.getElementById("lessonList");

    // Fetch lessons from lessons.json
    const response = await fetch("lessons.json");
    const lessons = await response.json();

    // Populate lessons and show progress bar
    lessons.forEach((lesson, index) => {
        const lessonDiv = document.createElement("div");
        lessonDiv.className = "lesson-item";

        const lessonTitle = document.createElement("h3");
        lessonTitle.textContent = lesson.title;

        const progressContainer = document.createElement("div");
        progressContainer.className = "progress-bar";
        const progressBar = document.createElement("div");
        progressBar.className = "progress";
        
        progressBar.style.width = `${lesson.progress}%`; // Set width based on lesson progress
        progressContainer.appendChild(progressBar);

        // Append title and progress bar to lesson div
        lessonDiv.appendChild(lessonTitle);
        lessonDiv.appendChild(progressContainer);
        lessonList.appendChild(lessonDiv);
    });
});
