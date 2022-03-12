
import { Color, Theme, createScale, contrast, luminance } from '@adobe/leonardo-contrast-colors';
import { rgb as d3rgb, color as d3color} from 'd3-color';

export type IRampProps = {
    baseColor: string[];    // #e2dded
    colorScheme: string;    // "Purple"
    inputRatios: string[];  // ["-1.2", "-1.12", "1", "1.24", "1.52", "1.92", "3", "4.64", "6.96", "8.8", "11.52"]
    colorKeys: string[];    // ["#4C2F92", "#000000"]
    colorSpace: string;     // "RGB"
    colorStops: string[];   // ["50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
}

// from Adaptive-DS-Colors > src/index.js@_generateNewColors
export const generateRamp = (state:IRampProps ) => {
    console.log('$$generateRamp state:', state)

    const background = state.baseColor;
    const bg = d3color(background).rgb();
    const color = {
        name: `${state.colorScheme}`,
        ratios: state.inputRatios,
        colorKeys: state.colorKeys,
        colorspace: state.colorSpace,
    }
    
    color.colorKeys.map((key, index) => {
        color.colorKeys[index] = ensureColorValueIsProperHex(key);
    });
    const uniqueInputs = [...new Set(color.colorKeys)]; // make sure colorKeys are unique ["#4C2F92", "#000000"]
  
    
    let colorData = new Color(color);
    let theme = new Theme({colors: [colorData], backgroundColor: background, lightness: 100, contrast: 1});
    let newColors = theme._contrastColorValues;
  
    // let n = 100; //window.innerHeight - 282; // ?????
    // let rampData = createScale({swatches: n, colorKeys: color.colorKeys, colorspace: color.colorspace})//, ratios: color.ratios});
    // let rampData = createScale({swatches: n, colorKeys: color.colorKeys, colorspace: color.colorspace, ratios: color.ratios});
    const outputRatios: number[] = [];
    newColors.map(key => {
        // JS: added baseV = 1
        var outputRatio = contrast( [d3rgb(key).r, d3rgb(key).g, d3rgb(key).b], [bg.r, bg.g, bg.b], 1);
        // var outputRatio = contrast([d3rgb(key).r, d3rgb(key).g, d3rgb(key).b], [bg.r, bg.g, bg.b]);
        outputRatios.push(outputRatio);
    });

    const finalColors = [];
    newColors.map ((key, index) => {
        finalColors.push({
            color: key,
            ratio: outputRatios[index].toFixed(2)
        })
    });

    //

    let newArray = [];
    for (let i = 0; i < finalColors.length; i++ ) {
        let contrastDisplay;
        let color = finalColors[i].color;
        let colorRGB = d3rgb(color);
        if (luminance(colorRGB.r, colorRGB.g, colorRGB.b) < 0.1848) {
            contrastDisplay = '#ffffff'
        } else {
            contrastDisplay = '#000000'
        }
        // contrastRatio >= -1 && contrastRatio <= 1 ? (contrastRatio = 1) : null;
        newArray[i] = {
            ...newArray[i], 
            ...finalColors[i],
            contrastDisplay,
        }
    }
    //

    const finalRamp = {
        name: state.colorScheme,
        colorSpace: color.colorspace,
        colorKeys: uniqueInputs,
        baseColor: background,
        inputRatios: color.ratios,
        outputRatios: outputRatios,
        results: finalColors,
        //
        colorStops: state.colorStops,
        theme,
        combined: newArray
    }
  
    return finalRamp;
}


const ensureColorValueIsProperHex = (value, source = "your colors") => {
    let isValid = false;
    if (typeof(value) !== 'string') {
        value = value.toString();
    }
    if (value.length === 4 && value.charAt(0) === '#') {
        value = value.slice(1)
    }
    if (value.startsWith('#') !== true && value.length === 3) {
        value = value.split('').map(v => v + v).join('');
        value = '#' + value;
    }
    if (value.startsWith('#') !== true && value.length === 6) {
        value = '#' + value;
    }

    isValid = /^#([0-9A-F]{3}){1,2}$/i.test(value);
    if (isValid === false) {
        alert(`\'${value}\'` + ' is an invalid HEX code in ' + source)
        return '#FFFFFF'
    }
    return value.toUpperCase();
};