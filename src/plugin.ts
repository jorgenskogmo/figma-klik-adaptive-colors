
import { generateRamp, IRampProps } from './generateRamp';
import { drawRamp } from './drawRamp';

figma.loadFontAsync({ family: "Roboto", style: "Regular" });
figma.loadFontAsync({ family: "Cera Pro", style: "Medium" });
figma.loadFontAsync({ family: "Cera Pro", style: "Bold" });

figma.ui.onmessage = (opts : IRampProps) => {
  figma.closePlugin();
  return drawRamp( generateRamp(opts), opts );
};

figma.showUI(__html__, {visible: true, height: 240});
