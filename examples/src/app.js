import React ,{PureComponent} from 'react';
import ReactDOM from 'react-dom';
import DragWrapper from '@';
import { Input, Button, Select } from 'antd';

const {DragItem} = DragWrapper;
import './index.less';

class Wrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [<Input value='111s'></Input>,<Input></Input>,<Button>123123</Button>,<Input></Input>,<Select></Select>,<Select></Select>]
    };
  }

  dragChange = (...args) => {
    console.log(args);
  };

  render() {
    const { dataSource } = this.state;
    return (
      <DragWrapper onChange={this.dragChange} dataSource={dataSource} layout='horizontal'>
        {
        dataSource.map((item,index) => (
          <DragItem  key={index} ItemClass='drag_Item' >
            {item}
          </DragItem>
        ))
        }
      </DragWrapper>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById('root'));
