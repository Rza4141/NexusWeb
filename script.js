const chatLog = document.getElementById("chatLog");
const userInput = document.getElementById("userInput");

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("You", message);
  userInput.value = "";

  // Simulate Vanta reply
  setTimeout(() => {
    addMessage("Vanta", "Received: " + message);
  }, 500);
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}