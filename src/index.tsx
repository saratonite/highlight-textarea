import * as React from 'react';
import { HTContainer, HTBackdrop, HTGhost, HTTextArea, HTPopup } from './lib/styles'
import { compileText } from './lib/text-process'

let hWords: string[]= []

interface HTProps {
  defaultValue:string
  highlightWords: string[]
  onMarkSelect?(event:MouseEvent, word: string | undefined): void
}

interface IPopupState {
  show: boolean
  x?: number
  y?: number
  srcElementIndex: number
}

const suggessions = ['One','Two','Three']

export const HighlightTextArea: React.FC<HTProps> = ({defaultValue = '', highlightWords = [], onMarkSelect }) => {

  const ghost = React.useRef<HTMLDivElement>(null)
  const editor= React.useRef<HTMLTextAreaElement>(null)
  const backdrop = React.useRef<HTMLDivElement>(null)

  const [popup,setPopup] = React.useState<IPopupState>({show: false, x:20, y:20, srcElementIndex: -1})

  function  showPopup(x:number,y:number,index: number) {
    setPopup({show:true, x,y,srcElementIndex:index})
  }
  function hidePopup() {
    setPopup({show:false, srcElementIndex:-1})
  }
  

  function syncScroll() {

    if(backdrop.current) {
      backdrop.current.scrollTop = editor.current?.scrollTop || 0;
    
    }
  }

  function handleSuggessionClick(suggestedWord:any) {

    if(ghost.current && editor.current && popup.srcElementIndex > -1) {

      let prevElement  = ghost.current.children[popup.srcElementIndex]

      let _spanEl:HTMLElement = document.createElement('span');
      _spanEl.textContent = suggestedWord

      
      ghost.current?.replaceChild(_spanEl, prevElement)

      // Dispatch onChange event

      let nativeInput= Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")
      let nativeInputValueSetter = nativeInput?.set
      nativeInputValueSetter?.call(editor.current,ghost.current.textContent || '');

      var changeEvent = new Event('change', { bubbles: true});
      editor.current.dispatchEvent(changeEvent);

      

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

  

    if(ghost.current) {
      
      ghost.current.innerHTML = compileText(defaultValue, highlightWords)
      ghost.current.addEventListener('click', (e:MouseEvent)=> {
  
        const element: HTMLElement  = (e.target as HTMLElement)
        
        e.preventDefault();
        
        if(element.tagName === `SPAN`){
          const { word  } = element.dataset
          if(onMarkSelect ) onMarkSelect(e, word);          
          
          if(ghost.current && editor.current) {
            const elementIndex = Array.prototype.indexOf.call(ghost.current.children, element);
            const elemRect = element.getBoundingClientRect()
            let x = elemRect.left;// - ghostRect.left
            let y = elemRect.top + (elemRect.height - 4);
            showPopup(x,y,elementIndex);
          }

          return 
        }
        e.stopPropagation();
      }, false)
    }

    return function () {

     // TODO: Remove all event listeners
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
     {popup.show && <HTPopup x={popup.x} y={popup.y} onMouseLeave={() => hidePopup()}>
  { suggessions && suggessions.length && suggessions.map(s => <p onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSuggessionClick(s)}} key={s}>{s}</p>) }
     </HTPopup>}
  </HTContainer>)
};
