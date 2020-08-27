import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HighlightTextArea } from '../.';

const App = () => {

  const [text, setText] = React.useState('red,green,blue,മലയാളം,⚡️⚡️⚡️')

  const words: string[] = text.split(',').map(t => t.trim())
  return (
    <div className="max-w-xl mx-auto"> 
      <h1 className="text-3xl text-teal-300">Highight Text Area Component </h1>
      <div className="my-2 flex items-center">

      <label className="text-blue-500">Highight words : </label>
      <input className="px-2 py-1 text-lg border border-indigo-400 rounded-ml text-red-400 flex-grow " value={text} onChange={e => setText(e.target.value)} />
      </div>
      <HighlightTextArea
      highlightWords={words}
      defaultValue="red flowers, blue sky, green trees മലയാളം ⚡️⚡️⚡️ ⚡️⚡️⚡️⚡️⚡️⚡️"/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
