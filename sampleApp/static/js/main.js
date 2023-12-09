document.addEventListener("DOMContentLoaded", function () {
  // Get radio buttons and return date input
  const economyClass = document.querySelector(
    'input[name="class"][value="Economy"]'
  );
  const businessClass = document.querySelector(
    'input[name="class"][value="Business"]'
  );
  const accountIcon = document.getElementById("account-icon");
  const accountDropdown = document.getElementById("account-dropdown-content");
  const bookingForm = document.getElementById("booking-form");
  const bookTicketsButton = document.getElementById("book-tickets");

  // Function to toggle the account dropdown
  function toggleAccountDropdown() {
    accountDropdown.style.display =
      accountDropdown.style.display === "block" ? "none" : "block";
  }

  // function handleRadioChange() {
  //   if (roundTripRadio.checked) {
  //     returnDateInput.disabled = false;
  //   } else {
  //     returnDateInput.disabled = true;
  //   }
  // }

  // Add change event listeners to both radio buttons
  economyClass.addEventListener("change", handleRadioChange);
  businessClass.addEventListener("change", handleRadioChange);

  // Add click event listener to the account icon
  accountIcon.addEventListener("click", toggleAccountDropdown);

  // Close the dropdown if the user clicks outside of it
  document.addEventListener("click", function (event) {
    if (event.target !== accountIcon) {
      accountDropdown.style.display = "none";
    }
  });

  // Trigger the function on page load
  // handleRadioChange();

  bookTicketsButton.addEventListener("click", function () {
    let tripType;
    if (economyClass.checked) {
      tripType = economyClass.value;
    } else {
      tripType = businessClass.value;
    }
    const departureDateInput = document.getElementById("departure-date").value;
    const origin = document.getElementById("Origin").value;
    const destination = document.getElementById("Destination").value;
    console.log("Button clicked");
    localStorage.setItem("tripType", tripType);
    localStorage.setItem("origin", origin);
    localStorage.setItem("destination", destination);
    localStorage.setItem("departureDate", departureDateInput);
  });
});
