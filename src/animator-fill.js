// Advanced: Index, Characters, Ramp Up

// Fill -> Range Selector -> Start

const accentedChars = Math.round(effect('Matrix Letters')('Accented Head Characters'));
const lifespan = Math.round(effect('Matrix Letters')('Character Lifespan'));
const fade = Math.round(effect('Matrix Letters')('Head Accent Fade'));

value = text.animator('Head Accent').selector('Range Selector 1').end - fade / 100 * lifespan;

// Fill -> Range Selector -> End

// Calculate framerate for the layer based on update interval (which is frames)
const updateInterval = Math.round(effect('Matrix Letters')('Update Interval'));
const frameRate = 1.0/thisComp.frameDuration/(updateInterval !== 0 ? updateInterval : 1)
posterizeTime(frameRate);

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

// Effect controls
const mainCol = effect('Matrix Letters')('Main Color');
const accentCol = effect('Matrix Letters')('Accent Color');
const accentOpacity = effect('Matrix Letters')('Head Accent Opacity') / 100;

const newColR = accentOpacity * accentCol[0] + (1 - accentOpacity) * mainCol[0];
const newColG = accentOpacity * accentCol[1] + (1 - accentOpacity) * mainCol[1];
const newColB = accentOpacity * accentCol[2] + (1 - accentOpacity) * mainCol[2];

value = [newColR, newColG, newColB, 1];
