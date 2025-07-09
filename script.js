document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculate-btn");
  const birthdateInput = document.getElementById("birthdate");
  const resultContainer = document.getElementById("result");
  const resultPlaceholder = document.querySelector(".result-placeholder");

  // Set default date to 20 years ago
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 20);
  birthdateInput.valueAsDate = defaultDate;

  calculateBtn.addEventListener("click", function () {
    const birthdate = new Date(birthdateInput.value);
    const today = new Date();

    if (isNaN(birthdate.getTime())) {
      showError("Please enter a valid birthdate");
      return;
    }

    if (birthdate > today) {
      showError("Birthdate cannot be in the future");
      return;
    }

    const age = calculateAge(birthdate, today);
    displayResult(age);
  });

  function calculateAge(birthdate, today) {
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    // Adjust if the current month/day hasn't happened yet this year
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
      days += lastMonth.getDate();
      months--;
    }

    // Calculate total days
    const birthThisYear = new Date(
      today.getFullYear(),
      birthdate.getMonth(),
      birthdate.getDate()
    );
    let totalDays = Math.floor((today - birthThisYear) / (1000 * 60 * 60 * 24));

    if (totalDays < 0) {
      // If birthday hasn't occurred yet this year
      const lastYearBirth = new Date(
        today.getFullYear() - 1,
        birthdate.getMonth(),
        birthdate.getDate()
      );
      totalDays = Math.floor((today - lastYearBirth) / (1000 * 60 * 60 * 24));
    }

    // Calculate next birthday
    let nextBirthday = new Date(
      today.getFullYear(),
      birthdate.getMonth(),
      birthdate.getDate()
    );
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.ceil(
      (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );

    return {
      years: years,
      months: months,
      days: days,
      totalDays: totalDays,
      nextBirthdayIn: daysUntilNextBirthday,
    };
  }

  function displayResult(age) {
    resultPlaceholder.style.display = "none";

    const nextBirthdayText =
      age.nextBirthdayIn === 0
        ? "🎉 Today is your birthday! 🎉"
        : `Your next birthday is in <span class="age-highlight">${age.nextBirthdayIn}</span> days`;

    resultContainer.innerHTML = `
            <div class="age-result">
                Your age is: 
                <span class="age-highlight">${age.years}</span> years, 
                <span class="age-highlight">${age.months}</span> months, and 
                <span class="age-highlight">${age.days}</span> days
            </div>
            <div class="age-details">
                That's approximately <span class="age-highlight">${Math.floor(
                  age.totalDays
                )}</span> days or 
                <span class="age-highlight">${Math.floor(
                  age.totalDays / 7
                )}</span> weeks!
            </div>
            <div class="age-details">
                ${nextBirthdayText}
            </div>
        `;

    // Add animation
    resultContainer.style.animation = "none";
    void resultContainer.offsetWidth; // Trigger reflow
    resultContainer.style.animation = "fadeIn 0.5s ease-out";
  }

  function showError(message) {
    resultPlaceholder.style.display = "none";
    resultContainer.innerHTML = `<div class="error-message">${message}</div>`;

    // Add animation
    resultContainer.style.animation = "none";
    void resultContainer.offsetWidth; // Trigger reflow
    resultContainer.style.animation = "shake 0.5s ease-out";
  }
});

// Add keyframe animations to the style sheet
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
    </style>
`
);

document.addEventListener("DOMContentLoaded", function () {
  // Set current year in copyright
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Add animation to social links on hover
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.animation = "none";
      void this.offsetWidth; // Trigger reflow
      this.style.animation = "float 0.8s ease-in-out";
    });
  });
});
