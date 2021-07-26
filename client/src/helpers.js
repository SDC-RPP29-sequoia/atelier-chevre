// Gets the next item from an array, can wrap back to beginning
Array.prototype.nextItem = function (ind) {
  if (ind === this.length - 1) {
    return this[0];
  } else {
    return this[ind + 1];
  }
};

Array.prototype.previousItem = function (ind) {
  if (ind === 0) {
    return this[this.length - 1];
  } else {
    return this[ind - 1];
  }
};