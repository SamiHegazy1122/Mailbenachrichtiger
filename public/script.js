await fetch("/api/notify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: nameInput.value, email: mailInput.value })
});