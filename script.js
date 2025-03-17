document.addEventListener("DOMContentLoaded", loadPosts);

function addPost() {
    let username = localStorage.getItem("username") || "Guest";
    let postContent = document.getElementById("postContent").value;

    if (postContent.trim() === "") {
        alert("Please enter post content.");
        return;
    }

    let post = {
        id: Date.now(),
        user: username,
        content: postContent,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        likedBy: [],
        replies: [],
        reported: false,
        reportsCount: 0
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("postContent").value = "";
    loadPosts();
}

function loadPosts() {
    let postsContainer = document.getElementById("postsContainer");

    if (!postsContainer) {
        console.error("Error: Element #postsContainer not found!");
        return;
    }

    postsContainer.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    if (!Array.isArray(posts)) {
        console.error("Invalid posts data in localStorage. Resetting...");
        posts = [];
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts available.</p>";
        return;
    }

    posts.forEach(post => {
        let postElement = document.createElement("div");
        postElement.classList.add("post");

        postElement.innerHTML = `
            <h3>${post.user} <small>(${post.timestamp})</small></h3>
            <p>${post.content}</p>
            <div class="post-actions">
                <button class="like-btn" onclick="toggleLike(${post.id})">👍 Like (${post.likes})</button>
                <button class="reply-btn" onclick="showReplyForm(${post.id})">💬 Reply</button>
                <button class="delete-btn" onclick="deletePost(${post.id}, '${post.user}')">Delete</button>
                <button class="report-btn" onclick="reportPost(${post.id})">🚨 Report (${post.reportsCount})</button>
            </div>
            <div id="replies-${post.id}" class="replies"></div>
            <div id="replyForm-${post.id}" style="display:none; margin-top:10px;">
                <textarea id="replyContent-${post.id}" placeholder="Write a reply..."></textarea>
                <button onclick="addReply(${post.id})">Reply</button>
            </div>
        `;

        let repliesContainer = postElement.querySelector(`#replies-${post.id}`);
        post.replies.forEach(reply => {
            let replyElement = document.createElement("div");
            replyElement.classList.add("reply");
            replyElement.innerHTML = `
                <h4>${reply.user} <small>(${reply.timestamp})</small></h4>
                <p>${reply.content}</p>
                <button class="delete-btn" onclick="deleteReply(${post.id}, '${reply.timestamp}', '${reply.user}')">Delete</button>
            `;
            repliesContainer.appendChild(replyElement);
        });

        if (post.reported) {
            postElement.style.backgroundColor = "#f8d7da";
            postElement.querySelector(".report-btn").disabled = true;
        }

        postsContainer.appendChild(postElement);
    });
}

function toggleLike(id) {
    let username = localStorage.getItem("username") || "Guest";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(p => p.id === id);

    if (post) {
        let likedIndex = post.likedBy.indexOf(username);

        if (likedIndex === -1) {
            post.likes += 1;
            post.likedBy.push(username);
        } else {
            post.likes -= 1;
            post.likedBy.splice(likedIndex, 1);
        }

        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}

function reportPost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(p => p.id === id);

    if (post) {
        if (post.reported) {
            post.reported = false;
            post.reportsCount -= 1;
        } else {
            post.reported = true;
            post.reportsCount += 1;
        }

        if (post.reportsCount >= 5) {
            posts = posts.filter(p => p.id !== id);
        }

        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}

function showReplyForm(id) {
    let replyForm = document.getElementById(`replyForm-${id}`);
    replyForm.style.display = replyForm.style.display === "none" ? "block" : "none";
}

function addReply(postId) {
    let username = localStorage.getItem("username") || "Guest";
    let replyContent = document.getElementById(`replyContent-${postId}`).value;

    if (replyContent.trim() === "") {
        alert("Please enter a reply.");
        return;
    }

    let reply = {
        user: username,
        content: replyContent,
        timestamp: new Date().toLocaleString()
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(p => p.id === postId);
    if (post) {
        post.replies.push(reply);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}

function deleteReply(postId, timestamp, replyUser) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts.find(p => p.id === postId);

    let currentUser = localStorage.getItem("username");

    if (post && (currentUser === post.user || currentUser === replyUser)) {
        post.replies = post.replies.filter(reply => reply.timestamp !== timestamp);
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    } else {
        alert("You can only delete your own reply.");
    }
}

function deletePost(id, postUser) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let currentUser = localStorage.getItem("username") || "Guest";

    if (currentUser === postUser) {
        let updatedPosts = posts.filter(post => post.id !== id);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        loadPosts();
    } else {
        alert("You can only delete your own post.");
    }
}