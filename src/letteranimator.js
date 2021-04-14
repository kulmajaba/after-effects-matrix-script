// Effect controls
const allCharactersStatic = effect("All characters static")("Checkbox") == 1;
const length = Math.round(effect("Length")("Slider"));
const minInterval = Math.round(effect("Minimum interval")("Slider"));
const positiveJitter = Math.round(effect("Interval positive jitter")("Slider"));
const probOfChanging = effect("Probability of changing chars")("Slider");
const seed = Math.round(effect("Random seed")("Slider"));
const fontSize = Math.round(effect("Font size")("Slider"));
const lineHeightAdjust = Math.round(effect("Line height adjust")("Slider"));
const spaceFrequency = Math.round(effect("Space frequency")("Slider"));
const lifeSpan = Math.round(effect("Character lifespan")("Slider"));

// Calculate framerate for the layer based on min interval (in frames)
const frameRate = 1.0/thisComp.frameDuration/(minInterval !== 0 ? minInterval : 1)
posterizeTime(frameRate);

// Set random to be time invariant
seedRandom(seed, true);

// Matrix Code NFI compatible characters
const charCodeRange = [32, 126];
const forbiddenCodes = [32, 64, 96]; // Space (added later), @-sign, grave accent

// Create charcode array, remove forbidden and add spaces (charcode 32)
let charCodes = Array.from(Array(charCodeRange[1] - charCodeRange[0] + 1).keys()).map((v) => v + charCodeRange[0]);
forbiddenCodes.forEach((v) => charCodes.splice(charCodes.findIndex((x) => x === v), 1));
charCodes = charCodes.concat(Array(spaceFrequency).fill(32));

// Init array of random indexes of character codes (always the same for a given seed and layer)
const charIndexArr = Array.from(Array(length)).map((v) => Math.round(random() * charCodes.length));

// Set random to be dependent on time
seedRandom(seed, false);

// Randomize some character code indexes
if (!allCharactersStatic) {
  charIndexArr.forEach((cc, i) => {
    const rand = random();
    if (rand * 100 < probOfChanging) {
      const newVal = (cc + (Math.round(rand * 6) - 3)) % charCodes.length;
      if (newVal < 0) {
        charIndexArr[i] = charCodes.length - 1;
      } else {
        charIndexArr[i] = newVal;
      }
    }
  });
}

const charCodeArr = charIndexArr.map((v) => charCodes[v]);
const charArr = charCodeArr.map((v) => String.fromCharCode(v));

const head = Math.round((time - startTime) * frameRate);
const tail = Math.max(head - lifeSpan, -1);

charArr.forEach((char, i) => {
  if (i > head || i < tail) {
    charArr[i] = ' ';
  }
})

text.sourceText.style
  .setFontSize(fontSize)
  .setLeading(Math.round(fontSize * 0.8125) + lineHeightAdjust)
  //.setText(head + ', ' + tail + '\n' + charArr);
  .setText(charArr.join('\n'));