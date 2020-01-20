## 简介
一个拖拽布局的组件
#### 使用效果
对一些需要拖拽布局的场景可能会有用
![Alt text](https://github.com/externalFa/About-interview/blob/master/img/Untitled.gif?raw=true)
#### 下载
```npm
npm install @lianjia/drag-layout --save
```
#### 使用方法
```javascript
import DragWrapper from '@lianjia/drag-layout';
const {DragItem} = DragWrapper;

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
        <DragWrapper onChange={this.dragChange} dataSource={dataSource} layout='horizontal' tag={1}>
          {dataSource.map((item, index) => (
            <DragItem key={index} ItemClass='drag_Item' tag={1}>
              {item}
            </DragItem>
          ))}
        </DragWrapper>
        <DragWrapper onChange={this.dragChange} dataSource={dataSource} layout='horizontal' tag={2}>
          {dataSource.map((item, index) => (
            <DragItem key={index} ItemClass='drag_Item' tag={2}>
              {item}
            </DragItem>
          ))}
        </DragWrapper>
      </React.Fragment>
    );
  }
}
```

#### DragWrapper的属性说明
属性 | 说明 | 类型 | 默认值
------------ | ------------- | ------------ | ------------
layout | DragItem的布局，horizontal为水平布局，vertical为垂直布局  | String | horizontal
wrapperClass |  DragWrapper的外层className | String | -
onChange | 当拖拽布局发生变化时的回调函数。回调的参数有两个 (dataSource,order) => void,第一个参数是拖拽排序后的dataSource，第二个是拖拽排序后的序号  | function | -
dataSource | 生成dragItem的数据源（必填）  | Array | []
mark | 当一个页面有多个DragWrapper时，这个参数用作区分不同的DragWrapper。当有多个DragWrapper时，这个参数时必填且唯一的。  | String（Number） | 1

#### DragItem的属性说明

属性 | 说明 | 类型 | 默认值
------------ | ------------- | ------------ | ------------
ItemClass | DragItem的外层className  | String | -
onDragEnd |  拖拽结束回调事件 | (event) => void | -
draggable | DragItem是否可拖拽 | boolean | true
onClick |  点击回调事件 | (event) => void |[]
onDragEnter | dragEnter的回调事件  | (event) => void | 1
onDragStart | DragStart回调事件  | (event) => void | []
mark | 当一个页面有多个DragWrapper时，这个参数用作区分不同的DragWrapper。当有多个DragWrapper时，这个参数时必填且唯一的。  | String（Number） | 1


#### 注意事项
1.当一个页面有多个wrapper时，DragWrapper和DragItem必须有mark参数且DragWrapper间mark值不同，否则页面会白屏。
2.drag事件发生了就会触发onChange回调（正在解决）
3.有问题联系jiangpanlei001@ke.com




