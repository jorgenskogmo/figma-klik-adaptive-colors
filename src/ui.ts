
// import { IRampProps } from './generateRamp'

const DEFAULT_INPUT = 'https://leonardocolor.io/?colorKeys=%234c2f92%2C%23000000&base=e2dded&ratios=-1.2%2C-1.12%2C1%2C1.24%2C1.52%2C1.92%2C3%2C4.64%2C6.96%2C8.8%2C11.52&mode=RGB&colorScheme=Purple&colorStops=50%2C75%2C100%2C200%2C300%2C400%2C500%2C600%2C700%2C800%2C900'

let el_btn, el_textbox, el_mode, el_error;

window.onmessage = (event) => {
  console.log('UI onmessage', event.data.pluginMessage)

  const msg = event.data.pluginMessage;

  if( msg.type === 'cacheGetResponse' ){
    el_textbox.value = msg.payload || DEFAULT_INPUT;
  }
}


document.addEventListener(
  'DOMContentLoaded',
  ($event: Event) => {
    
    console.log('DOMContentLoaded')
    
    el_textbox = document.querySelector('#textbox');
    el_mode    = document.querySelector('#mode');
    el_btn     = document.querySelector('#btn-generate');
    el_error   = document.querySelector('#errors');

    parent.postMessage({ pluginMessage: {type:'cacheGet'} }, '*')

    el_btn.addEventListener('click', () => {
      console.log('generate')

      const text = el_textbox.value
      const mode = el_mode.options[ el_mode.selectedIndex ].value

      parent.postMessage({ pluginMessage: {type:'cacheSet', payload:text} }, '*')

      let data = parseInput(text)

      if( mode !== 'NONE' ){
        data.colorSpace = mode;
      }

      data.sourceString = text;

      // parent.postMessage({ pluginMessage: data }, '*')
      parent.postMessage({ pluginMessage: {type:'generate', payload:data} }, '*')
    });

  },
  {once: true}
);



const showError = errorMessage => {
  el_error.textContent = errorMessage
}

const parseInput = (str) => {
  //str = "https://leonardocolor.io/?colorKeys=%234c2f92%2C%23000000&base=e2dded&ratios=-1.2%2C-1.12%2C1%2C1.24%2C1.52%2C1.92%2C3%2C4.64%2C6.96%2C8.8%2C11.52&mode=RGB&colorScheme=Purple&colorStops=50%2C75%2C100%2C200%2C300%2C400%2C500%2C600%2C700%2C800%2C900"

  //str = "?colorKeys=%234c2f92%2C%23000000&base=e2dded&ratios=-1.2%2C-1.12%2C1%2C1.24%2C1.52%2C1.92%2C3%2C4.64%2C6.96%2C8.8%2C11.52&mode=RGB&colorScheme=Purple&colorStops=50%2C75%2C100%2C200%2C300%2C400%2C500%2C600%2C700%2C800%2C900"
  
  //str = "colorKeys=%234c2f92%2C%23000000&base=e2dded&ratios=-1.2%2C-1.12%2C1%2C1.24%2C1.52%2C1.92%2C3%2C4.64%2C6.96%2C8.8%2C11.52&mode=RGB&colorScheme=Purple&colorStops=50%2C75%2C100%2C200%2C300%2C400%2C500%2C600%2C700%2C800%2C900"

  try {
    str = str.replace('https://leonardocolor.io/?', '')
    str = str[0] === '?' ? str.substr(1) : str
  }catch( e ){
    showError('Invalid input')
    return;
  }

  const params = parseQuery(str)
  params.inputRatios = params.ratios.split(',');
  params.colorStops = params.colorStops.split(',');
  params.colorKeys = params.colorKeys.split(',');
  params.base = ensureHex6(params.base);
  params.baseColor = params.base;
  params.colorSpace = params.mode;

  console.log('$params:', params)
  
  return params
}

const parseQuery = (queryString) => {
  const query = {};
  const pairs = queryString.split('&');
  for(let i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

const ensureHex6 = (str) => {
  if (str.startsWith('#') !== true && str.length === 3) {
    str = '#' + str;
  }
  if (str.startsWith('#') !== true && str.length === 6) {
    str = '#' + str;
  }
  return str;
}