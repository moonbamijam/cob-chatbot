export const useDebounce = (func, waitMiliSec) => {
  let timeout;
  let seconds = waitMiliSec * 1000;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, seconds);
  };
};
