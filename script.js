document.addEventListener("DOMContentLoaded", () => {
  // 1. Handle Preloader
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1500); // 1.5 seconds simulated load

  // 2. Fetch Data
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      renderHero(data.profile);
      renderContact(data.profile);
      renderSkills(data.skills);
      renderExperience(data.experience);
      renderProjects(data.projects);
      renderEducation(data.education);
      initScrollAnimation();
    })
    .catch((error) => console.error("Error loading data:", error));

  // 3. Theme Toggle Logic
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = toggleBtn.querySelector("i");

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  });
});

// --- Rendering Functions ---

function renderHero(profile) {
  const hero = document.getElementById("hero-section");
  hero.innerHTML = `
        <div class="hello-tag">👋 Hello, I'm</div>
        <h1>${profile.name}</h1>
        <h3 class="subtitle">${profile.role}</h3>
        <p>${profile.summary}</p>
        <div class="hero-btns" style="margin-top: 20px;">
            <a href="mailto:${profile.email}" class="btn">Hire Me</a>
            <a href="${profile.github}" target="_blank" class="btn btn-outline"><i class="fa-brands fa-github"></i> GitHub</a>
        </div>
    `;
}

function renderContact(profile) {
  const contact = document.getElementById("contact-section");
  contact.innerHTML = `
        <h2>Contact</h2>
        <p><i class="fa-solid fa-location-dot"></i> ${profile.location}</p>
        <p><i class="fa-solid fa-envelope"></i> ${profile.email}</p>
        <p><i class="fa-solid fa-phone"></i> ${profile.phone}</p>
        <div style="margin-top: 15px;">
            <a href="${profile.linkedin}" target="_blank" class="btn-outline" style="padding: 5px 10px; font-size:0.9rem"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
        </div>
    `;
}

function renderSkills(skills) {
  const list = document.getElementById("skill-list");
  skills.forEach((skill) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = skill;
    list.appendChild(span);
  });
}

function renderExperience(experience) {
  const list = document.getElementById("exp-list");
  experience.forEach((job) => {
    const div = document.createElement("div");
    div.className = "exp-item";
    div.innerHTML = `
            <h3>${job.role}</h3>
            <span class="date">${job.company} | ${job.date}</span>
            <ul>
                ${job.details.map((d) => `<li>${d}</li>`).join("")}
            </ul>
        `;
    list.appendChild(div);
  });
}

function renderProjects(projects) {
  const list = document.getElementById("proj-list");
  projects.forEach((proj) => {
    const div = document.createElement("div");
    div.className = "project-card";
    div.innerHTML = `
            <h3>${proj.title}</h3>
            <p>${proj.desc}</p>
            <span class="tech-stack"><i class="fa-solid fa-layer-group"></i> ${proj.tech}</span>
        `;
    list.appendChild(div);
  });
}

function renderEducation(edu) {
  const section = document.getElementById("edu-section");
  section.innerHTML = `
        <h2><i class="fa-solid fa-graduation-cap"></i> Education</h2>
        <h3>${edu.degree}</h3>
        <p>${edu.school}</p>
        <span class="date">${edu.year}</span>
    `;
}

// --- Animation Observer ---
function initScrollAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".bento-item")
    .forEach((el) => observer.observe(el));
}
