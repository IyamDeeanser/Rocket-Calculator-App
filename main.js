import { Calculations } from "./calculations.js";
import { print } from "./print.js";

// Variables for CEARUN
const NOZZLE_STAGNATION_PRESSURE = 750000; // Pa
const FLOW_RATE = 0.04; // kg/s
const EXPANSION_RATIO = 2.4; // 2.4
const EXPANSION_HALF_ANGLE = Math.PI/12;
const CONTRACTION_RATIO = 3;
const CONTRACTION_HALF_ANGLE = Math.PI/6;
const SELECT_PROPELLANTS = "Kerosene-GOX";
const OXIDIZER_FUEL_RATIO = 2.1;
const L_STAR = 1.1;

// Results from CEARUN
const FLAME_TEMP = 3256.57; // K
const MOLECULAR_WEIGHT = 20.788; // kg/kmol
const GAMMA = 1.1407;
const IDEAL_C_STAR = 1792.1; // m/s
const C_STAR_EFFICIENCY = 1.00;
const C_STAR = IDEAL_C_STAR*C_STAR_EFFICIENCY;

//calculation variables
let M_i = 0.203;    //mach number at inlet   
let M_e = 2.163;    //mach number at exit
let P_e = 0;        //pressure at exit
let A_t = 0;        //area of throat cross-section
let A_c = 0;        //area of chamber cross-section
let A_e = 0;        //area of exit cross-section
let D_t = 0;        //diameter of throat
let D_c = 0;        //diameter of chamber
let D_e = 0;        //diameter of exit
let n_L_C = 0;      //nozzle converging length
let V_con = 0;      //volume of truncated converging cone
let t_Coe = 0;      //thrust coefficient

let calc = new Calculations();

// print calculations
A_t = calc.A_t(FLOW_RATE, C_STAR, NOZZLE_STAGNATION_PRESSURE);
P_e = calc.p_e(NOZZLE_STAGNATION_PRESSURE, GAMMA, M_e)
D_t = calc.areaToDiameter(A_t);
A_c = calc.io_Calc(A_t, CONTRACTION_RATIO);
D_c = calc.areaToDiameter(A_c);
A_e = calc.io_Calc(A_t, EXPANSION_RATIO);
D_e = calc.areaToDiameter(A_e);
n_L_C = calc.nozzle_L(D_c, D_t, CONTRACTION_HALF_ANGLE);
V_con = calc.volume(D_c/2, D_t/2, n_L_C);
t_Coe = calc.thrust_coe(GAMMA, P_e, NOZZLE_STAGNATION_PRESSURE, EXPANSION_RATIO);

print("C*   -   " + calc.cStar(GAMMA, FLAME_TEMP, MOLECULAR_WEIGHT));
print("Area Ratio   -   " + calc.areaRatio(GAMMA, FLOW_RATE));
print("Injector Pressure   -   " + calc.p_inj(NOZZLE_STAGNATION_PRESSURE, GAMMA, M_i));
print("Throat Pressure   -   " + calc.p_t(NOZZLE_STAGNATION_PRESSURE, GAMMA));
print("Exit Pressure   -   " + P_e);
print("Throat Area   -   " + A_t);
print("Throat Diameter   -   " + D_t);
print("Chamber Area   -   " + A_c);
print("Chamber Diameter   -   " + D_c);
print("Exit Area   -   " + A_e);
print("Exit Diameter   -   " + D_e);
print("Contraction Length   -   " + calc.nozzle_L(D_c, D_t, CONTRACTION_HALF_ANGLE));
print("Expansion Length   -   " + calc.nozzle_L(D_e, D_t, EXPANSION_HALF_ANGLE)); //issue with length
print("Contraction Volume   -   " + V_con);
print("L* Length   -   " + calc.L_c(A_t, L_STAR, A_c, V_con));
print("Thrust Coefficient - " + t_Coe);
print("Specific Impulse   -   " + calc.isp(C_STAR, t_Coe));
print("Thrust - " + calc.thrust(NOZZLE_STAGNATION_PRESSURE, A_t, t_Coe));
