/* خلفية تفاعلية: ذرات عائمة تتشكّل بينها روابط وتتجاوب مع الماوس واللمس */
(function () {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SYMBOLS = ['H', 'O', 'C', 'N', 'Na', 'Cl', 'Fe', 'He', 'Ca', 'S', 'K', 'Mg', 'Au', 'Li'];
  const COLORS = ['93,124,255', '99,215,209', '126,107,255', '255,181,98', '44,201,145'];
  const BOND_DIST = 150;
  const MOUSE_RADIUS = 170;

  let w = 0, h = 0, dpr = 1;
  let atoms = [];
  let sparks = [];
  let rings = [];
  const mouse = { x: -9999, y: -9999, active: false };
  let running = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.max(18, Math.min(60, Math.round((w * h) / 24000)));
    while (atoms.length < target) atoms.push(makeAtom());
    atoms.length = target;
  }

  function makeAtom() {
    const r = 11 + Math.random() * 14;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r,
      sym: SYMBOLS[(Math.random() * SYMBOLS.length) | 0],
      color: COLORS[(Math.random() * COLORS.length) | 0],
      phase: Math.random() * Math.PI * 2,
      glow: 0,
    };
  }

  function burst(x, y) {
    for (let i = 0; i < 18; i++) {
      const a = (Math.PI * 2 * i) / 18 + Math.random() * 0.3;
      const s = 1.6 + Math.random() * 3.2;
      sparks.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: 1,
        size: 2 + Math.random() * 3,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      });
    }
    rings.push({ x, y, r: 6, life: 1 });
    // ذرة جديدة تولد مكان النقر (ثم يعود العدد لطبيعته تدريجيًا)
    if (atoms.length < 90) {
      const a = makeAtom();
      a.x = x; a.y = y; a.glow = 1;
      a.vx = (Math.random() - 0.5) * 1.6;
      a.vy = (Math.random() - 0.5) * 1.6;
      atoms.push(a);
    }
  }

  function step(t) {
    ctx.clearRect(0, 0, w, h);

    // ضوء ناعم يتبع المؤشر
    if (mouse.active) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
      g.addColorStop(0, 'rgba(93,124,255,0.16)');
      g.addColorStop(0.5, 'rgba(99,215,209,0.07)');
      g.addColorStop(1, 'rgba(99,215,209,0)');
      ctx.fillStyle = g;
      ctx.fillRect(mouse.x - 240, mouse.y - 240, 480, 480);
    }

    const maxAtoms = Math.max(18, Math.min(60, Math.round((w * h) / 24000)));

    // حركة الذرات
    for (let i = atoms.length - 1; i >= 0; i--) {
      const a = atoms[i];
      a.phase += 0.02;
      a.x += a.vx + Math.sin(a.phase) * 0.12;
      a.y += a.vy + Math.cos(a.phase * 0.9) * 0.12;

      if (mouse.active) {
        const dx = a.x - mouse.x, dy = a.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_RADIUS && d > 0.1) {
          const f = (1 - d / MOUSE_RADIUS) * 0.9;
          a.vx += (dx / d) * f * 0.12;   // تنفر برفق
          a.vy += (dy / d) * f * 0.12;
          a.glow = Math.min(1, a.glow + 0.08);
        }
      }
      a.glow *= 0.95;

      // تخفيف السرعة تدريجيًا لتعود للانجراف الهادئ
      a.vx *= 0.992; a.vy *= 0.992;
      const sp = Math.hypot(a.vx, a.vy);
      if (sp < 0.12) { a.vx += (Math.random() - 0.5) * 0.02; a.vy += (Math.random() - 0.5) * 0.02; }

      // الالتفاف حول الحواف
      const m = a.r + 10;
      if (a.x < -m) a.x = w + m; else if (a.x > w + m) a.x = -m;
      if (a.y < -m) a.y = h + m; else if (a.y > h + m) a.y = -m;

      // إزالة الذرات الزائدة التي أنشأها النقر بعد أن يهدأ توهجها
      if (atoms.length > maxAtoms && a.glow < 0.02 && i > maxAtoms - 1) {
        a.r *= 0.97;
        if (a.r < 4) atoms.splice(i, 1);
      }
    }

    // الروابط بين الذرات
    ctx.lineWidth = 1.2;
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const a = atoms[i], b = atoms[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < BOND_DIST) {
          const al = (1 - d / BOND_DIST) * 0.32 + Math.max(a.glow, b.glow) * 0.25;
          ctx.strokeStyle = `rgba(${a.color},${al})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // روابط من المؤشر إلى الذرات القريبة
    if (mouse.active) {
      for (const a of atoms) {
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < MOUSE_RADIUS * 1.25) {
          const al = (1 - d / (MOUSE_RADIUS * 1.25)) * 0.55;
          ctx.strokeStyle = `rgba(${a.color},${al})`;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(a.x, a.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = 'rgba(93,124,255,0.85)';
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // رسم الذرات
    for (const a of atoms) {
      const pulse = 1 + Math.sin(a.phase * 1.4) * 0.04 + a.glow * 0.18;
      const r = a.r * pulse;
      const g = ctx.createRadialGradient(a.x - r * 0.35, a.y - r * 0.35, r * 0.1, a.x, a.y, r);
      g.addColorStop(0, `rgba(255,255,255,${0.85})`);
      g.addColorStop(0.35, `rgba(${a.color},${0.55 + a.glow * 0.3})`);
      g.addColorStop(1, `rgba(${a.color},${0.22 + a.glow * 0.2})`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
      ctx.fill();

      if (a.glow > 0.05) {
        ctx.strokeStyle = `rgba(${a.color},${a.glow * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(a.x, a.y, r + 5 + a.glow * 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (a.r > 9) {
        ctx.fillStyle = 'rgba(28,39,68,0.62)';
        ctx.font = `800 ${Math.round(r * 0.86)}px Cairo, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(a.sym, a.x, a.y + 1);
      }
    }

    // حلقات وشرارات النقر
    for (let i = rings.length - 1; i >= 0; i--) {
      const r = rings[i];
      r.r += 5; r.life -= 0.03;
      if (r.life <= 0) { rings.splice(i, 1); continue; }
      ctx.strokeStyle = `rgba(93,124,255,${r.life * 0.5})`;
      ctx.lineWidth = 2.5 * r.life;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx; s.y += s.vy;
      s.vx *= 0.96; s.vy *= 0.96;
      s.life -= 0.022;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.fillStyle = `rgba(${s.color},${s.life})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      ctx.fill();
    }

    if (running && !reduceMotion) requestAnimationFrame(step);
  }

  // التفاعل
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  }, { passive: true });
  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget) mouse.active = false;
  });
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    mouse.x = t.clientX; mouse.y = t.clientY; mouse.active = true;
  }, { passive: true });
  window.addEventListener('touchend', () => { mouse.active = false; }, { passive: true });

  // نقرة في مساحة فارغة (ليست على زر أو بطاقة) تُطلق الشرارات
  window.addEventListener('pointerdown', (e) => {
    if (reduceMotion) return;
    if (e.target.closest('button, a, input, .element-card, .option-btn, .element-details, .quiz-card')) return;
    burst(e.clientX, e.clientY);
  });

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running && !reduceMotion) requestAnimationFrame(step);
  });

  resize();
  if (reduceMotion) step(0); // لقطة ثابتة لمن يفضّل تقليل الحركة
  else requestAnimationFrame(step);
})();
