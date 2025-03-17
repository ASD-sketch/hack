// Event listener to handle form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get values from the form inputs
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    // Validate the form fields
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Create an object to store the contact info
    let contactInfo = {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toLocaleString()
    };

    // Store the contact info in localStorage
    let contactData = JSON.parse(localStorage.getItem("contactData")) || [];
    contactData.push(contactInfo);
    localStorage.setItem("contactData", JSON.stringify(contactData));

    // Show success message to the user
    document.getElementById("responseMessage").innerText = "Your message has been successfully submitted!";
    
    // Optionally, clear the form fields after submission
    document.getElementById("contactForm").reset();
});
