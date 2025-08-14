export function showAlert(message, type = 'success') {
  const alert = document.getElementById('alert');
  alert.textContent = message;
  alert.className = `alert show ${type}`;

  setTimeout(() => {
    alert.className = 'alert hidden';
  }, 2000);
}