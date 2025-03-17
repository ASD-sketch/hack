document.addEventListener("DOMContentLoaded", loadMessages);

function sendMessage() {
    let messageInput = document.getElementById("messageInput").value.trim();
    
    if (messageInput === "") return;

    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    
    let newMessage = {
        id: Date.now(),
        user: "You",
        content: messageInput,
        timestamp: new Date().toLocaleTimeString(),
        type: "sent",
        likes: 0,
        likedBy: [],
        reports: 0
    };

    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));

    document.getElementById("messageInput").value = "";
    loadMessages();
}

function loadMessages() {
    let messagesContainer = document.getElementById("chatMessages");
    messagesContainer.innerHTML = "";

    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    messages.forEach(message => {
        let messageElement = document.createElement("div");
        messageElement.classList.add("message", message.type);

        messageElement.innerHTML = `
            <strong>${message.user}</strong> <small>(${message.timestamp})</small>
            <p>${message.content}</p>
            <div class="message-actions">
                <button class="like-btn" onclick="toggleLike(${message.id})">👍 Like (${message.likes})</button>
                <button class="reply-btn" onclick="showReplyForm(${message.id})">💬 Reply</button>
                <button class="delete-btn" onclick="deleteMessage(${message.id})">🗑 Delete</button>
                <button class="report-btn" onclick="reportMessage(${message.id})">🚨 Report (${message.reports})</button>
            </div>
            <div id="replyForm-${message.id}" style="display:none; margin-top:10px;">
                <textarea id="replyContent-${message.id}" placeholder="Write a reply..."></textarea>
                <button onclick="addReply(${message.id})">Reply</button>
            </div>
        `;

        messagesContainer.appendChild(messageElement);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function toggleLike(id) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    let message = messages.find(m => m.id === id);

    if (message) {
        let likedIndex = message.likedBy.indexOf("You");

        if (likedIndex === -1) {
            message.likes += 1;
            message.likedBy.push("You");
        } else {
            message.likes -= 1;
            message.likedBy.splice(likedIndex, 1);
        }

        localStorage.setItem("messages", JSON.stringify(messages));
        loadMessages();
    }
}

function reportMessage(id) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    let message = messages.find(m => m.id === id);

    if (message) {
        message.reports += 1;

        if (message.reports >= 5) {
            messages = messages.filter(m => m.id !== id);
        }

        localStorage.setItem("messages", JSON.stringify(messages));
        loadMessages();
    }
}

function deleteMessage(id) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages = messages.filter(m => m.id !== id);
    localStorage.setItem("messages", JSON.stringify(messages));
    loadMessages();
}