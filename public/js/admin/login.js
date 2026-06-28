// public/js/admin/login.js
// Client-side interactions for the admin login page.
// Handles: password visibility toggle, form loading state.
// Server handles all validation — this file only manages UI states.

"use strict";

(function () {

  // ─── Password Toggle ──────────────────────────────────────────────────────
  const passwordToggle = document.getElementById("passwordToggle");
  const passwordInput = document.getElementById("password");
  const eyeOpen = passwordToggle ? passwordToggle.querySelector(".eye-open") : null;
  const eyeClosed = passwordToggle ? passwordToggle.querySelector(".eye-closed") : null;

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";

      // Toggle input type
      passwordInput.type = isPassword ? "text" : "password";

      // Swap eye icons
      if (eyeOpen && eyeClosed) {
        eyeOpen.style.display = isPassword ? "none" : "block";
        eyeClosed.style.display = isPassword ? "block" : "none";
      }

      // Update aria-label for accessibility
      passwordToggle.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
      );
    });
  }

  // ─── Login Form — Loading State ───────────────────────────────────────────
  const loginForm = document.getElementById("adminLoginForm");
  const loginBtn = document.getElementById("loginBtn");
  const btnText = loginBtn ? loginBtn.querySelector(".btn-login-text") : null;
  const btnLoader = loginBtn ? loginBtn.querySelector(".btn-login-loader") : null;

  if (loginForm && loginBtn) {
    loginForm.addEventListener("submit", () => {
      // Show loading state
      if (btnText) btnText.style.display = "none";
      if (btnLoader) btnLoader.style.display = "flex";
      loginBtn.disabled = true;
    });
  }

})();