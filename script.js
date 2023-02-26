document.onload = function(){
  if(localstorage.getItem("username")){
     document.getElementById("login-page").style.display = "none";
    document.getElementById("chat-page").style.display = "block";
    document.getElementById("logout").style.display = "block";
  }
};
function logout(){
  localstorage.set("username","");
};
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDoJ6vE_0O1OSiEZGsYu1B86YvmByZFAyw",
    authDomain: "wikichat-beta2.firebaseapp.com",
    projectId: "wikichat-beta2",
    storageBucket: "wikichat-beta2.appspot.com",
    messagingSenderId: "717471861279",
    appId: "1:717471861279:web:cb26f45158847e3dd3e32a"
};
var newRoomRef;
var RoomName;
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// Get the input field and set the focus on it
var input = document.getElementById("message");
input.focus();

// Create a new chat room
function createRoom() {
roomName = document.getElementById("room-name").value;
  if (roomName != null && roomName.trim() != "") {
    newRoomRef = database.ref().child("rooms/"+roomName);
    var newId = firebase.database().ref().child('roomNames').push().key;
       firebase.database().ref(`roomNames/${newId}`).set({
  name: roomName
});
    displayMessages(roomName);
  }
}
        function display(){
          firebase.database().ref('roomNames').once('value').then((snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val().name;
var roomDiv = document.createElement("div");
      roomDiv.innerHTML =

        "<a href='#' onclick='displayMessages(roomName)'>" +childData +"</a>";
  });
});
        }


// Display the chat messages
function displayMessages(roomName) {
  var messagesRef = database.ref().child("rooms/" + roomName);
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
function sendMessage() {
  var messageField = document.getElementById("message");
  var messageText = messageField.value;
  var username = localStorage.getItem("username");

  if (messageText.trim() != "") {
    //var messagesRef = database.ref().child("rooms/" + roomName);
    newRoomRef.push().set({
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
    //displayRooms();
  }
}
