// Effect controls
const targetLayer = effect('Matrix Letters')('Target Title Layer');
const targetIndex = Math.round(effect('Matrix Letters')('Target Title Character Index'));
const length = Math.round(effect('Matrix Letters')('Length'));
const lifeSpan = Math.round(effect('Matrix Letters')('Character Lifespan'));
const minInterval = Math.round(effect('Matrix Letters')('Minimum Update Interval'));
const allCharactersStatic = effect('Matrix Letters')('All Characters Static') == 1;
const probOfChanging = effect('Matrix Letters')('Probability of Changing');
const spaceFrequency = Math.round(effect('Matrix Letters')('Frequency of Whitespace'));
const fontSize = Math.round(effect('Matrix Letters')('Font Size'));
const lineHeightMultiplier = effect('Matrix Letters')('Line Height Multiplier');
const seed = Math.round(effect('Matrix Letters')('Random Seed'));


const hasTarget = targetLayer !== undefined && targetLayer.name !== thisLayer.name;
let targetChar = ' ';
if (hasTarget) {
  targetChar = thisComp.layer('Title').text.sourceText.charAt(targetIndex);
}

// Calculate framerate for the layer based on min interval (which is frames)
const frameRate = 1.0/thisComp.frameDuration/(minInterval !== 0 ? minInterval : 1)
posterizeTime(frameRate);

// Set random to be time invariant
seedRandom(seed, true);

// Matrix Code NFI compatible character codes
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

// Randomize some character code indexes if layer is not set as static
if (!allCharactersStatic) {
  charIndexArr.forEach((cc, i) => {
    const rand = random();
    if (rand * 100 < probOfChanging) {
      const newVal = (cc + (Math.round(rand * 6) - 3)) % charCodes.length;

      // Check for underflow and wrap around
      if (newVal < 0) {
        charIndexArr[i] = charCodes.length - newVal;
      } else {
        charIndexArr[i] = newVal;
      }
    }
  });
}

// Convert character code indexes to character codes, then to characters
const charCodeArr = charIndexArr.map((v) => charCodes[v]);
const charArr = charCodeArr.map((v) => String.fromCharCode(v));

// Head and tail indexes
const head = Math.round((time - startTime) * frameRate);
const tail = Math.max(head - lifeSpan, -1);

charArr.forEach((char, i) => {
  // Show target character always at the head
  if (hasTarget && i === head) {
    charArr[i] = targetChar;
  }

  // Make characters not between head and tail blank
  if (i > head || i < tail) {
    charArr[i] = ' ';
  }
})

// Leave target character visible even when tail passes it
if (hasTarget && head > charArr.length - 1) {
  charArr[charArr.length - 1] = targetChar;
}

text.sourceText.style
  .setFontSize(fontSize)
  .setLeading(Math.round(fontSize * lineHeightMultiplier))
  .setText(charArr.join('\n'));
