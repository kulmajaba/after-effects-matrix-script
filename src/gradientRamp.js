// Start of ramp
const whiteLetters = 1;
const offsetPx = 5;

// Effect controls
const hasTarget = effect("Has target")("Checkbox") == 1;
const length = Math.round(effect("Length")("Slider"));
const minInterval = Math.round(effect("Minimum interval")("Slider"));
const fontSize = Math.round(effect("Font size")("Slider"));
const lineHeightAdjust = Math.round(effect("Line height adjust")("Slider"));
const spaceFrequency = Math.round(effect("Space frequency")("Slider"));
const lifeSpan = Math.round(effect("Character lifespan")("Slider"));

const lineHeightMultiplier = 0.8125;

// Calculate framerate for the layer based on min interval (in frames)
const frameRate = 1.0/thisComp.frameDuration/(minInterval !== 0 ? minInterval : 1)
posterizeTime(frameRate);

const head = Math.round((time - startTime) * frameRate);
const tail = Math.max(head - lifeSpan, -1);

const adjustedHead = hasTarget ? Math.min(head, length - 1) : head;

value = [thisComp.width / 2, position[1] + (fontSize * lineHeightMultiplier + lineHeightAdjust) * (adjustedHead - whiteLetters) + offsetPx];

// #####################################################################################################################
// End of ramp

// Effect controls
const hasTarget = effect("Has target")("Checkbox") == 1;
const fontSize = Math.round(effect("Font size")("Slider"));
const lineHeightAdjust = Math.round(effect("Line height adjust")("Slider"));

const lineHeightMultiplier = 0.8125;

const start = effect("Gradient Ramp")("Start of Ramp")
value = [start[0], start[1] - (hasTarget ? 0.5 : (fontSize * lineHeightMultiplier + lineHeightAdjust))];