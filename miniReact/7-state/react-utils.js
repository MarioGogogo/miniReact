//判断是否组件
function isStateLessComponent(element) {
  return !isClass(element) && typeof element === 'function'
}


//判断是否class组件
function isClass(func) {
  return typeof func === 'function'
    && /^class\s/.test(Function.prototype.toString.call(func));
}



//判断是否点击事件
function shouldAddEventListener(property) {
  return /^on.*$/.test(property);
}
