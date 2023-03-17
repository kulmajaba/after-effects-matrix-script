// Length
const devMax = 4.0;

const setting = effect('Matrix Letters')('Length');
const seed = effect('Matrix Letters')('Random Seed');

if (effect('Vary Length')('Checkbox') == 1) {
	seedRandom(seed, true);
	const dev = Math.round(Math.abs(gaussRandom(0, devMax) * 2 - devMax));

	value = setting - dev;
} else {
	value = setting;
}

// Lifespan
const devMax = 36.0;

const setting = effect('Matrix Letters')('Character Lifespan');
const seed = effect('Matrix Letters')('Random Seed');

if (effect('Vary Lifespan')('Checkbox') == 1) {
	seedRandom(seed, true);
	const dev = Math.round(Math.abs(gaussRandom(0, devMax) * 2 - devMax));

	value = setting - dev;
} else {
	value = setting;
}

// Prob of changing
const devMax = 5.0;

const setting = effect('Matrix Letters')('Probability of Blanks');
const seed = effect('Matrix Letters')('Random Seed');

if (effect('Vary Blanks')('Checkbox') == 1) {
	seedRandom(seed, true);
	const dev = gaussRandom(-devMax, devMax);

	value = setting + dev;
} else {
	value = setting;
}

// Prob of blanks
const devMax = 10.0;

const setting = effect('Matrix Letters')('Probability of Blanks');
const seed = effect('Matrix Letters')('Random Seed');

if (effect('Vary Blanks')('Checkbox') == 1) {
	seedRandom(seed, true);
	const dev = gaussRandom(-devMax, devMax);

	value = setting + dev;
} else {
	value = setting;
}

// Position
const layersBelow = thisComp.numLayers - index;
pos = thisComp.layer("Master control").effect("Initial X")("Slider") + layersBelow * thisComp.layer("Master control").effect("Offset")("Slider");
value = pos;