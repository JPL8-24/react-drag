import React, { PureComponent, createRef } from 'react';
import EventEmitter from '../../utils/eventEmitter';
import PropTypes from 'prop-types';

class DragItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.dragItmeRef = createRef();
  }

  static defaultProps ={
    draggable:true,
    ItemClass:'',
    mark:1
  }

  DragStart = () => {
    this.dragItmeRef.current.style.opacity = 0.3;
    const {mark} = this.props;
    EventEmitter.emit(`dragStart_${mark}`, this.dragItmeRef.current);
    if(this.props.onDragStart) {
      this.props.onDragStart();
    }
  };

  DragEnd = () => {
    this.dragItmeRef.current.style.opacity = 1;
    const {mark} = this.props;
    EventEmitter.emit(`dragEnd_${mark}`, this.dragItmeRef.current);
    if(this.props.onDragEnd) {
      this.props.onDragEnd();
    }
  };

  DragEnter = () => {
    const {mark} = this.props;
    EventEmitter.emit(`dragEnter_${mark}`, this.dragItmeRef.current);
    if(this.props.onDragEnter) {
      this.props.onDragEnter();
    }
  };

  handleClick = (e) => {
    console.log(e);
    if(this.props.onClick) {
      this.props.onClick();
    }
  }

  componentDidMount() {
    const {mark} = this.props;
    EventEmitter.emit(`pullChild_${mark}`,this.dragItmeRef.current)
  }

  render() {
    return (
      <div className={`DragItem ${this.props.ItemClass}`} 
        draggable={this.props.draggable} 
        ref={this.dragItmeRef} 
        onClick = {this.handleClick}
        onDragStart={this.DragStart} 
        onDragEnd={this.DragEnd} 
        onDragEnter={this.DragEnter}>
        {this.props.children}
      </div>
    );
  }
}

DragItem.propTypes = {
  draggable:PropTypes.bool,
  onClick:PropTypes.func,
  onDragEnd:PropTypes.func,
  onDragEnter:PropTypes.func,
  onDragStart:PropTypes.func,
  ItemClass:PropTypes.string
}

export default DragItem;
