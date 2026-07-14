/* src/components/ResultCard/RadarChart.js */

/**
 * Draws a beautifully styled neon radar chart on an HTML5 canvas.
 * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
 * @param {Object} scores - The raw type scores (e.g. { idea: 4, strategy: 2, ... }).
 */
export function drawRadarChart(canvas, scores) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear canvas & configure high DPI rendering backing store size
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const cx = width / 2;
  const cy = height / 2 + 10; // Shift down slightly for title spacing
  const radius = Math.min(width, height) * 0.35; // Maximum radius of chart

  // Define the 6 axes (labels, keys, and angle in radians)
  const axes = [
    { label: "💡 아이디어", key: "idea" },
    { label: "📈 전략", key: "strategy" },
    { label: "⚡ 실행", key: "execution" },
    { label: "📊 분석", key: "analysis" },
    { label: "🤝 협업", key: "collaboration" },
    { label: "🛠️ 제작", key: "builder" }
  ];

  const totalAxes = axes.length;
  const maxScore = 5; // Normalize chart maximum base (typically 0-5 range in 12-question distribution)

  // 1. Draw Background Grid (Concentric hexagons)
  const levels = 4;
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.lineWidth = 1;
  
  for (let i = 1; i <= levels; i++) {
    const currentRadius = (radius / levels) * i;
    ctx.beginPath();
    for (let j = 0; j < totalAxes; j++) {
      const angle = (Math.PI * 2 / totalAxes) * j - Math.PI / 2; // -90 deg starting from top
      const x = cx + Math.cos(angle) * currentRadius;
      const y = cy + Math.sin(angle) * currentRadius;
      if (j === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();

  // 2. Draw Radial Axis Lines
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.lineWidth = 1;
  for (let j = 0; j < totalAxes; j++) {
    const angle = (Math.PI * 2 / totalAxes) * j - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Extract scores and plot data points coordinates
  const points = axes.map((axis, j) => {
    const scoreVal = scores[axis.key] || 0;
    // Map score value to a fraction of the maximum radius (with a tiny minimum to avoid center dots overlapping)
    const valPercent = Math.max(0.1, Math.min(scoreVal, maxScore) / maxScore);
    const currentRadius = radius * valPercent;
    
    const angle = (Math.PI * 2 / totalAxes) * j - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * currentRadius,
      y: cy + Math.sin(angle) * currentRadius
    };
  });

  // 4. Draw Data Area (Semi-transparent neon gradient area)
  ctx.save();
  ctx.beginPath();
  points.forEach((pt, j) => {
    if (j === 0) {
      ctx.moveTo(pt.x, pt.y);
    } else {
      ctx.lineTo(pt.x, pt.y);
    }
  });
  ctx.closePath();
  
  // Fill gradient
  const fillGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
  fillGrad.addColorStop(0, 'rgba(0, 229, 255, 0.15)');
  fillGrad.addColorStop(1, 'rgba(189, 0, 255, 0.25)');
  ctx.fillStyle = fillGrad;
  ctx.fill();

  // Draw bright neon stroke outline
  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.restore();

  // 5. Draw Data Points (Dots on vertices)
  ctx.save();
  points.forEach((pt) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 8;
    ctx.fill();
    
    // Outer glowing border ring
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
  ctx.restore();

  // 6. Draw Text Labels
  ctx.save();
  ctx.font = "bold 11.5px 'Pretendard', 'Outfit', sans-serif";
  ctx.fillStyle = '#94a3b8'; // var(--color-text-gray)
  
  axes.forEach((axis, j) => {
    const angle = (Math.PI * 2 / totalAxes) * j - Math.PI / 2;
    // Push text slightly further away from outer axis bounds
    const x = cx + Math.cos(angle) * (radius + 22);
    const y = cy + Math.sin(angle) * (radius + 15);
    
    // Dynamic alignment calculations based on angle position
    if (Math.abs(Math.cos(angle)) < 0.1) {
      ctx.textAlign = 'center';
    } else if (Math.cos(angle) > 0) {
      ctx.textAlign = 'left';
    } else {
      ctx.textAlign = 'right';
    }

    if (Math.abs(Math.sin(angle)) < 0.1) {
      ctx.textBaseline = 'middle';
    } else if (Math.sin(angle) > 0) {
      ctx.textBaseline = 'top';
    } else {
      ctx.textBaseline = 'bottom';
    }

    // Highlighting key/score text (e.g. "아이디어 (3점)")
    const scoreVal = scores[axis.key] || 0;
    ctx.fillText(`${axis.label} (${scoreVal}점)`, x, y);
  });
  ctx.restore();
}
