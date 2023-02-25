// Initialize Firebase
var config = {
  apiKey: "AIzaSyANjaVjbPk_JsJp60PZYGHxy-sqHuZdkzw",
        authDomain: "chatme-2ebf4.firebaseapp.com",
        projectId: "chatme-2ebf4",
        storageBucket: "chatme-2ebf4.appspot.com",
        messagingSenderId: "1060710336790",
        appId: "1:1060710336790:web:bfb3eb65397beee1516837"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// Get the input field and set the focus on it
var input = document.getElementById("message");
input.focus();

// Create a new chat room
function createRoom() {
  var roomName = prompt("Enter the name of the new room:");
  if (roomName != null && roomName.trim() != "") {
    var newRoomRef = database.ref().child("rooms").push();
    newRoomRef.set({
      name: roomName.trim()
    });
  }
}

// Display the chat messages
function displayMessages(roomKey) {
  var messagesRef = database.ref().child("messages/" + roomKey);
  messagesRef.on("value", function(snapshot) {
    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
      var message = childSnapshot.val();
      var messageDiv = document.createElement("div");
      messageDiv.innerHTML = message.name + ": " + message.text;
      messagesDiv.appendChild(messageDiv);
    });
  });
}

// Send a chat message
function sendMessage(roomKey) {
  var messageField = document.getElementById("message");
  var messageText = messageField.value;
  var username = localStorage.getItem("username");

  if (messageText.trim() != "") {
    var messagesRef = database.ref().child("messages/" + roomKey);
    messagesRef.push().set({
      name: username,
      text: messageText
    });
    messageField.value = "";
  }
}

// Login to the chat app
function login() {
  var username = document.getElementById("username").value.trim();
  if (username != "") {
    localStorage.setItem("username", username);
    document.getElementById("login-page").style.display = "none";
    document.getElementById("chat-page").style.display = "block";
    var roomsRef = database.ref().child("rooms");
    roomsRef.on("value", function(snapshot) {
      var roomsDiv = document.getElementById("rooms");
      roomsDiv.innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
        var roomKey = childSnapshot.key;
        var roomName = childSnapshot.child("name").val();
        var roomDiv = document.createElement("div");
        roomDiv.innerHTML =
          "<a href='#' onclick='displayMessages(\"" +
          roomKey +
          "\")'>" +
          roomName +
          "</a>";
        roomsDiv.appendChild(roomDiv);
      });
    });
  }
}
