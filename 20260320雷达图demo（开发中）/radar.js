(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function clampInt(value, min, max) {
    const n = Number(value);
    if (!Number.isFinite(n)) return min;
    const i = Math.trunc(n);
    return Math.max(min, Math.min(max, i));
  }

  function degToRad(deg) {
    return (deg * Math.PI) / 180;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function createSvgEl(tag, attrs = {}) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined) continue;
      el.setAttribute(k, String(v));
    }
    return el;
  }

  function pointsToPath(points) {
    if (!points.length) return '';
    const [first, ...rest] = points;
    let d = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
    for (const p of rest) d += ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    d += ' Z';
    return d;
  }

  function polar(cx, cy, r, angleRad) {
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  }

  function axisTickLayout(axisIndex) {
    // 0:顶 1:右上 2:右下 3:左下 4:左上
    switch (axisIndex) {
      case 0:
        return { dx: 12, dy: 4, anchor: 'start', baseline: 'middle' };
      case 1:
        return { dx: 0, dy: 16, anchor: 'middle', baseline: 'hanging' };
      case 2:
        return { dx: 12, dy: 4, anchor: 'start', baseline: 'middle' };
      case 3:
        return { dx: -12, dy: 4, anchor: 'end', baseline: 'middle' };
      case 4:
        return { dx: 0, dy: 16, anchor: 'middle', baseline: 'hanging' };
      default:
        return { dx: 10, dy: 0, anchor: 'start', baseline: 'middle' };
    }
  }

  function axisLabelLayout(angleRad) {
    const vx = Math.cos(angleRad);
    const vy = Math.sin(angleRad);

    let anchor = 'middle';
    if (vx > 0.35) anchor = 'start';
    else if (vx < -0.35) anchor = 'end';

    let baseline = 'middle';
    if (vy > 0.35) baseline = 'hanging';
    else if (vy < -0.35) baseline = 'alphabetic';

    return { anchor, baseline };
  }

  function createRadar(svg, userConfig = {}) {
    const config = {
      size: 800,
      padding: 128,
      levels: 5,
      startAngleDeg: -90,
      axisLabelOffset: 36,
      pointRadiusBg: 6,
      pointRadiusDataLevel: 7,
      pointRadiusVertex: 8,
      pointRadiusCenter: 7,
      animation: { duration: 300 },
      axes: [
        { key: 'a1', name: '能力1', max: 5 },
        { key: 'a2', name: '能力2', max: 5 },
        { key: 'a3', name: '能力3', max: 5 },
        { key: 'a4', name: '能力4', max: 5 },
        { key: 'a5', name: '能力5', max: 5 },
      ],
      ...userConfig,
    };

    const axisCount = config.axes.length;
    if (axisCount !== 5) {
      throw new Error('当前 demo 仅支持 5 个维度（正五边形）。');
    }

    const cx = config.size / 2;
    const cy = config.size / 2;
    const rMax = config.size / 2 - config.padding;
    const startAngle = degToRad(config.startAngleDeg);
    const step = (Math.PI * 2) / axisCount;
    const angles = Array.from({ length: axisCount }, (_, i) => startAngle + i * step);

    svg.setAttribute('viewBox', `0 0 ${config.size} ${config.size}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute('focusable', 'false');
    svg.textContent = '';

    const gBgRings = createSvgEl('g', { class: 'bg-rings' });
    const gBgAxes = createSvgEl('g', { class: 'bg-axes' });
    const gBgPoints = createSvgEl('g', { class: 'bg-points' });
    const gTicks = createSvgEl('g', { class: 'bg-ticks' });
    const gAxisLabels = createSvgEl('g', { class: 'axis-labels' });

    const gData = createSvgEl('g', { class: 'data' });
    const gDataShape = createSvgEl('g', { class: 'data-shape is-empty' });
    const dataArea = createSvgEl('path', { class: 'data-area' });
    gDataShape.appendChild(dataArea);

    const gDataLevels = createSvgEl('g', { class: 'data-levels' });
    const gDataVertices = createSvgEl('g', { class: 'data-vertices' });
    const dataCenter = createSvgEl('circle', {
      class: 'data-center',
      cx,
      cy,
      r: config.pointRadiusCenter,
    });

    gData.appendChild(gDataShape);
    gData.appendChild(gDataLevels);
    gData.appendChild(gDataVertices);
    gData.appendChild(dataCenter);

    // 层级：先背景，再数据，再文本（确保数字/维度名不被半透明填充盖住）
    svg.appendChild(gBgRings);
    svg.appendChild(gBgAxes);
    svg.appendChild(gBgPoints);
    svg.appendChild(gData);
    svg.appendChild(gTicks);
    svg.appendChild(gAxisLabels);

    // 背景环（5 层）
    for (let k = 1; k <= config.levels; k++) {
      const r = rMax * (k / config.levels);
      const ringPoints = angles.map((a) => polar(cx, cy, r, a));
      const path = createSvgEl('path', { d: pointsToPath(ringPoints) });
      gBgRings.appendChild(path);
    }

    // 轴线（中心到外圈）
    for (let i = 0; i < axisCount; i++) {
      const end = polar(cx, cy, rMax, angles[i]);
      const line = createSvgEl('line', {
        x1: cx,
        y1: cy,
        x2: end.x,
        y2: end.y,
      });
      gBgAxes.appendChild(line);
    }

    // 背景点（每轴每层）
    const bgPoints = Array.from({ length: axisCount }, () => []);
    for (let i = 0; i < axisCount; i++) {
      for (let k = 1; k <= config.levels; k++) {
        const r = rMax * (k / config.levels);
        const p = polar(cx, cy, r, angles[i]);
        const c = createSvgEl('circle', {
          cx: p.x,
          cy: p.y,
          r: config.pointRadiusBg,
        });
        gBgPoints.appendChild(c);
        bgPoints[i].push(p);
      }
    }

    // 刻度数字（1级~5级）
    for (let i = 0; i < axisCount; i++) {
      const layout = axisTickLayout(i);
      for (let k = 1; k <= config.levels; k++) {
        const p = bgPoints[i][k - 1];
        const t = createSvgEl('text', {
          class: 'tick-text',
          x: p.x + layout.dx,
          y: p.y + layout.dy,
          'text-anchor': layout.anchor,
          'dominant-baseline': layout.baseline,
        });
        t.textContent = `${k}级`;
        gTicks.appendChild(t);
      }
    }

    // 维度名称（能力1~能力5）
    for (let i = 0; i < axisCount; i++) {
      const a = angles[i];
      const p = polar(cx, cy, rMax + config.axisLabelOffset, a);
      const { anchor, baseline } = axisLabelLayout(a);
      const t = createSvgEl('text', {
        class: 'axis-label',
        x: p.x,
        y: p.y,
        'text-anchor': anchor,
        'dominant-baseline': baseline,
      });
      t.textContent = config.axes[i].name;
      gAxisLabels.appendChild(t);
    }

    // 数据层：点亮刻度点（每轴每层）
    const levelCircles = Array.from({ length: axisCount }, () => []);
    for (let i = 0; i < axisCount; i++) {
      for (let k = 1; k <= config.levels; k++) {
        const p = bgPoints[i][k - 1];
        const c = createSvgEl('circle', {
          cx: p.x,
          cy: p.y,
          r: config.pointRadiusDataLevel,
        });
        gDataLevels.appendChild(c);
        levelCircles[i].push(c);
      }
    }

    // 数据层：顶点（强调当前值）
    const vertexCircles = [];
    for (let i = 0; i < axisCount; i++) {
      const c = createSvgEl('circle', {
        cx,
        cy,
        r: config.pointRadiusVertex,
      });
      gDataVertices.appendChild(c);
      vertexCircles.push(c);
    }

    let currentT = new Array(axisCount).fill(0);
    let lastValues = new Array(axisCount).fill(0);
    let rafId = 0;

    function render(ts) {
      const vertices = ts.map((t, i) => polar(cx, cy, rMax * t, angles[i]));
      dataArea.setAttribute('d', pointsToPath(vertices));

      for (let i = 0; i < axisCount; i++) {
        const v = lastValues[i];
        const c = vertexCircles[i];
        c.setAttribute('cx', vertices[i].x.toFixed(2));
        c.setAttribute('cy', vertices[i].y.toFixed(2));
        c.classList.toggle('is-on', v > 0);
      }
    }

    function setValues(values = {}, options = {}) {
      const animate = options.animate !== false;
      const targetValues = config.axes.map((a) => clampInt(values[a.key] ?? 0, 0, a.max));
      const targetT = targetValues.map((v, i) => v / config.axes[i].max);

      // 点亮刻度：1..v
      for (let i = 0; i < axisCount; i++) {
        const v = targetValues[i];
        for (let k = 1; k <= config.levels; k++) {
          const c = levelCircles[i][k - 1];
          c.classList.toggle('is-on', k <= v);
        }
      }

      const isAllZero = targetValues.every((v) => v === 0);
      gDataShape.classList.toggle('is-empty', isAllZero);

      const startT = currentT.slice();
      const duration = Math.max(0, Number(config.animation?.duration ?? 300));
      const t0 = performance.now();

      lastValues = targetValues.slice();

      if (!animate || duration === 0) {
        currentT = targetT.slice();
        render(currentT);
        return;
      }

      if (rafId) cancelAnimationFrame(rafId);
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        const e = easeOutCubic(p);
        const nextT = startT.map((s, i) => s + (targetT[i] - s) * e);
        currentT = nextT;
        render(currentT);
        if (p < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    // 初始渲染
    render(currentT);

    return { setValues };
  }

  // Demo
  const svg = document.getElementById('radar');
  const radar = createRadar(svg);

  function randomValues() {
    return {
      a1: Math.floor(Math.random() * 6),
      a2: Math.floor(Math.random() * 6),
      a3: Math.floor(Math.random() * 6),
      a4: Math.floor(Math.random() * 6),
      a5: Math.floor(Math.random() * 6),
    };
  }

  let current = { a1: 3, a2: 2, a3: 4, a4: 5, a5: 1 };
  radar.setValues(current, { animate: false });

  const valuesEl = document.getElementById('values');
  const renderValues = () => {
    valuesEl.textContent = `能力1~5：${[current.a1, current.a2, current.a3, current.a4, current.a5].join(', ')}`;
  };
  renderValues();

  document.getElementById('btn-random').addEventListener('click', () => {
    current = randomValues();
    renderValues();
    radar.setValues(current);
  });

  document.getElementById('btn-zero').addEventListener('click', () => {
    current = { a1: 0, a2: 0, a3: 0, a4: 0, a5: 0 };
    renderValues();
    radar.setValues(current);
  });
})();
