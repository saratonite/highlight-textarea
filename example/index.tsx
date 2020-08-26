import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Thing } from '../.';

const App = () => {
  return (
    <div> 
      <h1>Type Hashtags : </h1>
      
      <Thing />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
