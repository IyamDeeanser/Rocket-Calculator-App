// CONSTANTS
const GAS_CONSTANT = 8.3144598 // J / (mol * K)

export class Calculations {
    /*
    * y: gamma
    * Tchamber: tempterature of chamber (K)
    * Mmolprop: Molecular weight of exhaust (kg/kmol)
    * returns C* in m/s
    */
    cStar = (y, Tchamber, Mmolprop) => {
        Mmolprop /= 1000;
        return Math.sqrt((((1 + y) / 2) ** ((y + 1) / (y - 1))) / y * GAS_CONSTANT * (Tchamber / Mmolprop));
    }

    /*
    * y: gamma
    * M: mach
    * returns throat to exit area ratio
    */
    areaRatio = (y, M) => {
        return ((((y - 1)/2 * M**2 + 1)*2/(y + 1))**((y + 1)/((y - 1) * 2))) / M;
    }

    /*
    */
   p_inj = (p_cns, y, M_i) => {
        return (p_cns*(1 + y * M_i**2)/((1+(y-1)/(2)*M_i**2))**(y/(y-1)));
   }


   p_t = (p_cns, y) => {
    return (p_cns*(2/(y+1)**(y/(y-1))));
}
}