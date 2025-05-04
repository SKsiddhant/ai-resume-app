document.getElementById('resume-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const details = document.getElementById('details').value;

  const response = await fetch('https://YOUR-BACKEND-URL/api/generate-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, position, details }),
  });

  const data = await response.json();
  document.getElementById('result').textContent = data.resume || 'Error generating resume';
});
