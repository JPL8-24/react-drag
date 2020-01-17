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
    ItemClass:''
  }

  DragStart = () => {
    this.dragItmeRef.current.style.opacity = 0.3;
    EventEmitter.emit('dragStart', this.dragItmeRef.current);
    if(this.props.onDragStart) {
      this.props.onDragStart();
    }
  };

  DragEnd = () => {
    this.dragItmeRef.current.style.opacity = 1;
    EventEmitter.emit('dragEnd', this.dragItmeRef.current);
    if(this.props.onDragEnd) {
      this.props.onDragEnd();
    }
  };

  DragEnter = () => {
    EventEmitter.emit('dragEnter', this.dragItmeRef.current);
    if(this.props.onDragEnter) {
      this.props.onDragEnter();
    }
  };

  componentDidMount() {
    EventEmitter.emit('pullChild',this.dragItmeRef.current)
  }

  render() {
    return (
      <div className={`DragItem ${this.props.ItemClass}`} 
        draggable={this.props.draggable} 
        ref={this.dragItmeRef} 
        onClick = {this.props.onClick}
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
