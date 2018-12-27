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
      <div className="example-node">Boxin Node 1</div>
      <RecycleList data={data} childrenHeight={19} />
      <div className="example-node">Boxin Node 2</div>
    </div>
  </React.Fragment>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
