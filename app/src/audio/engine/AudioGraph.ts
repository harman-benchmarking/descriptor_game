export function rampParam(param: AudioParam, value: number, now: number, seconds: number) {
  param.cancelScheduledValues(now);
  param.setValueAtTime(param.value, now);
  param.linearRampToValueAtTime(value, now + seconds);
}
