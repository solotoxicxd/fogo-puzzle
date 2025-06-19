const canvas = document.getElementById("puzzle");
const ctx = canvas.getContext("2d");
const size = 3;
const tileSize = canvas.width / size;
const imageCount = 5;

let tiles = [];
let empty = { x: size - 1, y: size - 1 };
let timer = 0;
let interval;
let img = new Image();
const clickSfx = new Audio("sounds/click.mp3");

function loadRandomImage() {
  const random = Math.floor(Math.random() * imageCount) + 1;
  img.src = `assets/fogo${random}.png`;
  img.onerror = () => alert("Image failed to load. Check file names in assets folder.");
}

function getRank(seconds) {
  if (seconds <= 30) return { title: "🔥 Flame God", roast: "You solved it faster than Fogo drama spreads. Respect!" };
  if (seconds <= 60) return { title: "🔥 Ember Surfer", roast: "Quick fingers, but still had time to blink. Nicely done." };
  if (seconds <= 90) return { title: "🔥 Lukewarm Legend", roast: "Your brain’s heating up… slowly. But you got there." };
  if (seconds <= 120) return { title: "⚠️ Flickering Ember", roast: "Even the fire got bored watching you. That was long." };
  return { title: "❄️ Cold Ash", roast: "2 minutes? Bro... Fogo testnet might launch before you finish next one." };
}

function initTiles() {
  tiles = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      tiles.push({ x, y });
    }
  }
  tiles.pop();
  shuffle();
}

function shuffle() {
  for (let i = 0; i < 100; i++) {
    const moves = getMoves();
    const move = moves[Math.floor(Math.random() * moves.length)];
    moveTile(move.x, move.y);
  }
  draw();
}

function getMoves() {
  return tiles.filter(t => 
    (Math.abs(t.x - empty.x) === 1 && t.y === empty.y) || 
    (Math.abs(t.y - empty.y) === 1 && t.x === empty.x)
  );
}

function moveTile(x, y) {
  const i = tiles.findIndex(t => t.x === x && t.y === y);
  if (i > -1) {
    [tiles[i].x, empty.x] = [empty.x, tiles[i].x];
    [tiles[i].y, empty.y] = [empty.y, tiles[i].y];
  }
}

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / tileSize);
  const y = Math.floor((e.clientY - rect.top) / tileSize);
  moveTile(x, y);
  draw();
  if (isSolved()) {
    clearInterval(interval);
    document.getElementById("puzzle-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "flex";
    const rank = getRank(timer);
    document.getElementById("message").innerText = `${rank.roast}\nTime: ${timer}s\nRank: ${rank.title}`;
    const text = `I solved the Fogo Puzzle in ${timer}s 🔥\nRank: ${rank.title}\n${rank.roast}\n\nTry it: https://fogopuzzle.vercel.app\nby @bytrizz404`;
    document.getElementById("share").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  }
});

function isSolved() {
  return tiles.every((t, i) => t.x + t.y * size === i);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tiles.forEach(t => {
    ctx.drawImage(img, t.x * tileSize, t.y * tileSize, tileSize, tileSize, t.x * tileSize, t.y * tileSize, tileSize, tileSize);
  });
}

document.getElementById("start-btn").onclick = () => {
  clickSfx.play();
  document.getElementById("home-screen").style.display = "none";
  document.getElementById("puzzle-screen").style.display = "flex";
  document.getElementById("timer").innerText = "Time: 0s";
  timer = 0;
  interval = setInterval(() => {
    timer++;
    document.getElementById("timer").innerText = `Time: ${timer}s`;
  }, 1000);
  loadRandomImage();
};

document.getElementById("restart-btn").onclick = () => {
  clickSfx.play();
  location.reload();
};

img.onload = () => initTiles();
