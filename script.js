const registrationForm = document.getElementById("mainForm");
const confirmationDiv = document.getElementById("confirmPage");
const confirmID = document.getElementById("confirmID");
const confirmName = document.getElementById("confirmName");
const confirmAddress = document.getElementById("confirmAddress");
const confirmStatus = document.getElementById("confirmStatus");
const confirmFee = document.getElementById("confirmFee");
const backButton = document.getElementById("returnBtn");
const container = document.getElementById("header-top");

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);
  const userID = formData.get("userID");
  const userFullName = formData.get("userFullName");
  const userAddress = formData.get("userAddress");
  const userStatus = formData.get("userStatus");

  const apiEndpoint = 'https://bvcsportclubbackend.onrender.com/api/register';
  //const apiEndpoint = "http://localhost:3000/api/register";

  fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID,
      userFullName,
      userAddress,
      userStatus,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      confirmID.textContent = "ID: " + `${userID}`;
      confirmName.textContent = "NAME: " + `${userFullName}`;
      confirmAddress.textContent = "ADDRESS: " + `${userAddress}`;
      confirmStatus.textContent = "STATUS: " + `${userStatus}`;
      confirmFee.textContent = "FEE: " + `${data.fee}`;

      container.style.display = "none";
      registrationForm.style.display = "none";
      confirmationDiv.style.display = "block";
      backButton.style.display = "block";
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });
});

backButton.addEventListener("click", () => {
  confirmationDiv.style.display = "none";
  backButton.style.display = "none";

  container.style.display = "block";
  registrationForm.style.display = "block";
  clearForm();
});

function clearForm() {
  document.getElementById("registrationForm").reset();
}
