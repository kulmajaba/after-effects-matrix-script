const allCharactersStatic = effect("All characters static")("Checkbox");
const length = effect("Length")("Slider");
const minInerval = effect("Minimum interval")("Slider");
const jitter = effect("Interval jitter")("Slider");
const probOfStatic = effect("Probability of static chars")("Slider");;
const seed = effect("Random seed")("Slider");

seedRandom(seed, true);

const charCodeRange = [32, 126];
const forbiddenCodes = [64, 96];

let charCodes = Array.from(Array(charCodeRange[1]-charCodeRange[0]+1).keys()).map((v) => v + charCodeRange[0]);
forbiddenCodes.forEach((v) => charCodes.splice(charCodes.findIndex((x) => x === v), 1));

const isStationary = random()*100 > probOfStatic;

value = length;