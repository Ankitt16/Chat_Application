// Connect to the server
const socket = io();

// Geting the user's name
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area');

do {
    name = prompt('Please Enter your name');
} while (!name);

// Listen for keyup events on the textarea
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

// Sending message to the server
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    };

    // Append message to the application
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // Send message to the server
    socket.emit('message', msg);
}

// Append message to the application
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;

    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// Scroll to the bottom of the chat
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

// recieving message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming-box');
    scrollToBottom();
});
