export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  export const formatLocalDate = (isoString, timezone) => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timezone
    };
    return new Date(isoString).toLocaleString('en-US', options);
  };
  
  export const getFirstValidImage = (images, minWidth = 200) => {
    return images?.find(img => img.width >= minWidth)?.url || images?.[0]?.url || '';
  };
  
  export const showError = (message, element) => {
    element.innerHTML = `<div class="error-message">⚠️ ${message}</div>`;
  };