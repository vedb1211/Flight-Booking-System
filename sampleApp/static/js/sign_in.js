function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signin-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch("/sign_in/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), // Django CSRF token
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      window.location.href = "/"; // Redirect to signin
      // You can also store the token or redirect the user here
    } else if (data.status === "error") {
      alert("Non authenticated User: Please Verify your email address");
    }
  });
});
