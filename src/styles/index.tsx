
import styled  from 'styled-components';

export const HTContainer = styled.div`
  position: relative;
  width:100%;
  min-height:150px;
  border:2px solid blue;
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