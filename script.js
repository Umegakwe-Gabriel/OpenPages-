// script.js — OpenPages interactivity

document.addEventListener("DOMContentLoaded", () => {
    /* ========= 1. HOME PAGE ALERT BUTTON ========= */
    const alertBtn = document.getElementById("openpages-alert-btn");
    if (alertBtn) {
      alertBtn.addEventListener("click", () => {
        alert(
          "OpenPages helps writers, students, and creators plan, draft, and publish better content with an organized editorial workflow."
        );
      });
    }
  
    /* ========= 2. CONTACT FORM VALIDATION ========= */
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      const nameInput = contactForm.querySelector("#name");
      const emailInput = contactForm.querySelector("#email");
      const subjectInput = contactForm.querySelector("#subject");
      const messageInput = contactForm.querySelector("#message");
      const errorSummary = document.getElementById("form-errors");
  
      contactForm.addEventListener("submit", (event) => {
        const errors = [];
  
        // Clear old error messages
        errorSummary.innerHTML = "";
        errorSummary.classList.remove("visible");
  
        // Simple name validation
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          errors.push("Please enter your full name (at least 2 characters).");
        }
  
        // Basic email regex
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue || !emailPattern.test(emailValue)) {
          errors.push("Please enter a valid email address.");
        }
  
        // Subject optional but if present, check length
        if (subjectInput.value.trim() && subjectInput.value.trim().length < 3) {
          errors.push("If you include a subject, please make it at least 3 characters.");
        }
  
        // Message required, min length
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
          errors.push("Please tell us a bit more in the message (at least 10 characters).");
        }
  
        if (errors.length > 0) {
          event.preventDefault();
  
          const list = document.createElement("ul");
          errors.forEach((msg) => {
            const li = document.createElement("li");
            li.textContent = msg;
            list.appendChild(li);
          });
  
          errorSummary.appendChild(list);
          errorSummary.classList.add("visible");
          errorSummary.focus();
        }
      });
    }
  
    /* ========= 3. GALLERY SLIDESHOW ========= */
    const slideshowImage = document.getElementById("slideshow-image");
    const slideshowCaption = document.getElementById("slideshow-caption");
    const btnPrev = document.getElementById("slide-prev");
    const btnNext = document.getElementById("slide-next");
    const dotContainer = document.getElementById("slideshow-dots");
  
    if (slideshowImage && slideshowCaption && btnPrev && btnNext && dotContainer) {
      // NOTE: make sure these files exist in your /images folder with these names
      const slides = [
        {
          src: "images/writing_collab.jpg",
          alt: "Two people collaborating on writing with a laptop and notebook.",
          caption: "Real-time collaboration on drafts."
        },
        {
          src: "images/creative_workspace.jpg",
          alt: "Minimalist creative desk with laptop, coffee, and notebook.",
          caption: "A calm workspace for deep writing focus."
        },
        {
          src: "images/book_stack.jpg",
          alt: "Stack of colorful books representing finished projects.",
          caption: "Turn your ideas into polished pieces."
        },
        {
          src: "images/author_thinking.jpg",
          alt: "Author thinking while looking out a window with notebook nearby.",
          caption: "Capture inspiration whenever it appears."
        },
        {
          src: "images/inspiration_light.jpg",
          alt: "Light bulb glowing above a notebook.",
          caption: "Track every spark of inspiration in OpenPages."
        },
        {
          src: "images/blog_banner.jpg",
          alt: "Website hero section showing a modern blog layout.",
          caption: "Plan and publish consistent blog content."
        }
      ];
  
      let currentIndex = 0;
  
      // Create dots
      const dots = slides.map((_, index) => {
        const button = document.createElement("button");
        button.className = "dot";
        button.setAttribute("type", "button");
        button.setAttribute("aria-label", `Go to slide ${index + 1}`);
        button.addEventListener("click", () => {
          currentIndex = index;
          updateSlide();
        });
        dotContainer.appendChild(button);
        return button;
      });
  
      function updateSlide() {
        const slide = slides[currentIndex];
        slideshowImage.src = slide.src;
        slideshowImage.alt = slide.alt;
        slideshowCaption.textContent = slide.caption;
  
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentIndex);
        });
      }
  
      btnPrev.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
      });
  
      btnNext.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
      });
  
      // Keyboard support for buttons
      [btnPrev, btnNext].forEach((btn) => {
        btn.addEventListener("keyup", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            btn.click();
          }
        });
      });
  
      updateSlide();
    }
  });
  
