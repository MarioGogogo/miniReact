function anElement(element, children) {
  //判断如果是class组件
  if (isClass(element)) {
    //创建新的实例
    const component = new element();
    //调用实例方法
    return component.render();
  } else if (typeof element === "function") {
    return element();
  } else {
    const anElement = document.createElement(element);
    children.forEach(child => {
      if (typeof child === "object") {
        anElement.appendChild(child);
      } else {
        anElement.innerHTML += child;
      }
    });
    return anElement;
  }
}

function createElement(el, props, ...children) {
  return anElement(el, children);
}

function isClass(func) {
  return (
    typeof func === "function" &&
    /^class\s/.test(Function.prototype.toString.call(func))
  );
}

window.React = {
  createElement
};
window.ReactDOM = {
  render: (el, domEl) => {
    domEl.appendChild(el);
  }
};
