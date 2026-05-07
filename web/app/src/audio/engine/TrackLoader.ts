export function createLoopingAudioElement(src: string): HTMLAudioElement {
  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = "auto";
  audio.crossOrigin = "anonymous";
  return audio;
}
