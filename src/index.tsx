import * as React from 'react';

// Delete me
export const Thing = () => {


  React.useEffect(() => {
    console.log('>* ', ref)
    // Styles
    if(ref.current?.style){

      ref.current.style.overflowY = 'auto';
    }
    // Events
    ref.current?.addEventListener('input', (e: any) => {
      const target: HTMLElement = e.target
      console.log('Hwllo',target.textContent)
      insertHtml();
      
    })

   

    ref.current?.addEventListener('keypress', () => {
      console.log('key press')
    })

    ref.current?.addEventListener('keyup', () => {
      console.log('key up')
    })
    ref.current?.addEventListener('keydown', () => {
      console.log('key down')
    })
    ref.current?.addEventListener('paste', (e:any) => {
      console.log('paste', e.clipboardData.getData('text/plain'))
      e.preventDefault()
      let text = e.clipboardData.getData('text/plain')
      console.log(text,'%%')
      document.execCommand('insertText', false, text)

    })

    // Clear function 

    return () => {
      console.log('clean ')
    }
  },[])

  const ref = React.useRef<HTMLDivElement>(null)
  function handleChange(e:React.ChangeEvent<HTMLDivElement>) {
    console.log('Change ', e.target)
  }


  function insertHtml() {
    const el: HTMLElement | null = ref.current;
    if(!el) return 
    const text:string = String(el.textContent);
    console.log(text)
    var html = text.replace(/#([^ ]+)/g, '<span class="spell">#$1</span>');
  
    el.innerHTML = html
  }
  return (
  <div>
    <div ref={ref} spellCheck={false} lang="en" style={{border:"1px solid blue", height:"300px"}} contentEditable onChange={handleChange} >the snozzberries taste like snozzberries</div>;
    <button onClick={() => {
      insertHtml()
    }}>Hello</button>
  </div>)
};
