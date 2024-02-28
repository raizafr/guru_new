// /payments_side.html
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
function routeToPaymentPage() {
  // Example usage
  const userId = getUserIdFromUrl();
  // Base URL without any query parameters
  const baseUrl = "http://127.0.0.1:5500/payments_page.html";

  // Append the userId parameter to the base URL
  const urlWithUserId = `${baseUrl}?userId=${userId}`;

  // Return the URL with the userId parameter
  location.href = urlWithUserId;
  //   return urlWithUserId;
}

function routeToDashboard() {
  // Base URL without any query parameters
  const userId = getUserIdFromUrl();

  const baseUrl = "http://127.0.0.1:5500/overview_dashboard.html";

  // Append the userId parameter to the base URL
  const urlWithUserId = `${baseUrl}?userId=${userId}`;

  // Return the URL with the userId parameter
  location.href = urlWithUserId;
  //   return urlWithUserId;
}
function routeToAddPayment() {
  // Base URL without any query parameters
  const userId = getUserIdFromUrl();

  const baseUrl = "http://127.0.0.1:5500/add_payment.html";

  // Append the userId parameter to the base URL
  const urlWithUserId = `${baseUrl}?userId=${userId}`;

  // Return the URL with the userId parameter
  location.href = urlWithUserId;
  //   return urlWithUserId;
}
async function routeToConfirmationPage() {
  // Base URL without any query parameters
  console.log("gideon", document.getElementById("billingAddress").value);
  const userId = getUserIdFromUrl();
  let billingAddress = document.getElementById("billingAddress").value;
  await fetch("https://guru-new-iuz1.onrender.com/storeCardDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      billingAddress: billingAddress,
      userId,
      expiryDate: document.getElementById("expDate").value,
      cardNumber: document.getElementById("cardNumber").value,
      cvv: document.getElementById("securityCode").value,
      cardType: document.getElementById("cardType").value,
    }),
  });

  const baseUrl = "http://127.0.0.1:5500/congrats.html";
  // Append the userId parameter to the base URL
  const urlWithUserId = `${baseUrl}?userId=${userId}`;

  // Return the URL with the userId parameter
  location.href = urlWithUserId;
  //   return urlWithUserId;
}
function routeBackToDashboard() {
  // Base URL without any query parameters
  const userId = getUserIdFromUrl();

  const baseUrl = "http://127.0.0.1:5500/overview_dashboard.html";

  // Append the userId parameter to the base URL
  const urlWithUserId = `${baseUrl}?userId=${userId}`;

  // Return the URL with the userId parameter
  window.location.replace(urlWithUserId);
  //   return urlWithUserId;
}
