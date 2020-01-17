import React, { PureComponent, createRef } from 'react';
import EventEmitter from '../../utils/eventEmitter';
import DragItem from '../DragItem';
import propTypes from 'prop-types';

class DragWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fromDom: null,
      toDom: null,
      dragChildren: []
    };
    this.wrapperRef = createRef();
  }

  static defaultProps = {
    layout:'horizontal',
    wrapperClass:''
  }

  static DragItem = DragItem;

  componentWillMount() {
    //监听子组件方法
    EventEmitter.on('dragStart', this.DragStart);
    EventEmitter.on('dragEnd', this.DragEnd);
    EventEmitter.on('dragEnter', this.DragEnter);
    EventEmitter.on('pullChild', this.PullChild);
  }

  DragStart = (vnode) => {
    this.setState({
      fromDom: vnode
    });
  };

  DragEnter = (vnode) => {
    this.setState(
      {
        toDom: vnode
      },
      () => {
        const { fromDom, toDom } = this.state;
        if (fromDom === toDom) {
          return;
        }
        if (this.isPrevNode(fromDom, toDom)) {
          this.wrapperRef.current.insertBefore(fromDom, toDom);
        } else {
          this.wrapperRef.current.insertBefore(fromDom, toDom.nextSibling);
        }
      }
    );
  };

  PullChild = (child) => {
    const { dragChildren } = this.state;
    dragChildren.push(child);
    this.setState({
      dragChildren: dragChildren
    });
  };

  DragEnd = (vnode) => {
    const { dragChildren } = this.state;
    const realDom = Array.from(this.wrapperRef.current.children);
    this.getDataOrder(realDom, dragChildren);
  };

  isPrevNode = (fromVnode, toVnode) => {
    while (fromVnode.previousSibling !== null) {
      if (fromVnode.previousSibling === toVnode) {
        return true;
      }
      fromVnode = fromVnode.previousSibling;
    }
  };

  getDataOrder(realList, dragBeforeList) {
    const { dataSource } = this.props;
    const order = realList.map((realItem) => {
      // 拿到打乱Dom树对应的序号
      return dragBeforeList.findIndex((dragItem) => realItem === dragItem);
    });
    const newData = [];
    order.forEach((item, i) => {
      // 将原数组的数据按照打乱的序号赋值给新数组
      newData[i] = dataSource[item];
    });
    this.setState({
      dragChildren:realList
    });
    this.props.onChange(newData,order); // 新数组的顺序就对应打乱Dom的序号，派发出去
  }

  render() {
    return (
      <div className={`${this.props.layout} ${this.props.wrapperClass}`} ref={this.wrapperRef}>
        {this.props.children}
      </div>
    );
  }
}

DragWrapper.propTypes = {
  layout:propTypes.string,
  wrapperClass:propTypes.string
};

export default DragWrapper;
