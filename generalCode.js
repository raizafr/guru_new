function getUserIdFromUrl() {
  // Get the current URL
  const url = window.location.href;

  // Split the URL by '?' to separate the base URL from the query parameters
  const urlParts = url.split("?");

  // Check if there are query parameters
  if (urlParts.length === 2) {
    // Split the query parameters by '&' to get key-value pairs
    const queryParams = urlParts[1].split("&");

    // Iterate over the key-value pairs
    for (const param of queryParams) {
      // Split each key-value pair by '='
      const [key, value] = param.split("=");

      // Check if the key is 'userId'
      if (key === "userId") {
        // Return the value of the userId parameter
        return value;
      }
    }
  }

  // Return null if userId parameter is not found
  return null;
}

// Example usage
const userId = getUserIdFromUrl();

function createUrlWithUserId(userId) {
  // Base URL without any query parameters
  const baseUrl = "http://127.0.0.1:5500/payment_page.html";

  // Append the userId parameter to the base URL
  const urlWithUserId = `${baseUrl}?userId=${userId}`;

  // Return the URL with the userId parameter
  return urlWithUserId;
}

// Example usage
// const usersid = "exampleUserId"; // Replace 'exampleUserId' with the actual userId value
// const urlWithUserId = createUrlWithUserId(usersid);
// console.log("URL with userId:", urlWithUserId);
