document.addEventListener("DOMContentLoaded", function () {
  let count = 0;
  const airline = localStorage.getItem("airline");
  const depart = localStorage.getItem("depart");
  const dtime = localStorage.getItem("departuretime");
  const arrive = localStorage.getItem("arrive");
  const atime = localStorage.getItem("arrivaltime");
  const price = localStorage.getItem("price");
  const flightID = localStorage.getItem("flightID");
  console.log(flightID);

  // Populate the ticket details section with these values
  document.querySelector(".ticket-info").innerHTML = `
    <style>
      table {
        font-size: 200%;
      }
    </style>
    <table>
      <tr>
        <td>${airline}</td>
        <td>${depart}</td>
        <td><hr><td>
        <td>${arrive}</td>
      </tr>
      <tr>
        <td>₹${price}</td>
        <td>${dtime}</td>
        <td> <td>
        <td>${atime}</td>
      </tr>
    </table>
  `;
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Collect form data and process it
    const formData = new FormData(contactForm);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");

    // You can now use this data to send to the server
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Phone:", phone);
  });

  // Logic for adding and removing passengers
  const addPassengerBtn = document.getElementById("add-passenger");
  const passengerList = document.getElementById("passenger-list");
  const remPassengerBtn = document.getElementById("rem-passenger");

  addPassengerBtn.addEventListener("click", function () {
    const passengerDiv = document.createElement("div");
    passengerDiv.className = "passenger-item";
    passengerDiv.innerHTML = `
            <label>Name: </label><input type="text" name="passengerName" style="width: 60%"><br>
            <label>Age: </label><input type="number" name="passengerAge" style="width: 60%"><br>
            <label>Gender: </label><br>
            <select name="passengerGender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select><br>
            <br>
        `;

    passengerList.appendChild(passengerDiv);
    count = count + 1;
  });

  console.log(count);

  remPassengerBtn.addEventListener("click", function () {
    if (passengerList.lastElementChild) {
      passengerList.removeChild(passengerList.lastElementChild);
    }
    count = count - 1;
  });

  // Existing code ...
  document.getElementById("Proceed").addEventListener("click", function () {
    console.log("Passenger Count", count);
    if (count === 0) {
      alert("Please add at least 1 passenger");
      return;
    }
    const formData = new FormData(contactForm);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");

    if (!fullName || !email || !phone) {
      alert("Please fill out all contact information fields");
      return;
    }

    // Save passenger information to localStorage
    const passengerItems = document.querySelectorAll(".passenger-item");
    const passengers = Array.from(passengerItems).map((item) => {
      const name = item.querySelector('input[name="passengerName"]').value;
      const age = item.querySelector('input[name="passengerAge"]').value;
      const gender = item.querySelector('select[name="passengerGender"]').value;

      if (!name || !age || !gender) {
        return null;
      }

      return { name, age, gender };
    });

    // Check if there are any passengers with unfilled details
    if (passengers.some((passenger) => passenger === null)) {
      alert("You have not entered the details of one or more passengers");
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/ticket/"); // Replace "/booking/" with the actual URL of your view
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // Include the CSRF token in the request headers
    const csrftoken = getCookie("csrftoken"); // Function to retrieve the CSRF token from cookies
    xhr.setRequestHeader("X-CSRFToken", csrftoken);

    xhr.onload = function () {
      if (xhr.status === 200) {
        // Handle success if needed
      } else {
        // Handle errors if needed
        console.error("Error:", xhr.responseText);
      }
    };

    console.log("Proceed with", flightID);

    const data = JSON.stringify({
      amount: count * price * 1.18,
      flightid: flightID,
    });
    xhr.send(data);

    // localStorage.setItem("airline", airline);
    // localStorage.setItem("depart", depart);
    // localStorage.setItem("departuretime", dtime);
    // localStorage.setItem("arrive", arrive);
    // localStorage.setItem("arrivaltime", atime);
    // localStorage.setItem("price", price);
    // localStorage.setItem("flightID", flightID);
    localStorage.setItem("passengers", JSON.stringify(passengers));
    localStorage.setItem("Passengercount", count);

    window.location.href = "/ticket/"; // replace with the actual path to your ticket.html
  });
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
