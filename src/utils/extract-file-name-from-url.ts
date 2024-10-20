export const extractFileNameFromUrl = (fileUrl: string) => {
  try {
    // Decode the URL to handle %2F and other encoded characters
    const decodedUrl = decodeURIComponent(fileUrl);

    // Extract the part after the last '/'
    const startIndex = decodedUrl.lastIndexOf("/") + 1;

    // Find the end of the filename (before ?alt=)
    const endIndex = decodedUrl.indexOf("?alt=");

    if (startIndex !== -1 && endIndex !== -1) {
      return decodedUrl.substring(startIndex, endIndex);
    }

    return null; // Return null if no valid filename is found
  } catch (error) {
    console.error("Failed to extract filename:", error);
    return null;
  }
};
