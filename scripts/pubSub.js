
/* 
  publish: if eventName doesn't exist in object, initializ
  subscribe: 
*/

export default {
  events: {},
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  },
  subscribe: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  unsubscribe: function (eventName, fn) {
    const eventNameFns = this.events[eventName];
    if (eventNameFns) {
      eventNameFns.every((eventNameFn, i) => {
        if (eventNameFn === fn) {
          eventNameFns.splice(i, 1);
        }
      });
    }
  }
};