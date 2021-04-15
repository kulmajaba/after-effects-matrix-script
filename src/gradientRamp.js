// Start of ramp
const whiteLetters = 1;
const offsetPx = 5;

// Effect controls
const targetLayer = effect('Matrix Letters')('Target Title Layer');
const length = Math.round(effect('Matrix Letters')('Length'));
const lifeSpan = Math.round(effect('Matrix Letters')('Character Lifespan'));
const minInterval = Math.round(effect('Matrix Letters')('Minimum Update Interval'));
const fontSize = Math.round(effect('Matrix Letters')('Font Size'));
const lineHeightMultiplier = effect('Matrix Letters')('Line Height Multiplier');

const hasTarget = targetLayer !== undefined && targetLayer.name !== thisLayer.name;

// Calculate framerate for the layer based on min interval (in frames)
const frameRate = 1.0/thisComp.frameDuration/(minInterval !== 0 ? minInterval : 1)
posterizeTime(frameRate);

const head = Math.round((time - startTime) * frameRate);
const tail = Math.max(head - lifeSpan, -1);

const adjustedHead = hasTarget ? Math.min(head, length - 1) : head;

value = [thisComp.width / 2, position[1] - anchorPoint[1] + (fontSize * lineHeightMultiplier) * (adjustedHead - whiteLetters) + offsetPx];

// #######################################################################################################################################

// End of ramp

// Effect controls
const targetLayer = effect('Matrix Letters')('Target Title Layer');
const fontSize = Math.round(effect('Matrix Letters')('Font Size'));
const lineHeightMultiplier = effect('Matrix Letters')('Line Height Multiplier');

const hasTarget = targetLayer !== undefined && targetLayer.name !== thisLayer.name;

const start = effect("Gradient Ramp")("Start of Ramp")
value = [start[0], start[1] - (hasTarget ? 0.5 : (fontSize * lineHeightMultiplier))];

// #######################################################################################################################################

// Start color

effect('Matrix Letters')('Leading Character Color');

// End color

effect('Matrix Letters')('Main Color');
