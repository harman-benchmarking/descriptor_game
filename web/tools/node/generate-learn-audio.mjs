import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sampleRate = 44100;
const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const outputDir = resolve(webRoot, "app", "public", "audio", "demo", "learn");

function createRng(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let mixed = value;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function note(name) {
  const notes = { C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11 };
  const match = /^([A-G]#?)(-?\d)$/.exec(name);
  if (!match) throw new Error(`Invalid note: ${name}`);
  const semitone = notes[match[1]];
  const octave = Number(match[2]);
  const midi = (octave + 1) * 12 + semitone;
  return 440 * 2 ** ((midi - 69) / 12);
}

function makeStereo(seconds) {
  const length = Math.round(seconds * sampleRate);
  return {
    left: new Float32Array(length),
    right: new Float32Array(length)
  };
}

function panGains(pan = 0) {
  const angle = ((pan + 1) * Math.PI) / 4;
  return { left: Math.cos(angle), right: Math.sin(angle) };
}

function envelope(t, duration, attack = 0.01, release = 0.08) {
  if (t < attack) return t / attack;
  const tail = duration - t;
  if (tail < release) return Math.max(0, tail / release);
  return 1;
}

function addTone(buffer, start, duration, frequency, amplitude, options = {}) {
  const startIndex = Math.max(0, Math.floor(start * sampleRate));
  const endIndex = Math.min(buffer.left.length, Math.floor((start + duration) * sampleRate));
  const pan = panGains(options.pan ?? 0);
  const attack = options.attack ?? 0.01;
  const release = options.release ?? 0.1;
  const partials = options.partials ?? [1];
  const detune = options.detune ?? 0;
  const vibratoDepth = options.vibratoDepth ?? 0;
  const vibratoRate = options.vibratoRate ?? 5;

  for (let index = startIndex; index < endIndex; index += 1) {
    const localTime = index / sampleRate - start;
    const env = envelope(localTime, duration, attack, release);
    const vibrato = 1 + vibratoDepth * Math.sin(2 * Math.PI * vibratoRate * localTime);
    let sample = 0;

    partials.forEach((partial, partialIndex) => {
      const harmonic = partialIndex + 1;
      sample += partial * Math.sin(2 * Math.PI * frequency * harmonic * vibrato * localTime + detune * partialIndex);
    });

    const value = sample * amplitude * env;
    buffer.left[index] += value * pan.left;
    buffer.right[index] += value * pan.right;
  }
}

function addNoise(buffer, start, duration, amplitude, options = {}) {
  const rng = options.rng ?? createRng(1);
  const startIndex = Math.max(0, Math.floor(start * sampleRate));
  const endIndex = Math.min(buffer.left.length, Math.floor((start + duration) * sampleRate));
  const pan = panGains(options.pan ?? 0);
  const attack = options.attack ?? 0.002;
  const release = options.release ?? 0.04;

  for (let index = startIndex; index < endIndex; index += 1) {
    const localTime = index / sampleRate - start;
    const env = envelope(localTime, duration, attack, release);
    const brightness = options.bright ? Math.sin(2 * Math.PI * 8300 * localTime) * 0.2 : 0;
    const sample = ((rng() * 2 - 1) + brightness) * amplitude * env;
    buffer.left[index] += sample * pan.left;
    buffer.right[index] += sample * pan.right;
  }
}

function addKick(buffer, start, amplitude = 0.75) {
  const duration = 0.32;
  const startIndex = Math.max(0, Math.floor(start * sampleRate));
  const endIndex = Math.min(buffer.left.length, Math.floor((start + duration) * sampleRate));

  for (let index = startIndex; index < endIndex; index += 1) {
    const t = index / sampleRate - start;
    const env = Math.exp(-10 * t);
    const frequency = 52 + 58 * Math.exp(-22 * t);
    const click = t < 0.012 ? Math.sin(2 * Math.PI * 1600 * t) * (1 - t / 0.012) * 0.08 : 0;
    const sample = (Math.sin(2 * Math.PI * frequency * t) * env + click) * amplitude;
    buffer.left[index] += sample * 0.72;
    buffer.right[index] += sample * 0.72;
  }
}

function addSnare(buffer, start, rng, amplitude = 0.35) {
  addTone(buffer, start, 0.18, 185, amplitude * 0.4, { attack: 0.002, release: 0.12 });
  addNoise(buffer, start, 0.16, amplitude, { rng, attack: 0.002, release: 0.12, bright: true });
}

function addHat(buffer, start, rng, amplitude = 0.11, pan = 0.25) {
  addNoise(buffer, start, 0.055, amplitude, { rng, attack: 0.001, release: 0.035, bright: true, pan });
}

function addBass(buffer, start, duration, frequency, amplitude = 0.28) {
  addTone(buffer, start, duration, frequency, amplitude, {
    attack: 0.008,
    release: 0.08,
    partials: [1, 0.34, 0.12]
  });
}

function addPluck(buffer, start, duration, frequency, amplitude = 0.16, pan = 0) {
  addTone(buffer, start, duration, frequency, amplitude, {
    attack: 0.004,
    release: duration * 0.9,
    pan,
    partials: [1, 0.55, 0.24, 0.12],
    detune: 0.15
  });
}

function addChord(buffer, start, duration, notes, amplitude = 0.12, pan = 0) {
  notes.forEach((frequency, index) => {
    addPluck(buffer, start + index * 0.018, duration, frequency, amplitude, pan + (index - 1) * 0.08);
  });
}

function addSoftRoom(buffer, delayMs = 34, amount = 0.08) {
  const delay = Math.round((delayMs / 1000) * sampleRate);
  for (let index = delay; index < buffer.left.length; index += 1) {
    buffer.left[index] += buffer.right[index - delay] * amount;
    buffer.right[index] += buffer.left[index - delay] * amount;
  }
}

function addVowel(buffer, start, duration, pitch, formants, amplitude = 0.12) {
  addTone(buffer, start, duration, pitch, amplitude * 0.6, {
    attack: 0.025,
    release: 0.08,
    partials: [1, 0.7, 0.35, 0.18],
    vibratoDepth: 0.004,
    vibratoRate: 4.8
  });
  formants.forEach(([frequency, level]) => {
    addTone(buffer, start, duration, frequency, amplitude * level, {
      attack: 0.018,
      release: 0.07,
      partials: [1],
      vibratoDepth: 0.002,
      vibratoRate: 3.5
    });
  });
}

function addClickyConsonant(buffer, start, rng, amplitude = 0.06) {
  addNoise(buffer, start, 0.035, amplitude, { rng, attack: 0.001, release: 0.02, bright: true });
}

function normalize(buffer, targetPeak = 0.86) {
  let peak = 0;
  for (let index = 0; index < buffer.left.length; index += 1) {
    peak = Math.max(peak, Math.abs(buffer.left[index]), Math.abs(buffer.right[index]));
  }
  const gain = peak > targetPeak ? targetPeak / peak : 1;
  for (let index = 0; index < buffer.left.length; index += 1) {
    buffer.left[index] *= gain;
    buffer.right[index] *= gain;
  }
}

function writeWav(fileName, buffer) {
  normalize(buffer);
  const frameCount = buffer.left.length;
  const bytesPerSample = 2;
  const channelCount = 2;
  const blockAlign = channelCount * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = frameCount * blockAlign;
  const wav = Buffer.alloc(44 + dataSize);

  wav.write("RIFF", 0);
  wav.writeUInt32LE(36 + dataSize, 4);
  wav.write("WAVE", 8);
  wav.write("fmt ", 12);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(channelCount, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(byteRate, 28);
  wav.writeUInt16LE(blockAlign, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(dataSize, 40);

  for (let index = 0; index < frameCount; index += 1) {
    const left = Math.max(-1, Math.min(1, buffer.left[index]));
    const right = Math.max(-1, Math.min(1, buffer.right[index]));
    wav.writeInt16LE(Math.round(left * 32767), 44 + index * 4);
    wav.writeInt16LE(Math.round(right * 32767), 46 + index * 4);
  }

  writeFileSync(resolve(outputDir, fileName), wav);
}

function generateDrumBassGroove() {
  const buffer = makeStereo(16);
  const rng = createRng(1001);
  const bpm = 96;
  const beat = 60 / bpm;
  const bassPattern = [note("A1"), note("A1"), note("E2"), note("G1"), note("A1"), note("C2"), note("E2"), note("G1")];

  for (let step = 0; step < 32; step += 1) {
    const time = step * beat * 0.5;
    addHat(buffer, time, rng, step % 2 === 0 ? 0.09 : 0.07, 0.22);
  }

  for (let beatIndex = 0; beatIndex < 26; beatIndex += 1) {
    const time = beatIndex * beat;
    if (beatIndex % 4 === 0 || beatIndex % 4 === 2) addKick(buffer, time, 0.68);
    if (beatIndex % 4 === 1 || beatIndex % 4 === 3) addSnare(buffer, time, rng, 0.22);
    const bassFrequency = bassPattern[beatIndex % bassPattern.length];
    addBass(buffer, time, beat * 0.78, bassFrequency, 0.23);
  }

  addSoftRoom(buffer, 22, 0.035);
  return buffer;
}

function generateAcousticPop() {
  const buffer = makeStereo(16);
  const rng = createRng(2002);
  const bpm = 92;
  const beat = 60 / bpm;
  const chords = [
    [note("A2"), note("C3"), note("E3"), note("A3")],
    [note("F2"), note("A2"), note("C3"), note("F3")],
    [note("C3"), note("E3"), note("G3"), note("C4")],
    [note("G2"), note("B2"), note("D3"), note("G3")]
  ];
  const melody = [note("E4"), note("G4"), note("A4"), note("G4"), note("E4"), note("D4"), note("C4"), note("E4")];

  chords.forEach((chord, chordIndex) => {
    const start = chordIndex * 4 * beat;
    addChord(buffer, start, beat * 2.5, chord, 0.105, -0.22);
    addChord(buffer, start + beat * 2, beat * 1.8, chord.slice().reverse(), 0.085, 0.18);
    addBass(buffer, start, beat * 3.4, chord[0] / 2, 0.18);
  });

  for (let beatIndex = 0; beatIndex < 25; beatIndex += 1) {
    const time = beatIndex * beat;
    if (beatIndex % 4 === 0) addKick(buffer, time, 0.32);
    if (beatIndex % 4 === 2) addSnare(buffer, time, rng, 0.16);
    addHat(buffer, time + beat * 0.5, rng, 0.055, 0.3);
  }

  melody.forEach((frequency, index) => {
    addTone(buffer, index * beat * 1.5 + 0.12, beat * 1.1, frequency, 0.055, {
      attack: 0.04,
      release: 0.18,
      pan: 0.05,
      partials: [1, 0.22],
      vibratoDepth: 0.003,
      vibratoRate: 5.2
    });
  });

  addSoftRoom(buffer, 28, 0.055);
  return buffer;
}

function generatePianoGuitar() {
  const buffer = makeStereo(14);
  const bpm = 100;
  const beat = 60 / bpm;
  const arpeggios = [
    [note("C3"), note("E3"), note("G3"), note("D4")],
    [note("A2"), note("E3"), note("A3"), note("C4")],
    [note("F2"), note("C3"), note("A3"), note("E4")],
    [note("G2"), note("D3"), note("B3"), note("F4")]
  ];

  for (let bar = 0; bar < 6; bar += 1) {
    const chord = arpeggios[bar % arpeggios.length];
    chord.forEach((frequency, index) => {
      const time = bar * 2 * beat + index * beat * 0.5;
      addPluck(buffer, time, beat * 1.8, frequency, 0.12, index % 2 === 0 ? -0.18 : 0.18);
      addTone(buffer, time, beat * 1.4, frequency * 2, 0.025, {
        attack: 0.003,
        release: beat * 1.1,
        pan: index % 2 === 0 ? 0.18 : -0.18,
        partials: [1, 0.3]
      });
    });
  }

  addSoftRoom(buffer, 42, 0.07);
  return buffer;
}

function generateSpokenCenter() {
  const buffer = makeStereo(14);
  const rng = createRng(3003);
  const syllables = [
    { start: 0.35, duration: 0.38, pitch: note("A2"), formants: [[620, 0.32], [1200, 0.12], [2450, 0.06]] },
    { start: 0.82, duration: 0.32, pitch: note("B2"), formants: [[430, 0.25], [1850, 0.14], [2550, 0.06]] },
    { start: 1.25, duration: 0.44, pitch: note("A2"), formants: [[730, 0.3], [1100, 0.11], [2500, 0.05]] },
    { start: 2.05, duration: 0.48, pitch: note("G2"), formants: [[500, 0.29], [1500, 0.12], [2400, 0.05]] },
    { start: 2.62, duration: 0.34, pitch: note("A2"), formants: [[350, 0.22], [1750, 0.13], [2600, 0.05]] },
    { start: 3.08, duration: 0.5, pitch: note("B2"), formants: [[690, 0.28], [1180, 0.12], [2500, 0.06]] },
    { start: 4.05, duration: 0.42, pitch: note("A2"), formants: [[430, 0.26], [1700, 0.13], [2400, 0.05]] },
    { start: 4.58, duration: 0.36, pitch: note("G2"), formants: [[580, 0.28], [1000, 0.11], [2300, 0.05]] },
    { start: 5.05, duration: 0.5, pitch: note("A2"), formants: [[750, 0.31], [1220, 0.12], [2550, 0.05]] },
    { start: 6.25, duration: 0.42, pitch: note("B2"), formants: [[510, 0.28], [1500, 0.12], [2400, 0.05]] },
    { start: 6.82, duration: 0.38, pitch: note("A2"), formants: [[370, 0.22], [1900, 0.14], [2600, 0.06]] },
    { start: 7.34, duration: 0.46, pitch: note("G2"), formants: [[680, 0.3], [1150, 0.12], [2500, 0.06]] },
    { start: 8.35, duration: 0.5, pitch: note("A2"), formants: [[500, 0.27], [1600, 0.13], [2400, 0.05]] },
    { start: 8.96, duration: 0.38, pitch: note("B2"), formants: [[700, 0.29], [1100, 0.12], [2500, 0.05]] },
    { start: 9.45, duration: 0.48, pitch: note("A2"), formants: [[420, 0.25], [1800, 0.13], [2600, 0.05]] }
  ];

  syllables.forEach((syllable) => addVowel(buffer, syllable.start, syllable.duration, syllable.pitch, syllable.formants));
  [0.25, 1.15, 1.92, 2.98, 3.9, 5.0, 6.05, 7.2, 8.22, 9.35].forEach((time) => addClickyConsonant(buffer, time, rng));
  addNoise(buffer, 0, 14, 0.004, { rng, attack: 0.2, release: 0.2 });
  addSoftRoom(buffer, 18, 0.025);
  return buffer;
}

mkdirSync(outputDir, { recursive: true });
writeWav("daily-drum-bass-groove-loop.wav", generateDrumBassGroove());
writeWav("daily-spoken-center-loop.wav", generateSpokenCenter());
writeWav("daily-acoustic-pop-loop.wav", generateAcousticPop());
writeWav("daily-piano-guitar-loop.wav", generatePianoGuitar());

console.log(`Generated Spectral Learn audio in ${outputDir}`);
