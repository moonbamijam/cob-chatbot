export const sleep = async (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
// Function that will create a delay based on the number of the given param