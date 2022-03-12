
import { generateRamp } from './generateRamp';
import { drawRamp } from './drawRamp';


figma.loadFontAsync({ family: "Roboto", style: "Regular" });

figma.loadFontAsync({ family: "Cera Pro", style: "Medium" });
figma.loadFontAsync({ family: "Cera Pro", style: "Bold" });

figma.ui.onmessage = (opts) => {
  console.log('$$plugin opts:', opts)

  const data = generateRamp(opts)
  console.log('$$data:', data)

  const art = drawRamp( data );

  figma.closePlugin();

  return art;
};

figma.showUI(__html__, {visible: true, height: 240});
