// conf

import { result } from "lodash";



const parentProperties = {
    layoutMode: "HORIZONTAL",
    fills: [],
    itemSpacing: 16, // h space between swatches
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'AUTO',
};

const containerProperties = {
    layoutMode: "VERTICAL",
    fills: [],
    itemSpacing: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    primaryAxisSizingMode: 'AUTO',
    counterAxisSizingMode: 'AUTO'
}
  
const textContainerProperties = {
    layoutMode: "VERTICAL",
    primaryAxisSizingMode: 'FIXED',
    counterAxisSizingMode: 'AUTO',
    itemSpacing: 8,
    layoutAlign: "STRETCH",
    fills: []
}

// utils

const addPropertiesToContainer = (properties, container) => {
    Object.keys(properties).map((item, key) => {
        container[item] = properties[item];
    });
};
  
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
    // } : null;
    } : {r:255,g:0,b:0};
}

const createText = (str:string = 'placeholder', fontSize:number=12, fontName={ family: "Cera Pro", style: "Medium" }) => {
    let t = figma.createText();
    t.characters = str;
    t.fontSize = fontSize;
    t.fontName = fontName;
    return t;
}
    
const color_black = {color: hexToRgb('#141414'), type: 'SOLID'} as SolidPaint;
const color_white = {color: hexToRgb('#ffffff'), type: 'SOLID'} as SolidPaint;

const buildBox = (item: ISwatchProps) => {
    let container = figma.createFrame();
    addPropertiesToContainer(containerProperties, container)
    container.name = `${item.name} ${item.step} (${item.color_hex})`;
    container.layoutMode = 'NONE'
    container.resize(384, 288);

    container.cornerRadius = 12;
    container.fills = [{ color: item.color_rgb, type: 'SOLID' } as SolidPaint];

    // upper text

    let text_container = figma.createFrame();
    container.appendChild(text_container);
    addPropertiesToContainer(textContainerProperties, text_container)
    text_container.primaryAxisAlignItems = "MIN";
    text_container.name = 'TextFrame'
    text_container.x = 24
    text_container.y = 24    
    
    let t_hexCode = createText(`${item.color_hex.toUpperCase()}`, 20);
    t_hexCode.name = "Color Hex value";
    t_hexCode.fills = [{ color: hexToRgb(item.a11y_color), type: 'SOLID' } as SolidPaint]; // ??TEST
    text_container.appendChild(t_hexCode);
  
    let t_colorStop = createText(`${item.name} ${item.step}`, 31, { family: "Cera Pro", style: "Bold" });
    t_colorStop.name = "Color Title"
    if( parseInt(item.step) < 500 ){
        t_colorStop.fills = [color_black]
    }else{
        t_colorStop.fills = [color_white]
    }
    text_container.appendChild(t_colorStop)

    // lower text

    let text_container_low = figma.createFrame();
    container.appendChild( text_container_low );
    text_container_low.name = 'Lower Text';
    text_container_low.x = 24
    text_container_low.y = 176
    text_container_low.itemSpacing = 0;
    addPropertiesToContainer(textContainerProperties, text_container_low)
    
    let t_wcag = createText(`${item.contrast}:1\n${item.lt}\n${item.st}`);
    t_wcag.name = "WCAG 2.1"
    t_wcag.fills = [{ color: hexToRgb(item.a11y_color), type: 'SOLID' } as SolidPaint];
    text_container_low.appendChild(t_wcag);

    let t_a11yc = createText(`A11y Color: ${item.name} ${item.a11y_colorStop} ${item.a11y_meta}`, 20);
    t_a11yc.name = "A11y Color"
    t_a11yc.fills = [{ color: hexToRgb(item.a11y_color), type: 'SOLID' } as SolidPaint];
    text_container_low.appendChild(t_a11yc);    
  
    return container;
}


type ISwatchProps = {
    name: string; // "Purple"
    step: string; // 50,75,...
    color_rgb: object; // color of the rect {r:, g: b:}
    color_hex: string; // contrast color ?
    
    contrast: number; // -22.1
    lt: string; // large text rating
    st: string; // small text rating

    a11y_colorStop: string;
    a11y_color: string;
    a11y_meta: string;
}


export const drawRamp = (data, opts) => {
    console.log('$$drawRamp data', data)
    
    let parent = figma.createFrame();    
    addPropertiesToContainer(parentProperties, parent)
    parent.name = `${data.name} (${opts.colorSpace}, Generated)`;
    parent.x = figma.viewport.center.x;
    parent.y = figma.viewport.center.y;

    data.results.forEach( (_res, i) => {

        const contrastScore = getContrastScores(data.results[i].ratio);

        const item: ISwatchProps = {
            name: `${data.name}`, // "Purple"
            step: data.colorStops[i], // 50, 75 ...
            color_rgb: hexToRgb(data.results[i].color), // color of the rect
            color_hex: data.results[i].color, // contrast color ?
            
            contrast: data.results[i].ratio, // -22.1 // could also use inputRatios
            lt: `(${contrastScore.largeText}) Large Text`, // large text rating
            st: `(${contrastScore.smallText}) Small Text`, // small text rating

            ...getA11yColor( data.colorStops[i], data.colorStops, data.results )
        }
        parent.appendChild( buildBox(item) )
    })

    // append reference code
    let ref_container = figma.createFrame();
    addPropertiesToContainer(textContainerProperties, ref_container)
    ref_container.name = 'Reference Frame';
    ref_container.layoutMode = 'NONE'
    ref_container.resize(384, 288);
    parent.appendChild( ref_container )

    let t_refcode = createText(`Reference Code`, 20)
    ref_container.appendChild(t_refcode);

    let t_info = createText(`${opts.sourceString}\n\nUsing ${opts.colorSpace} Colorspace`);
    t_info.y = 36;
    t_info.resize(384, 288-36);
    t_info.textAutoResize = 'HEIGHT';
    ref_container.appendChild( t_info );
    
}


//
// the a11y mapping logic, e.g. what color to use on top of another color

type IA11yColorType = {
    a11y_colorStop: string;
    a11y_color: string;
    a11y_meta: string;
}

const a11y_map = {
    '<100': {step:"600", meta:"+"},
    '200': {step:"700",  meta:"+"},
    '300': {step:"700",  meta:"+"},
    '400': {step:"800",  meta:"+"},
    '500': {step:"50",   meta:"-"},
    '600': {step:"100",  meta:"-"},
    '700': {step:"200",  meta:"-"},
    '800': {step:"200",  meta:"-"},
    '900': {step:"300",  meta:"-"},
};
/**
 * 
 * @param step // "50" | "75" | ...
 * @param colorStops // ["50", "75", ...] 
 * @param results // results arg from the ramp
 * Find the a11y colorStop according to the table above,
 * return its key (e.g. 600), hex color and meta (e.g "+")
 */
const getA11yColor = (step: string /* 50, 75.. */, colorStops, results ):IA11yColorType  => {
    const data = parseInt(step) <= 100 ? a11y_map['<100'] : a11y_map[step];
    const index = colorStops.indexOf(data.step)
    const res = results[index]
    return {
        a11y_colorStop: data.step,
        a11y_color: res.color,
        a11y_meta: data.meta,
    }
}


function getContrastScores(contrast) {
    let largeText;
    let smallText;
    switch (true) {
        case contrast > 7:
            largeText = 'AAA';
            smallText = 'AAA';
            break;
        case contrast >= 4.5:
            largeText = 'AAA';
            smallText = 'AA';
            break;
        case contrast >= 3:
            largeText = 'AA';
            smallText = 'N/A';
            break;
        default:
            largeText = 'N/A';
            smallText = 'N/A';
            break;
    }
    return { largeText, smallText };
}