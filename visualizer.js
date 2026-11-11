'use strict';
(() => {
  const canvas = document.getElementById('live-wave');
  const audio = document.getElementById('audio');
  const label = document.getElementById('visualizer-state');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let context, analyser, source, samples, spectrum;
  let width = 0, height = 0, frame = 0, lastStat = 0;
  let overview = window.WANTED_PLAYLIST[0].waveform;
  let displayGain = window.WANTED_PLAYLIST[0].visualGain || 2.8;
  let smoothedEnergy = 0;
  const live = () => analyser && !audio.paused && !audio.ended && !reduced.matches && !document.hidden;

  function grid() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = .5;
    ctx.strokeStyle = 'rgba(177,194,167,.09)';
    ctx.beginPath();
    for (let x = 8; x < width; x += (width - 16) / 8) { ctx.moveTo(x, 29); ctx.lineTo(x, height - 22); }
    ctx.moveTo(8, height * .52); ctx.lineTo(width - 8, height * .52);
    ctx.stroke();
  }

  function still() {
    if (!width || !height) return;
    grid();
    const centre = height * .52;
    const step = (width - 16) / overview.length;
    ctx.fillStyle = 'rgba(190,203,175,.30)';
    overview.forEach((value, i) => { const h = 2 + value * height * .24; ctx.fillRect(8 + i * step, centre - h / 2, Math.max(1, step * .35), h); });
    canvas.dataset.mode = 'still';
    canvas.dataset.energy = '0';
    label.textContent = audio.paused || audio.ended ? 'AWAITING A WEE LISTEN' : reduced.matches ? 'PLAYING / STILL VIEW' : 'RECORDING OVERVIEW';
    document.documentElement.style.setProperty('--sound-energy', '0');
  }

  function draw(timestamp) {
    frame = 0;
    if (!live()) { still(); return; }
    analyser.getFloatTimeDomainData(samples);
    analyser.getByteFrequencyData(spectrum);
    let sum = 0;
    for (const value of samples) sum += value * value;
    const rms = Math.sqrt(sum / samples.length);
    smoothedEnergy = smoothedEnergy * .72 + Math.min(1, rms * displayGain * 2.5) * .28;
    grid();
    const centre = height * .52;
    // Fixed per-recording gain and a display-only amplitude curve make quiet
    // field recordings visible without changing the audio signal.
    // Quiet passages stay small; no random movement is added.
    const count = 420;
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const sample = samples[Math.floor(i / (count - 1) * (samples.length - 1))];
      const envelope = Math.sin(Math.PI * i / (count - 1)) ** .3;
      const amplitude = Math.sign(sample) * Math.sqrt(Math.abs(sample * displayGain)) * .7;
      const displacement = Math.max(-.37, Math.min(.37, amplitude)) * height * envelope;
      const x = 8 + i / (count - 1) * (width - 16);
      const y = centre + displacement;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.strokeStyle = `rgba(236,171,128,${.64 + smoothedEnergy * .36})`;
    ctx.lineWidth = 1.15;
    ctx.shadowColor = '#e8a276';
    ctx.shadowBlur = 7 + smoothedEnergy * 11;
    ctx.stroke();
    ctx.shadowBlur = 0;
    // A second, quieter layer shows the same recording's frequency energy.
    const bins = 82;
    const step = (width - 16) / bins;
    ctx.fillStyle = `rgba(201,218,187,${.08 + smoothedEnergy * .11})`;
    for (let i = 0; i < bins; i++) {
      const bin = Math.floor((i / bins) ** 2 * (spectrum.length * .62));
      const h = spectrum[bin] / 255 * height * .37;
      ctx.fillRect(8 + i * step, centre - h / 2, 1, h);
    }
    if (timestamp - lastStat > 140) {
      canvas.dataset.mode = 'live';
      canvas.dataset.energy = rms.toFixed(5);
      document.documentElement.style.setProperty('--sound-energy', smoothedEnergy.toFixed(3));
      lastStat = timestamp;
    }
    label.textContent = 'LIVE / ALL EARS';
    frame = requestAnimationFrame(draw);
  }

  function refresh() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (live()) frame = requestAnimationFrame(draw); else still();
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    refresh();
  }

  window.WantedVisualizer = {
    connect() {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return Promise.resolve();
      if (!context) {
        context = new AudioContextClass();
        analyser = context.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = .76;
        samples = new Float32Array(analyser.fftSize);
        spectrum = new Uint8Array(analyser.frequencyBinCount);
        source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
      }
      return context.resume().then(refresh);
    },
    setTrack(values, gain) { overview = values; displayGain = gain || 2.8; refresh(); }
  };
  audio.addEventListener('play', refresh);
  audio.addEventListener('pause', refresh);
  audio.addEventListener('ended', refresh);
  audio.addEventListener('error', refresh);
  document.addEventListener('visibilitychange', refresh);
  reduced.addEventListener('change', refresh);
  new ResizeObserver(resize).observe(canvas);
  resize();
})();
