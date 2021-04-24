// Paste the parts of this script to their places

// ########################################################################################################################################

// Start of ramp
const whiteLetters = 1;
const offsetPx = 2;

// Effect controls
const targetLayer = effect('Matrix Letters')('Target Title Layer');
const length = Math.round(effect('Matrix Letters')('Length'));
const lifeSpan = Math.round(effect('Matrix Letters')('Character Lifespan'));
const minInterval = Math.round(effect('Matrix Letters')('Minimum Update Interval'));
const fontSize = Math.round(effect('Matrix Letters')('Font Size'));
const lineHeightMultiplier = effect('Matrix Letters')('Line Height Multiplier');
const accentedChars = Math.round(effect('Matrix Letters')('Accented Head Characters'));

const hasTarget = targetLayer !== undefined && targetLayer.name !== thisLayer.name;

const chars = text.sourceText

const firstNonWhitespace = chars.indexOf(chars.replace(/^[\s\n]+/g, ''));
const lastNonWhitespace = chars.replace(/[\s\n]+$/g, '').length - 1;

const isLast = firstNonWhitespace === lastNonWhitespace;

const adjustedHead = hasTarget ? Math.min(lastNonWhitespace, text.sourceText.length - 1) : (isLast ? 500 : lastNonWhitespace);

const x = thisComp.width / 2;
const y = position[1] - anchorPoint[1] + (fontSize * lineHeightMultiplier) * (Math.ceil(adjustedHead / 2) - accentedChars) + offsetPx;

value = [x, y];

// ########################################################################################################################################

// End of ramp
// Effect controls
const fontSize = Math.round(effect('Matrix Letters')('Font Size'));
const lineHeightMultiplier = effect('Matrix Letters')('Line Height Multiplier');
const accentedChars = Math.round(effect('Matrix Letters')('Accented Head Characters'));
const fade = effect('Matrix Letters')('Head Accent Fade');

const chars = text.sourceText

const firstNonWhitespace = chars.indexOf(chars.replace(/^[\s\n]+/g, ''));
const lastNonWhitespace = chars.replace(/[\s\n]+$/g, '').length - 1;
const length = (lastNonWhitespace - firstNonWhitespace - accentedChars + 1) * fade / 100;

const start = effect("Gradient Ramp")("Start of Ramp")
value = [start[0], start[1] - 0.1 - (length * fontSize * lineHeightMultiplier)];

// ########################################################################################################################################

// Gradient Ramp -> Start color
effect('Matrix Letters')('Leading Character Color');

// ########################################################################################################################################

// Gradient Ramp -> End color
effect('Matrix Letters')('Main Color');