document.addEventListener("DOMContentLoaded", function() {
    // Replace this URL with your own GitHub repository's raw content URL
    const lessonsUrl = 'https://github.com/freelife8081/mandera-crypto-center/lessons.json';

    fetch(lessonsUrl)
        .then(response => response.json())
        .then(data => {
            const lessonList = document.getElementById("lessonList");
            data.lessons.forEach(lesson => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${lesson.title}</strong><br>${lesson.description}<br><a href="${lesson.link}" target="_blank">View Lesson</a>`;
                lessonList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching lessons:', error);
        });
});
