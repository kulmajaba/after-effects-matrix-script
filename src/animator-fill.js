// Advanced: Index, Characters, Ramp Up

// Fill -> Range Selector -> Start

const accentedChars = Math.round(effect('Matrix Letters')('Accented Head Characters'));
const fade = Math.round(effect('Matrix Letters')('Head Accent Fade'));

value = text.animator("Head accent").selector("Range Selector 1").end - fade;

// Fill -> Range Selector -> End

// Effect controls
const targetLayer = effect('Matrix Letters')('Target Title Layer');
const length = Math.round(effect('Matrix Letters')('Length'));
const accentedChars = Math.round(effect('Matrix Letters')('Accented Head Characters'));

const hasTarget = targetLayer !== undefined && targetLayer.name !== thisLayer.name;

const chars = text.sourceText;
const charsWithoutLineFeeds = chars.replace(/[\n\r]+/g, '');

const firstNonWhitespace = charsWithoutLineFeeds.indexOf(charsWithoutLineFeeds.replace(/^\s+/g, ''));
const head = charsWithoutLineFeeds.replace(/\s+$/g, '').length - 1;
const isLast = firstNonWhitespace === head && head > 1;

const adjustedHead = hasTarget ? head - accentedChars + 1 : (isLast ? length + accentedChars : head - accentedChars + 1);

value = adjustedHead;

// Fill -> Fill color

effect("Matrix Letters")("Leading Character Color")
