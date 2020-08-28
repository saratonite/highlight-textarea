import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HighlightTextArea } from '../.';

const App = () => {

  const [show, showEditor] = React.useState(true)

  const [text, setText] = React.useState('red,green,blue,മലയാളം,⚡️⚡️⚡️')

  const words: string[] = text.split(',').map(t => t.trim())
  return (
    <div className="max-w-xl mx-auto"> 
      <h1 className="text-3xl text-teal-300">Highight Text Area Component </h1>
      <div className="my-2 flex items-center">

      <label className="text-blue-500">Highight words : </label>
      <input className="px-2 py-1 text-lg border border-indigo-400 rounded-ml text-red-400 flex-grow " value={text} onChange={e => setText(e.target.value)} />
      </div>
      {show && <HighlightTextArea
      highlightWords={words}
      defaultValue="red flowers, blue sky, green trees മലയാളം ⚡️⚡️⚡️ ⚡️⚡️⚡️⚡️⚡️⚡️"/>}

      <button className="bg-green-500 px-3 py-2 rounded text-white text-sm mt-3 hover:bg-green-600" onClick={() => showEditor(!show)}>Toggle Editor</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
