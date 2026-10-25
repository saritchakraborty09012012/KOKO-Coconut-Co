let ctx = null;
let master = null;
let layers = [];
let on = false;

function noiseBuffer(context, seconds = 6) {
  const length = Math.floor(context.sampleRate * seconds);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = last * 0.96 + white * 0.04;
    data[i] = last * 3.2;
  }
  return buffer;
}

function buildLayers(context, output) {
  const source = context.createBufferSource();
  source.buffer = noiseBuffer(context);
  source.loop = true;

  const lowpass = context.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 520;
  lowpass.Q.value = 0.7;

  const swell = context.createGain();
  swell.gain.value = 0.2;

  const swellLfo = context.createOscillator();
  swellLfo.frequency.value = 0.085;
  const swellDepth = context.createGain();
  swellDepth.gain.value = 0.13;
  swellLfo.connect(swellDepth).connect(swell.gain);

  const body = context.createGain();
  body.gain.value = 0.9;
  source.connect(lowpass).connect(swell).connect(body).connect(output);

  const foam = context.createBufferSource();
  foam.buffer = noiseBuffer(context, 4);
  foam.loop = true;

  const highpass = context.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 1800;

  const foamGain = context.createGain();
  foamGain.gain.value = 0.014;

  const foamLfo = context.createOscillator();
  foamLfo.frequency.value = 0.13;
  const foamDepth = context.createGain();
  foamDepth.gain.value = 0.01;
  foamLfo.connect(foamDepth).connect(foamGain.gain);

  foam.connect(highpass).connect(foamGain).connect(output);

  source.start();
  foam.start();
  swellLfo.start();
  foamLfo.start();

  return [source, foam, swellLfo, foamLfo];
}

export function isAmbientOn() {
  return on;
}

export async function toggleAmbient() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return false;

  if (!ctx) {
    ctx = new AudioContextClass();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    layers = buildLayers(ctx, master);
  }

  if (ctx.state === "suspended") await ctx.resume();

  on = !on;
  const now = ctx.currentTime;
  const gain = master.gain;
  gain.cancelScheduledValues(now);
  gain.setTargetAtTime(on ? 0.55 : 0, now, on ? 0.9 : 0.22);

  return on;
}
