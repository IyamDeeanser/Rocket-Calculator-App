import { Calculations } from "./calculations.js";
import { print } from "./print.js";

// Variables for CEARUN
const NOZZLE_STAGNATION_PRESSURE = 750000; // Pa
const FLOW_RATE = 0.04; // kg/s
const EXPANSION_RATIO = 2.4; // 2.4
const SELECT_PROPELLANTS = "Kerosene-GOX";
const OXIDIZER_FUEL_RATIO = 2.1;

// Results from CEARUN
const FLAME_TEMP = 3256.57 // K
const MOLECULAR_WEIGHT = 20.788 // kg/kmol
const GAMMA = 1.1407 
const IDEAL_C_STAR = 1792.1 // m/s

let calc = new Calculations();

// print calculations

print(calc.cStar(GAMMA, FLAME_TEMP, MOLECULAR_WEIGHT));
print(calc.areaRatio(GAMMA, FLOW_RATE));
print(calc.p_inj(NOZZLE_STAGNATION_PRESSURE, GAMMA, 0.257));
print(calc.p_t(NOZZLE_STAGNATION_PRESSURE, GAMMA));