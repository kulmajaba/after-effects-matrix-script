// Effect controls
const targetLayer = effect('Matrix Letters')('Target Title Layer');
const targetIndex = Math.round(effect('Matrix Letters')('Target Title Character Index'));
const length = Math.round(effect('Matrix Letters')('Length'));
const lifeSpan = Math.round(effect('Matrix Letters')('Character Lifespan'));
const minInterval = Math.round(effect('Matrix Letters')('Update Interval'));
const allCharactersStatic = effect('Matrix Letters')('All Characters Static') == 1;
const probOfChanging = effect('Matrix Letters')('Probability of Changing');
const probOfBlanks = effect('Matrix Letters')('Probability of Blanks');
const probOfBlankHead = effect('Matrix Letters')('Probability of Blank Head');
const fillCol = effect('Matrix Letters')('Main Color');
const fontSize = effect('Matrix Letters')('Font Size');
const lineHeightMultiplier = effect('Matrix Letters')('Line Height Multiplier');
const seed = Math.round(effect('Matrix Letters')('Random Seed'));

const spaceCharCode = 32

// Define boolean hasTarget and possible target character
const hasTarget = targetLayer !== undefined && targetLayer.name !== thisLayer.name;
let targetChar = ' ';
if (hasTarget) {
  targetChar = targetLayer.text.sourceText.charAt(targetIndex);
}

// Calculate framerate for the layer based on min interval (which is frames)
const frameRate = 1.0/thisComp.frameDuration/(minInterval !== 0 ? minInterval : 1)
posterizeTime(frameRate);

// Set random to be time invariant
seedRandom(seed, true);

// Matrix Code NFI compatible character codes
const charCodeRange = [32, 126]; // Space will be at index 0
const forbiddenCodes = [64, 96]; // @-sign, grave accent

// Create charcode array and remove forbidden
let charCodes = Array.from(Array(charCodeRange[1] - charCodeRange[0] + 1).keys()).map((v) => v + charCodeRange[0]);
forbiddenCodes.forEach((v) => charCodes.splice(charCodes.findIndex((x) => x === v), 1));

// Init array of random indexes of character codes (always the same for a given seed and layer)
// Avoid space (index 0)
// Add spaces to initial array if probability is above 0
const charIndexArr = random(Array(length).fill(1), Array(length).fill(charCodes.length - 1)).map((v) => Math.round(v));
if (probOfBlanks > 0) {
  charIndexArr.forEach((cci, i) => {
    if (random() * 100 < probOfBlanks) {
      charIndexArr[i] = 0;
    }
  })
}

// Set random to be dependent on time
seedRandom(seed, false);

// Randomize some character code indexes if layer is not set as static
if (!allCharactersStatic) {
  charIndexArr.forEach((cci, i) => {
    if (random() * 100 < probOfChanging) {
      if (i === charIndexArr.length - 1) {
        return;
      } else if (random() * 100 < probOfBlanks) {
        charIndexArr[i] = 0;
      } else {
        const newVal = (cci + (Math.round(random() * 6) - 3)) % charCodes.length;

        // Check for underflow and wrap around, avoid space (index 0)
        if (newVal < 1) {
          charIndexArr[i] = charCodes.length + newVal - 1;
        } else {
          charIndexArr[i] = newVal;
        }
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
  if (i === head && hasTarget) {
    charArr[i] = targetChar;
  } else if (i === head && char === ' ' && random() * 100 > probOfBlankHead) {
    // Replace a blank head with a random character sometimes
    charArr[i] = String.fromCharCode(charCodes[Math.round(random(1, charCodes.length - 1))]);
  }

  // Make characters not between head and tail blank
  // Leave target character visible even when tail passes it
  if ((i > head || i < tail) && !(hasTarget && head > charArr.length - 1)) {
    charArr[i] = ' ';
  }
})

text.sourceText.style
  .setFont('MatrixCodeNFI')
  .setFontSize(fontSize)
  .setAutoLeading(false)
  .setLeading(fontSize * lineHeightMultiplier)
  .setFillColor(fillCol)
  .setText(charArr.join('\n'));
