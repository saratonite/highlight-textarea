import * as React from 'react';

// Delete me
export const Thing = () => {

  const ghost = React.useRef<HTMLDivElement>(null)
  const editor= React.useRef<HTMLTextAreaElement>(null)
  const backdrop = React.useRef<HTMLDivElement>(null)
  

  function syncScroll() {

    if(backdrop.current) {
      backdrop.current.scrollTop = editor.current?.scrollTop || 0;
      ///ghost.current.style = editor.current?.style
    }
  }

  React.useEffect(() => {
    if(editor.current){
      editor.current.addEventListener('scroll', syncScroll, false)
      //editor.current.addEventListener('input', syncScroll, false)
    }

  
  },[])
    
  return (
  <div style={{ position: "relative", width:"100%", height:"300px", border:"2px solid blue", overflowX:"hidden", overflowY:"hidden"}}>
    <div ref={backdrop} className="backdrop">
      <div className='ghost' ref={ghost}>e</div>
    </div>
    
    <textarea lang="ml" spellCheck={false}  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
       //console.log(e.target.value)
       if(ghost.current) {

        const { value } = e.target
        let input:string = value;
         input = input.replace(/\n(\{\{hwt-mark-stop\}\})?$/, '\n\n$1');

        // encode HTML entities
			  input = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        input = input.replace(/#([^ \n]+)/g, '<span class="spell">#$1</span>');
        

        //console.log('Prsed', newLineParse)
        
        ghost.current.innerHTML = input
      }
    }} ref={editor} style={{}}></textarea>
  </div>)
};
