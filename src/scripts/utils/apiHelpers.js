export const withRetry = (fn, retries = 3) => async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (retries > 0 && error.message.includes(429)) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return withRetry(fn, retries - 1)(...args);
      }
      throw error;
    }
  };