// Function to fetch and display course content
async function fetchCourseContent() {
    try {
        const response = await fetch('./lessons.json'); // Ensure this path is correct
        const data = await response.json();
        
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

// Function to display the content for a specific week
function displayContent(data, weekNumber) {
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
    }
}

// Call the fetch function when the script loads
fetchCourseContent();
