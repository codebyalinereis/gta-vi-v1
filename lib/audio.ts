/* ============================================================
   Motor de áudio — WebAudio: rádio sintetizada + SFX de UI
   ============================================================ */

type StationCfg = {
  name: string;
  freq: string;
  bpm: number;
  bars: [number, number][]; // [rootMidi, isMajor]
  kick: number[];
  snare: number[];
  hatEvery: number;
  hatGain: number;
  bassSteps: number[];
  bassOctSteps: number[];
  bassLong?: boolean;
  bassWave: OscillatorType;
  bassGain: number;
  bassCut: number;
  pad: boolean;
  padStab?: boolean;
  padWave: OscillatorType;
  padGain: number;
  cutoff: number;
  pluckScale: number[];
  pluckRate: number;
  pluckWave: OscillatorType;
  pluckGain: number;
};

const STATIONS: Record<string, StationCfg> = {
  neon: {
    name: "Neon 96", freq: "96.0 FM", bpm: 100,
    bars: [[57, 0], [53, 1], [48, 1], [55, 1]],
    kick: [0, 4, 8, 12], snare: [], hatEvery: 2, hatGain: 0.045,
    bassSteps: [0, 2, 4, 6, 8, 10, 12, 14], bassOctSteps: [6, 14],
    bassWave: "sawtooth", bassGain: 0.13, bassCut: 700,
    pad: true, padWave: "sawtooth", padGain: 0.045, cutoff: 1200,
    pluckScale: [0, 3, 5, 7, 10], pluckRate: 0.42, pluckWave: "square", pluckGain: 0.045,
  },
  mamba: {
    name: "Mamba FM", freq: "103.5 FM", bpm: 96,
    bars: [[45, 0], [41, 1], [48, 1], [43, 1]],
    kick: [0, 8], snare: [3, 6, 11, 14], hatEvery: 2, hatGain: 0.035,
    bassSteps: [0, 6, 8, 14], bassOctSteps: [],
    bassWave: "triangle", bassGain: 0.2, bassCut: 500,
    pad: true, padStab: true, padWave: "square", padGain: 0.03, cutoff: 900,
    pluckScale: [0, 3, 5, 7, 10, 12], pluckRate: 0.2, pluckWave: "triangle", pluckGain: 0.05,
  },
  baile: {
    name: "Baile 105", freq: "105.9 FM", bpm: 132,
    bars: [[45, 0], [45, 0], [41, 1], [43, 1]],
    kick: [0, 3, 6, 8, 11, 14], snare: [], hatEvery: 1, hatGain: 0.028,
    bassSteps: [0, 8], bassOctSteps: [], bassLong: true,
    bassWave: "sine", bassGain: 0.3, bassCut: 400,
    pad: false, padWave: "sine", padGain: 0, cutoff: 900,
    pluckScale: [0, 3, 7, 10, 12, 15], pluckRate: 0.5, pluckWave: "square", pluckGain: 0.04,
  },
  kfly: {
    name: "K-Fly", freq: "91.3 FM", bpm: 112,
    bars: [[50, 0], [48, 1], [53, 1], [55, 1]],
    kick: [0, 4, 8, 12], snare: [4, 12], hatEvery: 2, hatGain: 0.05,
    bassSteps: [0, 3, 6, 8, 11, 14], bassOctSteps: [3, 11],
    bassWave: "triangle", bassGain: 0.18, bassCut: 600,
    pad: true, padWave: "triangle", padGain: 0.04, cutoff: 1600,
    pluckScale: [0, 2, 3, 5, 7, 9, 10], pluckRate: 0.3, pluckWave: "sine", pluckGain: 0.055,
  },
};

const CHORD = (maj: boolean) => (maj ? [0, 4, 7, 11] : [0, 3, 7, 10]);
const m2f = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

class AudioEngine {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  analyser: AnalyserNode | null = null;
  noiseBuf: AudioBuffer | null = null;
  soundOn = true;
  private playing: { id: string; cfg: StationCfg; bus: GainNode; step: number; nextTime: number; timer: number } | null = null;
  private listeners = new Set<() => void>();
  private stepDur = 0.15;

  constructor() {
    try { this.soundOn = (localStorage.getItem("gtavi-sound") ?? "1") === "1"; } catch { /* noop */ }
  }

  ensure() {
    if (this.ctx) return this.ctx;
    const AC = (typeof window !== "undefined" && (window.AudioContext || (window as any).webkitAudioContext)) as typeof AudioContext | undefined;
    if (!AC) return null;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    const lp = this.ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 9500;
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.analyser.smoothingTimeConstant = 0.78;
    this.master.connect(lp);
    lp.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    this.noiseBuf = this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return this.ctx;
  }

  onChange(cb: () => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private emit() { this.listeners.forEach((cb) => cb()); }

  get stationId() { return this.playing?.id ?? null; }

  toggleSound() {
    this.soundOn = !this.soundOn;
    try { localStorage.setItem("gtavi-sound", this.soundOn ? "1" : "0"); } catch { /* noop */ }
    if (this.soundOn) { this.ensure(); this.blip(660, 0.08, 0.05, "sine"); }
    this.emit();
  }

  blip(freq = 520, dur = 0.07, vol = 0.05, type: OscillatorType = "triangle") {
    if (!this.soundOn || !this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.03);
  }

  jingle(big = false) {
    const notes = big ? [523, 659, 784, 1046, 1318] : [523, 659, 784, 1046];
    notes.forEach((f, i) => setTimeout(() => this.blip(f, 0.16, 0.06, "sine"), i * 90));
  }

  siren() {
    if (!this.soundOn) return;
    this.ensure();
    [700, 520, 700, 520, 700, 520].forEach((f, i) => setTimeout(() => this.blip(f, 0.14, 0.045, "square"), i * 150));
  }

  whoosh(dur = 0.5, vol = 0.06) {
    if (!this.soundOn || !this.ctx || !this.master || !this.noiseBuf) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(300, t);
    bp.frequency.exponentialRampToValueAtTime(2400, t + dur * 0.6);
    bp.Q.value = 1.2;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp); bp.connect(g); g.connect(this.master);
    src.start(t); src.stop(t + dur + 0.05);
  }

  /* ---------- rádio ---------- */

  private vKick(t: number, dest: AudioNode) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    g.gain.setValueAtTime(0.85, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + 0.26);
  }

  private vHat(t: number, dest: AudioNode, gain: number) {
    if (!this.ctx || !this.noiseBuf) return;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    const f = this.ctx.createBiquadFilter();
    f.type = "highpass"; f.frequency.value = 7500;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0005, t + 0.05);
    s.connect(f); f.connect(g); g.connect(dest);
    s.start(t); s.stop(t + 0.07);
  }

  private vSnare(t: number, dest: AudioNode) {
    if (!this.ctx || !this.noiseBuf) return;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass"; f.frequency.value = 1900; f.Q.value = 0.8;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.16, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    s.connect(f); f.connect(g); g.connect(dest);
    s.start(t); s.stop(t + 0.2);
  }

  private vBass(t: number, midi: number, cfg: StationCfg, dest: AudioNode) {
    if (!this.ctx) return;
    const dur = cfg.bassLong ? this.stepDur * 5.5 : this.stepDur * 1.7;
    const o = this.ctx.createOscillator();
    o.type = cfg.bassWave;
    o.frequency.value = m2f(midi);
    const f = this.ctx.createBiquadFilter();
    f.type = "lowpass"; f.frequency.value = cfg.bassCut;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(cfg.bassGain, t + 0.012);
    g.gain.setTargetAtTime(0.0001, t + dur * 0.6, 0.09);
    o.connect(f); f.connect(g); g.connect(dest);
    o.start(t); o.stop(t + dur + 0.3);
  }

  private vPad(t: number, notes: number[], cfg: StationCfg, dest: AudioNode, dur: number) {
    if (!this.ctx) return;
    const lp = this.ctx.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = cfg.cutoff;
    lp.connect(dest);
    const stab = !!cfg.padStab;
    notes.forEach((n) => {
      for (let d = -1; d <= 1; d += 2) {
        const o = this.ctx!.createOscillator();
        o.type = cfg.padWave;
        o.frequency.value = m2f(n);
        o.detune.value = d * 7;
        const g = this.ctx!.createGain();
        const atk = stab ? 0.012 : Math.min(0.6, dur * 0.22);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(cfg.padGain / notes.length, t + atk);
        g.gain.setTargetAtTime(0.0001, t + dur * 0.75, 0.18);
        o.connect(g); g.connect(lp);
        o.start(t); o.stop(t + dur + 0.4);
      }
    });
  }

  private vPluck(t: number, midi: number, cfg: StationCfg, dest: AudioNode) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    o.type = cfg.pluckWave;
    o.frequency.value = m2f(midi);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(cfg.pluckGain, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0004, t + 0.19);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + 0.22);
  }

  private scheduleStep(step: number, t: number) {
    if (!this.playing || !this.ctx) return;
    const cfg = this.playing.cfg;
    const sd = 60 / cfg.bpm / 4;
    this.stepDur = sd;
    const s = step % 16;
    const bar = Math.floor(step / 16) % cfg.bars.length;
    const [root, maj] = cfg.bars[bar];
    if (cfg.kick.includes(s)) this.vKick(t, this.playing.bus);
    if (cfg.snare.includes(s)) this.vSnare(t, this.playing.bus);
    if (s % cfg.hatEvery === 0) this.vHat(t, this.playing.bus, cfg.hatGain);
    if (cfg.bassSteps.includes(s)) {
      const oct = cfg.bassOctSteps.includes(s) ? 12 : 0;
      this.vBass(t, root - 12 + oct, cfg, this.playing.bus);
    }
    if (cfg.pad && s === 0) {
      const ints = CHORD(!!maj);
      this.vPad(t, ints.map((i) => root + i), cfg, this.playing.bus, 16 * sd);
    }
    if (s % 2 === 0 && Math.random() < cfg.pluckRate) {
      const sc = cfg.pluckScale;
      this.vPluck(t, root + 12 + sc[Math.floor(Math.random() * sc.length)], cfg, this.playing.bus);
    }
  }

  startStation(id: string) {
    this.ensure();
    if (!this.ctx || !this.master) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    if (this.playing && this.playing.id === id) { this.stopStation(); return; }
    this.stopStation(true);
    const cfg = STATIONS[id];
    if (!cfg) return;
    const bus = this.ctx.createGain();
    bus.gain.value = 0.85;
    bus.connect(this.master);
    this.playing = { id, cfg, bus, step: 0, nextTime: this.ctx.currentTime + 0.08, timer: 0 };
    this.playing.timer = window.setInterval(() => {
      if (!this.playing || !this.ctx) return;
      const ahead = this.ctx.currentTime + 0.14;
      while (this.playing.nextTime < ahead) {
        this.scheduleStep(this.playing.step, this.playing.nextTime);
        this.playing.nextTime += 60 / this.playing.cfg.bpm / 4;
        this.playing.step++;
      }
    }, 25);
    this.emit();
  }

  stopStation(silent = false) {
    if (!this.playing) return;
    window.clearInterval(this.playing.timer);
    const b = this.playing.bus;
    if (this.ctx) {
      const t = this.ctx.currentTime;
      b.gain.setTargetAtTime(0, t, 0.06);
      setTimeout(() => { try { b.disconnect(); } catch { /* noop */ } }, 450);
    }
    this.playing = null;
    if (!silent) this.emit();
  }
}

export const audio = new AudioEngine();
