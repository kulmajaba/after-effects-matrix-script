const allCharactersStatic = effect("All characters static")("Checkbox") == 1;
const length = 100 // effect("Length")("Slider");
const minInerval = 5 // effect("Minimum interval")("Slider");
const positiveJitter = 5 // effect("Interval positive jitter")("Slider");
const probOfStatic = 40 // effect("Probability of static chars")("Slider");;
const seed = effect("Random seed")("Slider");
const fontSize = effect("Font size")("Slider");
const lineHeightAdjust = effect("Line height adjust")("Slider");

// Set random to be time invariant
seedRandom(seed, true);

const charCodeRange = [32, 126];
const forbiddenCodes = [64, 96];

const charCodes = Array.from(Array(charCodeRange[1] - charCodeRange[0] + 1).keys()).map((v) => v + charCodeRange[0]);
forbiddenCodes.forEach((v) => charCodes.splice(charCodes.findIndex((x) => x === v), 1));

const charIndexArr = Array.from(Array(length)).map((v) => Math.round(random() * charCodes.length));
// const charCodeArr = Array.from(Array(length)).map((v) => charCodes[Math.round(random() * charCodes.length)]);

seedRandom(seed, false);

if (!allCharactersStatic) {
  charIndexArr.forEach((cc, i) => {
    const rand = random();
    if (rand * 100 > probOfStatic) {
      charIndexArr[i] = (cc + (Math.round(rand * 2) - 1)) % charCodes.length;
    }
  });
}

const charCodeArr = charIndexArr.map((v) => charCodes[v]);
const charArr = charCodeArr.map((v) => String.fromCharCode(v));

text.sourceText.style
  .setFontSize(fontSize)
  .setLeading(Math.round(fontSize * 0.8125) + lineHeightAdjust)
  //.setText(allCharactersStatic);
  .setText(charArr.join('\n'));