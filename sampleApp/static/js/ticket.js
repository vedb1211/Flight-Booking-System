document.addEventListener("DOMContentLoaded", function () {
  // Get data from localStorage
  const airline = localStorage.getItem("airline");
  const depart = localStorage.getItem("depart");
  const dtime = localStorage.getItem("departuretime");
  const arrive = localStorage.getItem("arrive");
  const atime = localStorage.getItem("arrivaltime");
  const price = localStorage.getItem("price");
  const flightID = localStorage.getItem("flightID");
  const passengers = JSON.parse(localStorage.getItem("passengers"));
  let count = localStorage.getItem("Passengercount");
  console.log(airline, depart, dtime, flightID);

  // Populate flight details
  document.querySelector(".depart").innerHTML = `

        <p>Airline: ${airline}</p>
        <h3>Depart</h3>
        <p>${depart}</p>
        <p>Time: ${dtime}</p>
    `;
  document.querySelector(".arrive").innerHTML = `
        <h3>Arrive</h3>
        <p>${arrive}</p>
        <p>Time: ${atime}</p>
    `;

  // console.log(airline, depart, dtime);

  // Populate passenger details
  const passengerInfoDiv = document.getElementById("passenger-info");
  passengers.forEach((passenger) => {
    passengerInfoDiv.innerHTML += `
            <div>
                <p>Name: ${passenger.name}</p>
                <p>Age: ${passenger.age}</p>
                <p>Gender: ${passenger.gender}</p>
            </div>
        `;
  });

  // const passengerTable = document
  //   .getElementById("passenger-table")
  //   .getElementsByTagName("tbody")[0];

  // passengers.forEach((passenger) => {
  //   const row = passengerTable.insertRow();
  //   const nameCell = row.insertCell(0);
  //   const ageCell = row.insertCell(1);
  //   const genderCell = row.insertCell(2);

  //   nameCell.innerHTML = passenger.name;
  //   ageCell.innerHTML = passenger.age;
  //   genderCell.innerHTML = passenger.gender;
  // });

  // Populate fare details (you may want to calculate this dynamically)
  document.querySelector(".total-fare").innerHTML = `
        <p>Base Fare: ₹${price}</p>
        <p>Passengers: ${count}</p>
        <p>Tax (18%): ₹${(price * 0.18).toFixed(2)}</p>
        <p>Total: ₹${(price * count * 1.18).toFixed(2)}</p>
    `;
});
