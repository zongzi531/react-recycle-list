import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RecycleList from './components';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const data = new Array(100).fill('node').map((value, index) => `${value} (${index + 1})`);

const childrenHeight = (child?: React.ReactNode | any) => {
  if (child && child.props.className === 'example-node') {
    return 60
  }
  return 19
}

ReactDOM.render(
  <React.Fragment>
    <h1 className="title">Recycle List</h1>
    <RecycleList childrenHeight={childrenHeight} className="content">
      {/* <div className="example-node">Boxin Node 1</div> */}
      {
        data.map((value, index) => {
          return (
            <div key={index} style={{
              fontSize: '14px',
              lineHeight: '19px',
            }}>{value}</div>
          )
        })
      }
      {/* <div className="example-node">Boxin Node 2</div> */}
    </RecycleList>
  </React.Fragment>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
