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

      const gmailUrl =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent("faku4145.sample@gmail.com") +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      this.href = gmailUrl; // update the link dynamically
            localStorage.setItem("emailSent", "true");
        });

        // When the page reloads, check the flag
        window.addEventListener("load", function () {
            if (localStorage.getItem("emailSent") === "true") {
            alert("✅ Email compose opened! Please confirm sending in Gmail.");
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