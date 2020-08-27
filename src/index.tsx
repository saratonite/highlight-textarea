import * as React from 'react';
import styled  from 'styled-components';

const HTContainer = styled.div`
  position: relative;
  width:100%;
  min-height:150px;
  border:2px solid blue;
  overflow-x:hidden;
  overflow-y:hidden;
  background-color: #fff;
`

const HTBackdrop = styled.div`
   position: absolute !important;
    top: 0 !important;
    right: -99px !important;
    bottom: 0 !important;
    left: 0 !important;
    padding-right: 99px !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
`
const HTTextArea = styled.textarea`
   padding: 0;
    margin: 0;
    height: 100%;
    width:100%;
    position: absolute;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    background-color: transparent;
    /* box-sizing: border-box; */
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    border: none;
    letter-spacing: normal;
    word-spacing: normal;
    resize: none;
    outline: none;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
`

const HTGhost = styled.div`
width: auto !important;
    height: auto !important;
    border-color: transparent !important;
    color: transparent !important;
    overflow: hidden !important;
    background-color: transparent;

    /* Font related  */
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    border: none;
    letter-spacing: normal;
    word-spacing: normal;
    resize: none;
    outline: none;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;

    .ht-spell {
      position: relative;
      cursor: pointer;
      display: inline-block;
      background-color: rgb(255 224 224);

      &::After {
        content: '';
      position: absolute;
      left: 0;
      bottom: 2px;
      width:100%;
      height: 2px;
      background-color: #f56;
      z-index: 1;
      }
    }
   
`


function compileText(text:string, words:string[], id=""): string {

  let input:string = text;
  input = input.replace(/\n(\{\{\}\})?$/, '\n\n$1');

 // encode HTML entities
 input = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
 
  words.forEach((word) => {
   //let reg = new RegExp('\\b'+word+'\\b','g'); // The word boundry (\b) not working with non latin chars
   let reg = new RegExp('(?<=[\\s,.:;"\']|^)'+ word +'(?=[\\s,.:;"\']|$)','g');
   input = input.replace(reg, `<span class="ht-spell" id="mark_${id}" data-word="${word}">${word}</span>`);

  })

  return input
}

let hWords: string[]= []

interface HTProps {
  defaultValue:string
   highlightWords: string[]
   id:string
   onMarkSelect?(event:MouseEvent, word: string | undefined): void
}

export const HighlightTextArea: React.FC<HTProps> = ({defaultValue = '', highlightWords = [],id="", onMarkSelect }) => {

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

        console.log('editor input')

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
        
        if(element.id === `mark_${id}`){
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
            _editorInputEvent.initEvent("input", false, true);
            editor.current.dispatchEvent(_editorInputEvent);

            let  nativeInputValue = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,"value")
            if(nativeInputValue) {

              let nativeInputSetter = nativeInputValue.set
              nativeInputSetter?.call(editor.current,'ddd');
              var ev2 = new Event('input', { bubbles: true});
              editor.current.dispatchEvent(ev2);
            }
           
           
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
      id={id} 
      className="ht-textarea"
      spellCheck={false} 
     ref={editor} style={{}}></HTTextArea>
  </HTContainer>)
};
