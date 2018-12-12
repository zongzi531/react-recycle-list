import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RecycleList from './components/RecycleList';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const data = new Array(100000).fill('node').map((value, index) => `${value} (${index + 1})`);

ReactDOM.render(
  <React.Fragment>
    <h1 className="title">Recycle List</h1>
    <div className="content">
      <RecycleList data={data} childrenHeight={19} />
    </div>
  </React.Fragment>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
