import * as React from 'react';


function compileText(text:string, words:string[]): string {

  let input:string = text;
  input = input.replace(/\n(\{\{\}\})?$/, '\n\n$1');

 // encode HTML entities
 input = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
 
  words.forEach((word) => {
   //let reg = new RegExp('\\b'+word+'\\b','g'); // The word boundry (\b) not working with non latin chars
   let reg = new RegExp('(?<=[\\s,.:;"\']|^)'+ word +'(?=[\\s,.:;"\']|$)','g');
   input = input.replace(reg, '<span class="ht-spell" onclick="alert(0)">'+word+'</span>');

  })

  return input
}

let hWords: string[]= []

// Delete me
export const HighlightTextArea = ({defaultValue = '', highlightWords = []}) => {

  const ghost = React.useRef<HTMLDivElement>(null)
  const editor= React.useRef<HTMLTextAreaElement>(null)
  const backdrop = React.useRef<HTMLDivElement>(null)
  

  function syncScroll() {

    if(backdrop.current) {
      backdrop.current.scrollTop = editor.current?.scrollTop || 0;
    
    }
  }



  React.useEffect(() => {
    if(editor.current){
      editor.current.addEventListener('scroll', syncScroll, false)
      editor.current.addEventListener('input', (e:any) => {
        const { value } = e.target

        if(ghost.current) {
          ghost.current.innerHTML = compileText(value, hWords)
        }
      }, false)
    }

    // set Default value

    if(ghost.current) {
      
      ghost.current.innerHTML = compileText(defaultValue, highlightWords)
    }

  
  },[])


  React.useEffect(() => {

    if(ghost.current && editor.current) {
      ghost.current.innerHTML = compileText(editor.current?.value, highlightWords)
      hWords = highlightWords
    }

  },[highlightWords])
    
  return (
  <div className="ht-containers" >
    <div ref={backdrop} className="ht-backdrop">
      <div className='ht-ghost' ref={ghost}>e</div>
    </div>
    
    <textarea defaultValue={defaultValue} 
      className="ht-textarea"
      spellCheck={false} 
     ref={editor} style={{}}></textarea>
  </div>)
};
