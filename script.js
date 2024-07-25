document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const drawPrizeButton = document.getElementById("drawPrizeButton");
    const winnerDisplay = document.getElementById("winner");
  
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
  
    function validateForm(name, email, phone) {
      const emailPattern = /^[^@]+@[^@]+\.[a-z]{2,}$/i;
      const phonePattern = /^\d{10}$/;
  
      let valid = true;
  
      if (!name) {
        nameError.textContent = "Name is required.";
        nameError.style.display = "block";
        valid = false;
      } else {
        nameError.style.display = "none";
      }
  
      if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email.";
        emailError.style.display = "block";
        valid = false;
      } else {
        emailError.style.display = "none";
      }
  
      if (!phonePattern.test(phone)) {
        phoneError.textContent = "Please enter a valid 10-digit phone number.";
        phoneError.style.display = "block";
        valid = false;
      } else {
        phoneError.style.display = "none";
      }
  
      return valid;
    }
  
    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const prizeDraw = document.getElementById("prizeDraw").checked;
  
      if (!validateForm(name, email, phone)) {
        return;
      }
  
      const visitor = { name, email, phone, prizeDraw };
  
      let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
      visitors.push(visitor);
      localStorage.setItem("visitors", JSON.stringify(visitors));
  
      alert("Registration successful!");
      registrationForm.reset();
    });
  
    drawPrizeButton.addEventListener("click", function () {
      const visitors = JSON.parse(localStorage.getItem("visitors")) || [];
      const prizeDrawEntries = visitors.filter((visitor) => visitor.prizeDraw);
  
      if (prizeDrawEntries.length === 0) {
        winnerDisplay.textContent = "No prize draw entries yet.";
        return;
      }
      const winner =
        prizeDrawEntries[Math.floor(Math.random() * prizeDrawEntries.length)];
      winnerDisplay.textContent = `Winner: ${winner.name} (${winner.email})`;
    });
  });
  