document.getElementById("emailLink").addEventListener("click", function (event) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  let dishes = [];
  checkboxes.forEach(cb => dishes.push(cb.value));

  if (dishes.length === 0) {
    alert("Please select at least one dish!");
    event.preventDefault();
    return;
  }

  const body = "Hello, I would like to order the following dishes:\n\n" + dishes.join(", ");
  const subject = "Dish Order Inquiry";
  const email = "faku4145.sample@gmail.com";

  // Detect if user is on mobile
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  let emailUrl;
  if (isMobile) {
    // On mobile → use mailto (opens default app like Gmail, Outlook, iOS Mail)
    emailUrl =
      "mailto:" + encodeURIComponent(email) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  } else {
    // On desktop → use Gmail web compose
    emailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=" + encodeURIComponent(email) +
      "&su=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  }

  this.href = emailUrl; // update the link dynamically
  localStorage.setItem("emailSent", "true");
});

// When the page reloads, check the flag
window.addEventListener("load", function () {
  if (localStorage.getItem("emailSent") === "true") {
    alert("✅ Email compose opened! Please confirm sending.");
    localStorage.removeItem("emailSent"); // clear the flag so it shows only once
  }
});

// set cutoff date (YYYY-MM-DD format)
const cutoffDate = new Date("2025-09-10");
const today = new Date();

// if current date > cutoff, show alternate HTML
if (today > cutoffDate) {
  document.body.innerHTML = `
    <div style="text-align:center; padding:50px; font-family:sans-serif;">
      <h1>⏰ Our Pop-Up Store Has Closed</h1>
      <p>Thank you for supporting us! See you in our next event 🎉</p>
    </div>
  `;
}
