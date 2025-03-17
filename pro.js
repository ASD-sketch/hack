// Simulated event data
const event = {
    title: "Annual Tech Conference 2023",
    description: "Join us for the biggest tech event of the year!",
    endDate: "2020-12-31", // Event end date
    feedback: [
        "Great event! Learned a lot.",
        "Amazing speakers and networking opportunities.",
        "Well organized and informative."
    ]
};

// Get current date
const currentDate = new Date();
const eventEndDate = new Date(event.endDate);

// Get DOM elements
const statusText = document.getElementById("status-text");
const eventActions = document.getElementById("event-actions");
const feedbackSection = document.getElementById("feedback-section");
const feedbackList = document.getElementById("feedback-list");
const feedbackForm = document.getElementById("feedback-form");
const applyForm = document.getElementById("apply-form");
const applicationForm = document.getElementById("application-form");

// Check if the event has ended
if (currentDate > eventEndDate) {
    statusText.textContent = "Event Ended";
    feedbackSection.style.display = "block";

    // Display existing feedback
    event.feedback.forEach(feedback => {
        const li = document.createElement("li");
        li.textContent = feedback;
        feedbackList.appendChild(li);
    });

    // Handle feedback submission
    feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const feedbackInput = document.getElementById("feedback-input");
        const newFeedback = feedbackInput.value.trim();

        if (newFeedback) {
            // Add new feedback to the list
            const li = document.createElement("li");
            li.textContent = newFeedback;
            feedbackList.appendChild(li);

            // Clear the input field
            feedbackInput.value = "";
        }
    });
} else {
    statusText.textContent = "Ongoing";

    // Remove the feedback section if the event is ongoing
    feedbackSection.remove();

    // Show the "Apply to Event" button
    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply to Event";
    applyButton.addEventListener("click", () => {
        applyForm.style.display = "block";
    });
    eventActions.appendChild(applyButton);
}

// Handle application form submission
applicationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Here you can handle the form data, e.g., send it to a server
    console.log("Application Submitted:", { name, email, phone });
    alert("Thank you for applying!");
    applyForm.style.display = "none";
});