// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANjaVjbPk_JsJp60PZYGHxy-sqHuZdkzw",
        authDomain: "chatme-2ebf4.firebaseapp.com",
        projectId: "chatme-2ebf4",
        storageBucket: "chatme-2ebf4.appspot.com",
        messagingSenderId: "1060710336790",
        appId: "1:1060710336790:web:bfb3eb65397beee1516837"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

let chatroom = "general";
let username;

// Get elements
const roomSelect = document.getElementById("roomSelect");
const messageList = document.getElementById("messageList");
const messageInput = document.getElementById("messageInput");
const loginButton = document.getElementById("loginButton");

// Listen for changes in the selected chatroom
roomSelect.addEventListener("change", (event) => {
  chatroom = event.target.value;
  loadMessages(chatroom);
});

// Listen for changes in the message input field
messageInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Listen for changes in the login button
loginButton.addEventListener("click", () => {
  username = document.getElementById("usernameInput").value.trim();
  if (username) {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("chatContainer").style.display = "block";
    loadMessages(chatroom);
  }
});

// Load messages from the specified chatroom
function loadMessages(chatroom) {
  // Clear the message list
  messageList.innerHTML = "";
  // Load the messages from the database
  database.ref(chatroom).once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const message = childSnapshot.val().message;
      const sender = childSnapshot.val().sender;
      const messageElement = document.createElement("li");
      messageElement.innerText = `${sender}: ${message}`;
      messageList.appendChild(messageElement);
    });
  });
}

// Send a message to the current chatroom
function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    database.ref(chatroom).push({
      message: message,
      sender: username,
    });
    messageInput.value = "";
  }
}
