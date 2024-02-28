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
async function cardHasBeenAdded() {
  const userId = getUserIdFromUrl();
  const cardDetails = await fetch(
    "https://guru-new-iuz1.onrender.com/verifyUserPayment",
    {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const parsedCardDetails = await cardDetails.text();
  console.log(parsedCardDetails);
  if (parsedCardDetails !== "" && parsedCardDetails != null) {
    console.log(JSON.parse(parsedCardDetails));
    const usableCardDetails = JSON.parse(parsedCardDetails);

    // Create a new container element
    const newContainer = document.createElement("div");
    newContainer.classList.add("container");
    newContainer.innerHTML = `
      <div class="card">
        <img src="/assets/master_card.png" alt="mastercard" />
        <p class="cardLastDigits">**** **** **** ${usableCardDetails.lastDigits}</p>
      </div>
      <p class="nameOfCard">${usableCardDetails.cardType} ${usableCardDetails.lastDigits}</p>
      <div class="detailField">
        <p class="pTitle">Expiration Date</p>
        <p class="pDesc">${usableCardDetails.expiryDate}</p>
      </div>
      <div class="detailField">
        <p class="pTitle">Billing Address</p>
        <p class="pDesc">${usableCardDetails.billingAddress}</p>
      </div>
    `;

    // Get reference to the existing container
    const container = document.querySelector("#payContainer");

    // Replace the existing container with the new one
    container.replaceWith(newContainer);
  }
}

cardHasBeenAdded();
