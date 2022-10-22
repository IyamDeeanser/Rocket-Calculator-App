//constants
const GAS_CONSTANT = 8.3144598 // J / (mol * K)
const p_a = 101325;
const g = 9.81;

export class Calculations {

    cStar = (y, Tchamber, Mmolprop) => {
        Mmolprop /= 1000;
        return Math.sqrt((((1 + y) / 2) ** ((y + 1) / (y - 1))) / y * GAS_CONSTANT * (Tchamber / Mmolprop));
    }

    mach_Solve = (y, ratio, selection) => {
        var sol = nerdamer.solve(`((((${y} - 1)/2 * x^2 + 1)*2/(${y} + 1))^((${y} + 1)/((${y} - 1) * 2))) / x = ${ratio}`, 'x');
        let result = sol.text();
        
        return result.split(/,|\[|\]/).filter(Number)[selection];
    }

    p_inj = (p_cns, y, M_i) => {
            return (p_cns * (1 + y * M_i**2)/((1 + (y-1)/(2)*M_i**2))**(y/(y - 1)));
    }

    p_t = (p_cns, y) => {
        return (p_cns * ((2/(y + 1))**(y/(y - 1))));
    }

    p_e = (p_cns, y, M_e) => {
        return (p_cns*((1 + (y-1)/2 * M_e**2)**(y/(y-1)))**-1);
    }

    A_t = (M, c_Star, p_cns) => {
        return (M * (c_Star/(p_cns)));
    }

    io_Calc = (area, ratio) => {
        return (ratio * area);
    }

    areaToDiameter = (area) => {
        return (2 * Math.sqrt(area/Math.PI));
    }

    nozzle_L = (diameter, throat, half_Angle) => {
        return ((diameter - throat)/(2*Math.tan(half_Angle)));
    }

    volume = (radius, radius_Throat, length) => {
        return ((Math.PI * length * (radius*radius + radius*radius_Throat + radius_Throat*radius_Throat))/3);
    }

    L_c = (area_Throat, L_STAR, area_chamber, V_con) => {
        return ((area_Throat*L_STAR - V_con)/area_chamber);
    }
    
    thrust_coe = (y, p_e, p_cns, e) => {
        return (Math.sqrt(((2*y**2)/(y-1)) * (2/(y+1))**((y+1)/(y-1)) * (1 - (p_e/p_cns)**((y-1)/y))) + e * ((p_e-p_a)/p_cns));
    }

    isp = (C_STAR, t_Coe) => {
        return ((C_STAR*t_Coe)/g);
    }

    thrust = (p_cns, A_t, t_Coe) => {
        return (p_cns*A_t*t_Coe);
    }

    
}