import { generateRamp, IRampProps } from './generateRamp';
import { drawRamp } from './drawRamp';

const LS_KEY = 'klik-adaptive-colors-storagekey-001'

figma.loadFontAsync({ family: "Roboto", style: "Regular" });
figma.loadFontAsync({ family: "Cera Pro", style: "Medium" });
figma.loadFontAsync({ family: "Cera Pro", style: "Bold" });

interface IMessage {
  type: 'cacheSet' | 'cacheGet' | 'generate';
  payload?: any;
}

figma.ui.onmessage = (msg:IMessage) => {

  if( msg.type === 'cacheSet' ){
    console.log('PLUG cacheSet', msg)
    figma.clientStorage.setAsync(LS_KEY, msg.payload);
  }
  if( msg.type === 'cacheGet' ){
    console.log('PLUG cacheGet', msg)
    figma.clientStorage.getAsync(LS_KEY).then( res => {
      console.log('PLUG cacheGet then', res)
      figma.ui.postMessage({type:'cacheGetResponse', payload:res})
    })
  }
  if( msg.type === 'generate' ){
    console.log('PLUG generate', msg)
    const opts: IRampProps = msg.payload;
    figma.closePlugin();
    return drawRamp( generateRamp(opts), opts );  
  }
}

figma.showUI(__html__, {visible: true, height: 525});
