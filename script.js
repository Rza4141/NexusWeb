const chatLog = document.getElementById("chatLog");
const userInput = document.getElementById("userInput");
const memoryInput = document.getElementById("memoryInput");
const memorySummary = document.getElementById("memorySummary");

let nexusMemory = null;
const backendURL = "https://nexusbackend.ainsworthjacob8.repl.co/chat"; // ✅ Your backend URL

function sendMessage() {
  const message = userInput.value.trim();
  if (!message || !nexusMemory) return;

  addMessage("You", message);
  userInput.value = "";

  setTimeout(() => {
    getSmartReply(message).then((reply) => {
      addMessage("Vanta", reply);
    });
  }, 500);
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function showMemoryLoader() {
  memoryInput.style.display = "block";
  document.getElementById("loadBtn").style.display = "inline-block";
}

function loadMemory() {
  try {
    nexusMemory = JSON.parse(memoryInput.value);
    const summary = `
      <h3>Memory Loaded</h3>
      <p><strong>User:</strong> ${nexusMemory.identity_core.user_name}</p>
      <p><strong>Goal:</strong> ${nexusMemory.identity_core.goal}</p>
      <p><strong>Current Project:</strong> ${nexusMemory.dynamic_context.current_project}</p>
      <p><strong>Active Tasks:</strong></p>
      <ul>${nexusMemory.dynamic_context.active_tasks.map(task => `<li>${task}</li>`).join('')}</ul>
    `;
    memorySummary.innerHTML = summary;
    memoryInput.style.display = "none";
    document.getElementById("loadBtn").style.display = "none";
  } catch (e) {
    alert("Invalid JSON format.");
  }
}

async function getSmartReply(message) {
  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memory: nexusMemory, message }),
    });

    const data = await response.json();
    return data.reply || "Error: No reply.";
  } catch (error) {
    return "Error: Couldn't reach Vanta.";
  }
}