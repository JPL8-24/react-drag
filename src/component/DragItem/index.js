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
    tag:1
  }

  DragStart = () => {
    this.dragItmeRef.current.style.opacity = 0.3;
    const {tag} = this.props;
    EventEmitter.emit(`dragStart_${tag}`, this.dragItmeRef.current);
    if(this.props.onDragStart) {
      this.props.onDragStart();
    }
  };

  DragEnd = () => {
    this.dragItmeRef.current.style.opacity = 1;
    const {tag} = this.props;
    EventEmitter.emit(`dragEnd_${tag}`, this.dragItmeRef.current);
    if(this.props.onDragEnd) {
      this.props.onDragEnd();
    }
  };

  DragEnter = () => {
    const {tag} = this.props;
    EventEmitter.emit(`dragEnter_${tag}`, this.dragItmeRef.current);
    if(this.props.onDragEnter) {
      this.props.onDragEnter();
    }
  };

  componentDidMount() {
    const {tag} = this.props;
    EventEmitter.emit(`pullChild_${tag}`,this.dragItmeRef.current)
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
