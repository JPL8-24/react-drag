import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import DragWrapper from '@';
// import { Input, Button, Select } from 'antd';

const { DragItem } = DragWrapper;
import './index.less';

class Wrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [11,22,33,44,55]
    };
  }

  dragChange = (...args) => {
    console.log(args);
  };

  render() {
    const { dataSource } = this.state;
    return (
      <React.Fragment>
        <DragWrapper onChange={this.dragChange} dataSource={dataSource} layout='horizontal' mark={1}>
          {dataSource.map((item, index) => (
            <DragItem key={index} ItemClass='drag_Item' mark={1}>
              {item}
            </DragItem>
          ))}
        </DragWrapper>
        <DragWrapper onChange={this.dragChange} dataSource={dataSource} layout='horizontal' mark={2}>
          {dataSource.map((item, index) => (
            <DragItem key={index} ItemClass='drag_Item' mark={2}>
              {item}
            </DragItem>
          ))}
        </DragWrapper>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById('root'));
