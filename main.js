import { Calculations } from "./calculations.js";
import { clear, printC1, printC2, printC3} from "./print.js";
let calc = new Calculations();

let NOZZLE_STAGNATION_PRESSURE = 0; // Pa
let FLOW_RATE = 0; // kg/s
let EXPANSION_RATIO = 0; 
let EXPANSION_HALF_ANGLE = 0;
let CONTRACTION_RATIO = 0;
let CONTRACTION_HALF_ANGLE = 0;
let FLAME_TEMP = 0; // K
let MOLECULAR_WEIGHT = 0; // kg/kmol
let GAMMA = 0;
let C_STAR_EFFICIENCY = 0;
let C_STAR = 0; // m/s
//const SELECT_PROPELLANTS = "Kerosene-GOX";
//const OXIDIZER_FUEL_RATIO = 2.1;

// Inputs
function updateInput()
{
    console.log("Input Updated")
    NOZZLE_STAGNATION_PRESSURE = Number(document.getElementById('p-cns').value); // Pa
    FLOW_RATE = Number(document.getElementById('f-r').value); // kg/s
    EXPANSION_RATIO = Number(document.getElementById('R-e').value); 
    EXPANSION_HALF_ANGLE = calc.d_to_r(Number(document.getElementById('e-hf').value));
    CONTRACTION_RATIO = Number(document.getElementById('R-c').value);
    CONTRACTION_HALF_ANGLE = calc.d_to_r(Number(document.getElementById('c-hf').value));
    FLAME_TEMP = Number(document.getElementById('f-t').value); // K
    MOLECULAR_WEIGHT = Number(document.getElementById('m-e-w').value); // kg/kmol
    GAMMA = Number(document.getElementById('y').value);
    C_STAR_EFFICIENCY = Number(document.getElementById('c-eff').value);
    C_STAR = calc.cStar(GAMMA, FLAME_TEMP, MOLECULAR_WEIGHT)*C_STAR_EFFICIENCY; // m/s
    //const SELECT_PROPELLANTS = "Kerosene-GOX";
    //const OXIDIZER_FUEL_RATIO = 2.1;
}

for (let input of document.getElementsByTagName("input")) {
    input.addEventListener("input", (e) => {
        updateInput();
        calculateValues();
        printOutput();
    });
}

//calculation variables
const L_STAR = 1.1;
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

function calculateValues()
{
    //calculations
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
}

function printOutput()
{
    clear();
    printC1("<strong> C* </strong> <br>" + C_STAR + "<strong> m/s </strong>");
    printC1("<strong> Contraction Mach Number </strong> <br>" + calc.mach_Solve(GAMMA, CONTRACTION_RATIO, 0));
    printC1("<strong> Expansion Mach Number </strong> <br>" + calc.mach_Solve(GAMMA, EXPANSION_RATIO, 1));
    printC2("<strong> Injector Pressure </strong> <br>" + calc.p_inj(NOZZLE_STAGNATION_PRESSURE, GAMMA, M_i) + "<strong> Pa </strong>");
    printC2("<strong> Throat Pressure </strong> <br>" + calc.p_t(NOZZLE_STAGNATION_PRESSURE, GAMMA) + "<strong> Pa </strong>");
    printC2("<strong> Exit Pressure </strong> <br>" + P_e + "<strong> Pa </strong>");
    printC2("<strong> Throat Area </strong> <br>" + A_t + "<strong> m^2 </strong>");
    printC2("<strong> Throat Diameter </strong> <br>" + D_t + "<strong> m </strong>");
    printC2("<strong> Chamber Area </strong> <br>" + A_c + "<strong> m^2 </strong>");
    printC2("<strong> Chamber Diameter </strong> <br>" + D_c + "<strong> m </strong>");
    printC3("<strong> Exit Area </strong> <br>" + A_e + "<strong> m^2 </strong>");
    printC3("<strong> Exit Diameter </strong> <br>" + D_e + "<strong> m </strong>");
    printC3("<strong> Contraction Length </strong> <br>" + calc.nozzle_L(D_c, D_t, CONTRACTION_HALF_ANGLE)) + "<strong> m </strong>";
    printC3("<strong> Expansion Length </strong> <br>" + calc.nozzle_L(D_e, D_t, EXPANSION_HALF_ANGLE) + "<strong> m </strong>");
    printC3("<strong> Contraction Volume </strong> <br>" + V_con + "<strong> m^3 </strong>");
    printC3("<strong> Chamber Length </strong> <br>" + calc.L_c(A_t, L_STAR, A_c, V_con) + "<strong> m </strong>");
    printC1("<strong> Thrust Coefficient </strong> <br>" + t_Coe);
    printC1("<strong> Specific Impulse </strong> <br>" + calc.isp(C_STAR, t_Coe) + "<strong> s </strong>");
    printC1("<strong> Thrust </strong> <br>" + calc.thrust(NOZZLE_STAGNATION_PRESSURE, A_t, t_Coe) + "<strong> N </strong>");
}

console.log(calc.mach_Solve(GAMMA, CONTRACTION_RATIO))
