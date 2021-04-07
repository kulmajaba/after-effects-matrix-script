const minInerval = 10;
const probOfStationary = 50;
const probOfStationaryDec = probOfStationary / 100.0;

const ranges = [[65, 90], [97, 122], [48, 57]];
//const charCodes = ranges.map((range) => Array.from(Array(range[1]-range[0]+1).keys(), (v) => range[0]));

const isStationary = random() > probOfStationaryDec;

value = isStationary;