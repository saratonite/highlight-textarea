export function compileText(text:string, words:string[]): string {

    let input:string = text;
    input = input.replace(/\n(\{\{\}\})?$/, '\n\n$1');
  
   // encode HTML entities
   input = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
   
    words.forEach((word) => {
     //let reg = new RegExp('\\b'+word+'\\b','g'); // The word boundry (\b) not working with non latin chars
     let reg = new RegExp('(?<=[\\s,.:;"\']|^)'+ word +'(?=[\\s,.:;"\']|$)','g');//TODO: This word boundry regwx won't work in safari
     input = input.replace(reg, `<span class="ht-spell" data-word="${word}">${word}</span>`);
  
    })
  
    return input
  }