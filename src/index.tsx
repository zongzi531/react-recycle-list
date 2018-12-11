import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RecycleList from './components/RecycleList';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const data = new Array(100).fill('node').map((value, index) => value + (index + 1))

ReactDOM.render(
  <React.Fragment>
    <RecycleList data={data} childrenHeight={21} />
  </React.Fragment>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
