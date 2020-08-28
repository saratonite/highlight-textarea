import * as React from 'react';
import { HTContainer, HTBackdrop, HTGhost, HTTextArea } from './styles'
import { compileText } from './lib/text-process'

let hWords: string[]= []

interface HTProps {
  defaultValue:string
   highlightWords: string[]
   onMarkSelect?(event:MouseEvent, word: string | undefined): void
}

export const HighlightTextArea: React.FC<HTProps> = ({defaultValue = '', highlightWords = [], onMarkSelect }) => {

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
      ghost.current.addEventListener('click', (e:MouseEvent)=> {
  
        const element: HTMLElement  = (e.target as HTMLElement)
        
        if(element.tagName === `SPAN`){
          const { word  } = element.dataset
          if(onMarkSelect ) onMarkSelect(e, word);
          let newWord = prompt(`Replace ${word} with :`)

          let _spanEl: HTMLElement =  document.createElement('span')
          _spanEl.textContent = newWord;
          ghost.current?.replaceChild(_spanEl, element)

          if(editor.current) {
            editor.current.value = ghost.current?.textContent || ''
            // Trigger Change Event

            let _editorInputEvent = document.createEvent("HTMLEvents");
            _editorInputEvent.initEvent("input", true, true);
            editor.current.dispatchEvent(_editorInputEvent);
           
           
          }

          return 
        }
        e.stopPropagation();
      }, false)
    }


  
  },[])


  React.useEffect(() => {

    if(ghost.current && editor.current) {
      ghost.current.innerHTML = compileText(editor.current?.value, highlightWords)
      hWords = highlightWords
    }

  },[highlightWords])
    
  return (
  <HTContainer>
    <HTBackdrop ref={backdrop}>
      <HTGhost  ref={ghost}></HTGhost>
    </HTBackdrop>
    <HTTextArea defaultValue={defaultValue}
      onChange={(e) => console.log('Text area change',e.target.value)}
      className="ht-textarea"
      spellCheck={false} 
     ref={editor} style={{}}></HTTextArea>
  </HTContainer>)
};
