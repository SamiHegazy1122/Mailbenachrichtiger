const nameInput = document.getElementById("name");
const mailInput = document.getElementById("email");
const button = document.getElementById("senden");
const status = document.getElementById("status");

button.addEventListener("click", async () => {
  status.textContent = "Wird gesendet …";
  try {
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameInput.value, email: mailInput.value })
    });
    status.textContent = res.ok ? `Danke, ${nameInput.value}! Check dein Postfach.` : await res.text();
    status.style.color = res.ok ? "#1e7b4a" : "#b42318";
  } catch {
    status.textContent = "Server nicht erreichbar";
    status.style.color = "#b42318";
  }
});