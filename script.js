// ============================================
// ESdras & Thay — JavaScript do site
// ============================================

// 1. Fotos aparecem enquanto a pessoa rola a página
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));


// 2. Corações flutuando suavemente
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-30px";
  heart.style.fontSize = (12 + Math.random() * 20) + "px";
  heart.style.animationDuration = (7 + Math.random() * 7) + "s";

  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 15000);
}

setInterval(createHeart, 1300);


// 3. Jogo do "Você me gosta?"
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const gameArea = document.querySelector(".game-area");
const loveResult = document.getElementById("loveResult");

// Faz o botão NÃO fugir quando o mouse chega perto
function moveNoButton() {
  const areaRect = gameArea.getBoundingClientRect();

  const buttonWidth = noBtn.offsetWidth;
  const buttonHeight = noBtn.offsetHeight;

  const maxX = Math.max(0, areaRect.width - buttonWidth);
  const maxY = Math.max(0, areaRect.height - buttonHeight);

  const x = Math.random() * maxX - (areaRect.width / 2 - buttonWidth / 2);
  const y = Math.random() * maxY - (areaRect.height / 2 - buttonHeight / 2);

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

// Desktop: foge quando passa o mouse
noBtn.addEventListener("mouseenter", moveNoButton);

// Também funciona ao tocar no celular
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});

// Se de alguma forma conseguir clicar no NÃO, ele foge novamente
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

// Quando clicar SIM
yesBtn.addEventListener("click", () => {
  loveResult.classList.add("active");

  // Faz o botão NÃO desaparecer para não atrapalhar a mensagem
  noBtn.style.opacity = "0";
  noBtn.style.pointerEvents = "none";

  // Pequena chuva de corações
  for (let i = 0; i < 18; i++) {
    setTimeout(createHeart, i * 90);
  }
});

