// conf



const parentProperties = {
    // layoutMode: "VERTICAL",
    layoutMode: "HORIZONTAL",
    fills: [],
    itemSpacing: 16,
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
    itemSpacing: 8,
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
    layoutAlign: "STRETCH",
    primaryAxisAlignItems: "SPACE_BETWEEN",
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
    
const color_black = {color: hexToRgb('#141414'), type: 'SOLID'} as SolidPaint;
const color_white = {color: hexToRgb('#ffffff'), type: 'SOLID'} as SolidPaint;

const buildBox = (item: ISwatchProps) => {
    let container = figma.createFrame();
    addPropertiesToContainer(containerProperties, container)
    container.name = 'ContainerFrame'
    container.layoutMode = 'NONE'
    container.resize(384, 288);
      
    let rect_container = figma.createFrame();
    addPropertiesToContainer(containerProperties, rect_container)
    rect_container.name = 'RectFrame'
    rect_container.x = 0
    rect_container.y = 0

    let text_container = figma.createFrame();
    addPropertiesToContainer(textContainerProperties, text_container)
    text_container.name = 'TextFrame'
    text_container.x = 24
    text_container.y = 24
    
    let rect = figma.createRectangle();
    rect.resize(384, 288);
    rect.cornerRadius = 12;
    rect.name = `Rect ${item.color_hex}`;
    rect.fills = [{ color: item.color_rgb, type: 'SOLID' } as SolidPaint];
    rect_container.appendChild(rect)  
  
    let t_hexCode = figma.createText();
    t_hexCode.characters = `${item.color_hex.toUpperCase()}`
    t_hexCode.fontSize = 20;
    t_hexCode.fontName = { family: "Cera Pro", style: "Medium" };
    text_container.appendChild(t_hexCode)  
  
    let t_colorStop = figma.createText();
    t_colorStop.characters = `${item.name} ${item.step}`;
    t_colorStop.fontSize = 31;
    t_colorStop.fontName = { family: "Cera Pro", style: "Bold" };
    if( parseInt(item.step) < 600 ){
        t_colorStop.fills = [color_black]
    }else{
        t_colorStop.fills = [color_white]
    }
    text_container.appendChild(t_colorStop)


    let t_contrastCode = figma.createText();
    t_contrastCode.characters = `${item.contrast}:1`
    t_contrastCode.fontSize = 12;
    t_contrastCode.fontName = { family: "Cera Pro", style: "Medium" };
    text_container.appendChild(t_contrastCode)
  
    
    container.appendChild(rect_container)
    container.appendChild(text_container)
  
    return container
}


type ISwatchProps = {
    name: string; // "Purple"
    step: string; // 50,75,...
    color_rgb: object; // color of the rect {r:, g: b:}
    color_hex: string; // contrast color ?
    
    contrast: number; // -22.1
    lt: string; // large text rating
    st: string; // small text rating
    a11yc: string; // Purple 800 (mixmatch)
}  
  
  
export const drawRamp = data => {
    console.log('$$drawRamp data', data)
    
    let parent = figma.createFrame();    
    addPropertiesToContainer(parentProperties, parent)
    parent.x = figma.viewport.center.x;
    parent.y = figma.viewport.center.y;

    data.results.forEach( (_res, i) => {
        const item: ISwatchProps = {
            name: `${data.name}`, // "Purple"
            step: data.colorStops[i], // 50, 75 ...
            color_rgb: hexToRgb(data.results[i].color), // color of the rect
            color_hex: data.results[i].color, // contrast color ?
            
            contrast: data.results[i].ratio, // -22.1 // could also use inputRatios
            lt: 'large text rating', // large text rating
            st: 'small text rating', // small text rating
            a11yc: 'todo', // Purple 800 (mixmatch)
        }
        parent.appendChild( buildBox(item) )
    })
}

