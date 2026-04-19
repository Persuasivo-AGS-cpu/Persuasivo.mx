export function initGame(canvas, { onGameOver }) {
  const ctx = canvas.getContext('2d');
  const TILE_SIZE = 20;
  const ROWS = canvas.height / TILE_SIZE;
  const COLS = canvas.width / TILE_SIZE;

  let score = 0;
  let isPlaying = true;
  let animationId;

  // Colors matching Persuasivo Aesthetic
  const C_BG = "#000000";
  const C_WALL = "#333333";
  const C_PACMAN = "#E0FF31";
  const C_DOT = "#FFFFFF";
  const C_GHOST = "#FF2E63";

  // Map representation (1 = wall, 0 = dot, 2 = empty)
  const map = [];
  function initMap() {
      for (let r = 0; r < ROWS; r++) {
          map[r] = [];
          for (let c = 0; c < COLS; c++) {
              // Create borders except the middle row for portal
              if ((r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) && r !== Math.floor(ROWS/2)) {
                  map[r][c] = 1; 
              } else if (r % 4 === 0 && c % 4 === 0) {
                  map[r][c] = 1;
              } else {
                  map[r][c] = 0; // Dot
              }
          }
      }
      map[Math.floor(ROWS/2)][Math.floor(COLS/2)] = 2; // Center
  }
  
  initMap();

  const player = {
      x: COLS / 2, y: ROWS / 2,
      vx: 0, vy: 0,
      nextVx: -1, nextVy: 0,
      radius: TILE_SIZE / 2 * 0.8
  };

  const ghost = { x: 2, y: 2, vx: 1, vy: 0, speed: 0.08 };

  const handleKeyDown = (e) => {
      if (!isPlaying) return;
      if (e.key === 'ArrowUp') { player.nextVx = 0; player.nextVy = -1; }
      if (e.key === 'ArrowDown') { player.nextVx = 0; player.nextVy = 1; }
      if (e.key === 'ArrowLeft') { player.nextVx = -1; player.nextVy = 0; }
      if (e.key === 'ArrowRight') { player.nextVx = 1; player.nextVy = 0; }
  };

  window.addEventListener('keydown', handleKeyDown);

  function canMove(x, y, dx, dy) {
      const nextX = Math.floor(x + dx);
      const nextY = Math.floor(y + dy);
      // Portal Check - if going out of bounds via portal, it's valid
      if (nextX < 0 || nextX >= COLS) return true; 
      if (nextY < 0 || nextY >= ROWS) return false;
      return map[nextY][nextX] !== 1;
  }

  function update() {
      if (!isPlaying) return;

      if (Number.isInteger(player.x) && Number.isInteger(player.y)) {
          if (canMove(player.x, player.y, player.nextVx, player.nextVy)) {
              player.vx = player.nextVx;
              player.vy = player.nextVy;
          } else if (!canMove(player.x, player.y, player.vx, player.vy)) {
              player.vx = 0;
              player.vy = 0;
          }
      }

      const speed = 0.15;
      player.x += player.vx * speed;
      player.y += player.vy * speed;

      // PORTAL WRAP-AROUND LOGIC (Fixs the "sale por la pared y no regresa" bug)
      if (player.x < -0.5) player.x = COLS - 0.5;
      if (player.x >= COLS - 0.5) player.x = -0.5;

      // Snap to grid
      if (Math.abs(player.x - Math.round(player.x)) < speed && player.vx === 0) player.x = Math.round(player.x);
      if (Math.abs(player.y - Math.round(player.y)) < speed && player.vy === 0) player.y = Math.round(player.y);

      const cx = Math.round(player.x);
      const cy = Math.round(player.y);
      if (cx >= 0 && cx < COLS && map[cy][cx] === 0) {
          map[cy][cx] = 2; // Empty
          score += 10;
      }

      // Ghost Logic Simple Iteration
      if (Number.isInteger(ghost.x) && Number.isInteger(ghost.y)) {
          const dirs = [ [0,-1], [0,1], [-1,0], [1,0] ];
          const validDirs = dirs.filter(d => canMove(ghost.x, ghost.y, d[0], d[1]));
          if (validDirs.length > 0) {
              const chosen = validDirs[Math.floor(Math.random() * validDirs.length)];
              ghost.vx = chosen[0]; ghost.vy = chosen[1];
          }
      }
      ghost.x += ghost.vx * ghost.speed;
      ghost.y += ghost.vy * ghost.speed;

      // Wrap Ghost
      if (ghost.x < -0.5) ghost.x = COLS - 0.5;
      if (ghost.x >= COLS - 0.5) ghost.x = -0.5;

      if (Math.abs(ghost.x - Math.round(ghost.x)) < ghost.speed && ghost.vx === 0) ghost.x = Math.round(ghost.x);
      if (Math.abs(ghost.y - Math.round(ghost.y)) < ghost.speed && ghost.vy === 0) ghost.y = Math.round(ghost.y);

      // Collision
      const dist = Math.hypot(player.x - ghost.x, player.y - ghost.y);
      if (dist < 1) {
          isPlaying = false;
          const currentHigh = parseInt(localStorage.getItem('persuasivo_highscore') || 0);
          const isNewRecord = score > currentHigh;
          onGameOver(score, isNewRecord);
      }
  }

  function draw() {
      ctx.fillStyle = C_BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
              if (map[r][c] === 1) {
                  ctx.fillStyle = C_WALL;
                  ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
              } else if (map[r][c] === 0) {
                  ctx.fillStyle = C_DOT;
                  ctx.beginPath();
                  ctx.arc(c * TILE_SIZE + TILE_SIZE/2, r * TILE_SIZE + TILE_SIZE/2, 2, 0, Math.PI * 2);
                  ctx.fill();
              }
          }
      }

      ctx.fillStyle = C_PACMAN;
      ctx.beginPath();
      ctx.arc(player.x * TILE_SIZE + TILE_SIZE/2, player.y * TILE_SIZE + TILE_SIZE/2, player.radius, 0.2 * Math.PI, 1.8 * Math.PI);
      ctx.lineTo(player.x * TILE_SIZE + TILE_SIZE/2, player.y * TILE_SIZE + TILE_SIZE/2);
      ctx.fill();

      ctx.fillStyle = C_GHOST;
      ctx.fillRect(ghost.x * TILE_SIZE + 2, ghost.y * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      
      // Score in top corner of CRT
      ctx.fillStyle = "#555";
      ctx.font = "10px 'Press Start 2P', monospace";
      ctx.fillText(`SCORE: ${score}`, 10, 20);
  }

  function loop() {
      update();
      draw();
      if (isPlaying) {
          animationId = requestAnimationFrame(loop);
      }
  }

  loop();

  return {
    destroy: () => {
      isPlaying = false;
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationId);
    }
  };
}
