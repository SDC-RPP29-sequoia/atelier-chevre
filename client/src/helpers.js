Array.prototype.nextItem = (ind) => {
  if (ind === this.length - 1) {
    return 0;
  } else {
    return ind++;
  }
};