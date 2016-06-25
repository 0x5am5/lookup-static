export default class {
  
  defaultResponse(e) {
    return e.currentTarget.classList.contains(this.defaults.className);
  }

  defaultEvent() {
    this.defaults.target.addEventListener('click', this.handler.bind(this));
  }

  handler(e) {
    var defaults = this.defaults || this;

    if (defaults.response.call(this, e)) {
      defaults.target.classList.add(defaults.className);
    } else {
      defaults.target.classList.remove(defaults.className);
    }

    e.preventDefault();
  }

  constructor(options) {

    if (!options.target) {
      throw new Error('Please specify a target and className');
    }

    this.defaults = {};

    Object.assign(this.defaults, {
      event: this.defaultEvent,
      response: this.defaultResponse,
      className: 'toggle--active'
    }, options);

    this.defaults.event.call(this, this.handler);
  }
};