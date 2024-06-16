// utils/formatTime.js
export const formatTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date; // Difference in milliseconds

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = now.getFullYear() - date.getFullYear();

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days >= 1) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    if (years >= 1) {
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      return `${day}/${month}`;
    }
  }
  return date.toLocaleDateString(); // Adjust to your preferred date format
};
