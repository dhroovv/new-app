let page = 1;
const maxPage = 6;
const app = document.getElementById("app");

// Audio
const slideSnd = document.getElementById("slideSnd");
const boingSnd = document.getElementById("boingSnd");
const funSong = document.getElementById("funSong");
const cuteAudio = document.getElementById("cuteAudio");
const page1CustomSnd = document.getElementById("page1CustomSnd");
const page3CustomSnd = document.getElementById("page3CustomSnd");
const heartCatchSnd = document.getElementById("heartCatchSnd");
const scratchEndSnd = document.getElementById("scratchEndSnd");

function stopAllAudio() {
  [slideSnd, boingSnd, funSong, cuteAudio, page1CustomSnd, page3CustomSnd, heartCatchSnd, scratchEndSnd].forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function playSound(audio) {
  stopAllAudio();
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function showTopMessage() {
  const msg = document.getElementById("topMessage");
  msg.classList.add("show");
  setTimeout(() => msg.classList.remove("show"), 4000);
}

document.getElementById("moreBtn").addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    stopAllAudio();
    renderPage(page);
  }
});

function renderPage(p) {
  app.innerHTML = "";
  if (p === 1) renderPage1();
  else if (p === 2) renderPage2();
  else if (p === 3) renderPage3();
  else if (p === 4) renderPage4();
  else if (p === 5) renderPage5();
  else if (p === 6) renderPage6();
}
renderPage(page);

// Page 1
function renderPage1() {
  app.innerHTML = `
    <div>
      <button id="openBtn">Open</button>
      <p id="letterMsg" style="display:none; margin-top:20px; font-size:18px;">
        Hey there, cutie! 😊<br>
        Just wanted to say you’re awesome.<br>
        Thanks for being you.<br>
        Wishing you all the best! 🌟
      </p>
      <img id="cuteGif" src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
           style="display:none; margin-top:20px; width:200px;" alt="friendly gif">
    </div>`;

  let open = false;
  document.getElementById("openBtn").onclick = () => {
    open = !open;
    document.getElementById("letterMsg").style.display = open ? "block" : "none";
    document.getElementById("cuteGif").style.display = open ? "block" : "none";
    document.getElementById("openBtn").textContent = open ? "Close" : "Open";
    if (open) playSound(page1CustomSnd);
    else stopAllAudio();
  };
}

// Page 2
function renderPage2() {
  app.innerHTML = `
    <div>
      <p style="font-size:20px;">Do you want an ass cream? 🍦</p>
      <button id="yesBtn">Yes</button>
      <button id="noBtn">No</button>
      <p id="afterNo" style="display:none; margin-top:20px;">Don’t worry, cutie — I will still give it to you</p>
    </div>`;

  document.getElementById("yesBtn").onclick = () => {
    playSound(boingSnd);
    const yesBtn = document.getElementById("yesBtn");
    yesBtn.style.position = "absolute";
    yesBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
    yesBtn.style.top = Math.random() * (window.innerHeight - 100) + "px";
  };
  document.getElementById("noBtn").onclick = () => {
    playSound(funSong);
    document.getElementById("afterNo").style.display = "block";
  };
}

// Page 3
function renderPage3() {
  app.innerHTML = `
    <div>
      <p style="font-size:20px;">What do you like the most?</p>
      <button class="choice">Pads</button>
      <button class="choice">Chocolate</button>
      <button class="choice">Flowers</button>
      <p id="msg" style="display:none; margin-top:20px; font-size:18px;">kya yaaawrrrr pads kyu nhi liya</p>
    </div>`;
  const msg = document.getElementById("msg");
  document.querySelectorAll(".choice").forEach(btn => {
    btn.onclick = () => {
      msg.style.display = "block";
      playSound(page3CustomSnd);
    };
  });
}

// Page 4
function renderPage4() {
  app.innerHTML = `
    <div>
      <p style="font-size:18px; margin-bottom:10px;">Tap the hearts before they fall! 💖</p>
      <div id="gameArea"></div>
      <p id="score" style="text-align:center;">Score: 0</p>
      <p id="endMsg" style="display:none; text-align:center; font-size:24px;">Game Over!</p>
    </div>`;

  let score = 0;
  let gameOver = false;
  const area = document.getElementById("gameArea");
  const scoreP = document.getElementById("score");
  const endMsg = document.getElementById("endMsg");

  function dropHeart() {
    if (gameOver) return;
    const heart = document.createElement("div");
    heart.textContent = "❤";
    heart.style.position = "absolute";
    heart.style.fontSize = "2rem";
    heart.style.left = Math.random() * (area.clientWidth - 30) + "px";
    heart.style.top = "0px";
    area.appendChild(heart);

    const fall = setInterval(() => {
      const top = parseInt(heart.style.top);
      heart.style.top = top + 5 + "px";
      if (top > area.clientHeight - 30) {
        clearInterval(fall);
        gameOver = true;
        endMsg.style.display = "block";
        playSound(scratchEndSnd);
      }
    }, 30);

    heart.onclick = () => {
      clearInterval(fall);
      area.removeChild(heart);
      score++;
      scoreP.textContent = "Score: " + score;
      playSound(heartCatchSnd);
    };
  }

  const gameLoop = setInterval(() => {
    if (!gameOver) dropHeart();
    else clearInterval(gameLoop);
  }, 1000);
}

// Page 5 - with "Scratch the Card" heading
function renderPage5() {
  app.innerHTML = `
    <div>
      <h2>Scratch the Card</h2>
      <canvas id="scratch" width="300" height="200" style="border:1px solid #ccc; border-radius:10px;"></canvas>
      <p style="margin-top:20px;">Have a great day, and stay off your phone!</p>
    </div>`;

  const canvas = document.getElementById("scratch");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ccc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "destination-out";

  let scratched = 0;
  let playedSound = false;

  function scratch(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();

    scratched++;
    if (scratched === 100 && !playedSound) {
      playedSound = true;
      playSound(scratchEndSnd);
      setTimeout(() => alert("🎉 Happy Birthday, Anushka! 🎂 Have a fantastic year ahead! 🎈"), 500);
    }
  }

  canvas.addEventListener("mousemove", scratch);
  canvas.addEventListener("touchmove", scratch);
}

// Page 6 – Animated bouquet + flower gif + popup message
function renderPage6() {
  app.innerHTML = `
    <div>
      <p style="font-size:20px; margin-bottom:20px;">For you 💐</p>
      <img id="bouquet" class="animated-bouquet" src="https://media.giphy.com/media/SnUMyZn0LhYtK/giphy.gif" alt="Bouquet" />
      <img id="flowersGif" src="https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif" alt="Flowers" />
    </div>`;

  setTimeout(showTopMessage, 2500);
}