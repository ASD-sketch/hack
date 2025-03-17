document.addEventListener("DOMContentLoaded", function () {
    // Register User
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            // Store user data in localStorage at registration
            localStorage.setItem("user", JSON.stringify({ username, email, password, contact: "", activities: "", donations: "" }));
            alert("Registration Successful");
            window.location.href = "login.html";
        });
    }

    // Login User
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.email === email && user.password === password) {
                // Transfer user data to sessionStorage after successful login
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = "profile.html";
            } else {
                alert("Invalid credentials");
            }
        });
    }

    // Profile Page
    if (window.location.pathname.includes("profile.html")) {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!user) {
            alert("Please log in first");
            window.location.href = "login.html";
            return;
        }
        document.getElementById("profileUsername").textContent = user.username;
        document.getElementById("profileEmail").textContent = user.email;
        document.getElementById("profileContact").textContent = user.contact;
        document.getElementById("profileActivities").textContent = user.activities;
        document.getElementById("profileDonations").textContent = user.donations;
    }

    // Edit Profile
    const editProfileForm = document.getElementById("editProfileForm");
    if (editProfileForm) {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
        document.getElementById("editUsername").value = user.username;
        document.getElementById("editEmail").value = user.email;
        document.getElementById("editContact").value = user.contact;

        editProfileForm.addEventListener("submit", function (e) {
            e.preventDefault();
            user.username = document.getElementById("editUsername").value;
            user.email = document.getElementById("editEmail").value;
            user.contact = document.getElementById("editContact").value;
            // Update user data in sessionStorage after editing the profile
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            alert("Profile updated successfully");
            window.location.href = 'profile.html';
        });
    }
});
