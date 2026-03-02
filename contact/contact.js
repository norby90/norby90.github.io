// Contact form handling with EmailJS
// Sign up at https://www.emailjs.com/ and replace the values below

const EMAILJS_SERVICE_ID = "service_8bil45n";
const EMAILJS_TEMPLATE_ID = "template_i0gdxjy";
const EMAILJS_PUBLIC_KEY = "hxrEt1ZzYH7RcINB0E_yC";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contactForm");
  const msgEl = document.getElementById("formMsg");
  const btn = document.querySelector(".btn-send");

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const msg = document.getElementById("cMsg").value.trim();

    if (!name || !email || !msg) {
      msgEl.textContent = "Please fill in all fields.";
      msgEl.style.color = "rgba(239,68,68,0.85)";
      return;
    }

    btn.disabled = true;
    btn.textContent = "Sending...";

    // Check if EmailJS is configured
    if (EMAILJS_SERVICE_ID === "service_8bil45n") {
      // Demo mode - simulate sending
      await simulateSend();
      msgEl.textContent = "✓ Message sent!";
      msgEl.style.color = "rgba(34,197,94,0.85)";
    } else {
      // Send with EmailJS
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          message: msg
        }, EMAILJS_PUBLIC_KEY);

        msgEl.textContent = "✓ Message sent! I'll get back to you soon.";
        msgEl.style.color = "rgba(34,197,94,0.85)";
      } catch (error) {
        msgEl.textContent = "Failed to send. Please try again.";
        msgEl.style.color = "rgba(239,68,68,0.85)";
        console.error("EmailJS error:", error);
      }
    }

    btn.textContent = "Send message →";
    btn.disabled = false;
    form.reset();
  });

  function simulateSend() {
    return new Promise(resolve => setTimeout(resolve, 1200));
  }
});
