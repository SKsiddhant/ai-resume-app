function apiBase() {
  if (window.API_BASE) return window.API_BASE.replace(/\/$/, '');
  return ['localhost', '127.0.0.1'].includes(location.hostname) ? 'http://localhost:3000' : '';
}

document.getElementById('resume-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = document.getElementById('submit');
  const status = document.getElementById('status');
  const result = document.getElementById('result');

  const payload = {
    name: document.getElementById('name').value,
    position: document.getElementById('position').value,
    details: document.getElementById('details').value,
  };

  button.disabled = true;
  status.textContent = 'Generating…';
  result.textContent = '';
  try {
    const response = await fetch(`${apiBase()}/api/generate-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
    result.textContent = data.resume;
    status.textContent = '';
  } catch (err) {
    status.textContent = `Error: ${err.message}`;
  } finally {
    button.disabled = false;
  }
});
