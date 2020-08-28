
import styled from 'styled-components';

export const HTContainer = styled.div`
  position: relative;
  width:100%;
  min-height:150px;
  border:2px solid #e2e8f0;
  overflow-x:hidden;
  overflow-y:hidden;
  background-color: #fff;
`

export const HTBackdrop = styled.div`
   position: absolute !important;
    top: 0 !important;
    right: -99px !important;
    bottom: 0 !important;
    left: 0 !important;
    padding-right: 99px !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
`
export const HTTextArea = styled.textarea`
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
    padding: 3px;
`

export const HTGhost = styled.div`
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
    padding: 3px;

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
      z-index: 2;
      }
    }
   
`


export const HTPopup = styled.div<{x?: number, y?:number}>`
    position: fixed;
    min-width: 100px;
    background-color: #fff;
    border: 1px solid #ccc;
    z-index: 9999;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    top:${p => p.y}px;
    left:${p=> p.x}px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-size: .8rem;
    color: #4a5568;
    & > p {
        border-bottom: 1px solid #ededed;
        padding:3px 4px;
        cursor: pointer;
        &:hover {
            color:#2b6cb0;
        }
        &:last-child {
            border-bottom: none
        }
    }
`