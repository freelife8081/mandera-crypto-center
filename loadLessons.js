async function fetchCourseContent() {
    try {
        console.log("Fetching course content...");
        const response = await fetch('./lessons.json'); // This assumes the JSON file is in the same directory
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Course content loaded:", data);

        // Display the course title
        document.getElementById('courseTitle').textContent = data.courseTitle;

        // Populate the week selector dropdown
        const weekSelect = document.getElementById('weekSelect');
        data.weeks.forEach(week => {
            const option = document.createElement('option');
            option.value = week.week;
            option.textContent = `Week ${week.week}: ${week.topic}`;
            weekSelect.appendChild(option);
        });

        // Load the content for the selected week
        weekSelect.addEventListener('change', () => displayContent(data, weekSelect.value));
        displayContent(data, 1); // Display the first week by default

    } catch (error) {
        console.error("Error fetching course content:", error);
    }
}

function displayContent(data, weekNumber) {
    console.log(`Displaying content for week ${weekNumber}`);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ""; // Clear previous content

    // Find the selected week
    const weekData = data.weeks.find(week => week.week == weekNumber);

    if (weekData) {
        contentDiv.innerHTML += `<h2>${weekData.topic}</h2>`;

        weekData.sections.forEach(section => {
            contentDiv.innerHTML += `<h3>${section.title}</h3>`;
            contentDiv.innerHTML += `<p>${section.content}</p>`;
            
            // Display subsections if they exist
            if (section.subsections) {
                section.subsections.forEach(subsection => {
                    contentDiv.innerHTML += `<h4>${subsection.title}</h4>`;
                    contentDiv.innerHTML += `<p>${subsection.content}</p>`;
                });
            }
            
            // Display lists if they exist
            if (section.list) {
                contentDiv.innerHTML += '<ul>';
                section.list.forEach(item => {
                    contentDiv.innerHTML += `<li><strong>${item.name}:</strong> ${item.description}</li>`;
                });
                contentDiv.innerHTML += '</ul>';
            }
        });
    } else {
        contentDiv.innerHTML = "<p>No content available for this week.</p>";
        console.warn(`No content found for week ${weekNumber}`);
    }
}

// Call the fetch function when the script loads
fetchCourseContent();
