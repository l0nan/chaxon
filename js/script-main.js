const sections = [
  { title: "Info", description: "Aqui puedes encontrar informacion sobre la escuela", link: "/docs/info.html" },
  { title: "Horarios", description: "Aqui puedes consultar los horarios de clases", link: "/docs/horario.html" },
  { title: "Mapa", description: "Aqui puedes consultar las ubicaciones de la escuela", link: "/docs/mapa.html" },
  { title: "Preguntas Frecuentes", description: "Aqui encontraras dudas comunes sobre la escuela", link: "/docs/p_frecuentes.html" }
];

let current = 0;

function updateView() {
  const section = sections[current];
  document.getElementById("sectionTitle").textContent = section.title;
  document.getElementById("description").textContent = section.description;

  const button = document.getElementById("sectionButton");
  button.textContent = section.title;
  button.onclick = () => {
    window.location.href = section.link;
  };
}

function navigate(direction) {
  current = (current + direction + sections.length) % sections.length;
  updateView();
}

updateView(); // Inicializa


// Creacion de particulas para el fondo

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (
      this.x < 0 || this.x > canvas.width ||
      this.y < 0 || this.y > canvas.height
    ) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 240, 255, ${this.alpha})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

createParticles();
animate();
