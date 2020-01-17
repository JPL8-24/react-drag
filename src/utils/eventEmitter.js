class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(type, callback) {
    const event = this.events[type];
    if (Array.isArray(event)) {
      this.events[type].push(callback);
    } else {
      this.events[type] = [];
      this.events[type].push(callback);
    }
  }
  emit(type, ...arg) {
    const event = this.events[type];
    if (Array.isArray(event)) {
      event.forEach((item) => {
        item.apply(this, arg);
      });
    } else {
      console.warn('没有注册函数');
    }
  }
  remove(type) {
    if (this.events[type]) {
      delete this.events[type];
    }
  }
}

export default new EventEmitter();
