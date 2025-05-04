// app.js
document.getElementById("resumeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    job: document.getElementById("job").value,
    skills: document.getElementById("skills").value,
    experience: document.getElementById("experience").value,
  };

  const res = await fetch("https://your-backend-url.com/generate", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById("resumeOutput").innerText = result.resume;
});

document.getElementById("premiumBtn").addEventListener("click", () => {
  window.location.href = "https://your-razorpay-link.com"; // Your Razorpay payment link
});
