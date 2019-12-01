function anElement(element, children) {
  //判断是否无状态组件
  if (typeof element === "function") {
    return element();
  } else {
    const anElement = document.createElement(element);
    anElement.innerHTML = children.join(" ");
    return anElement;
  }
}

function createElement(el, props, ...children) {
  return anElement(el, children);
}

window.React = {
  createElement
};
window.ReactDOM = {
  render: (el, domEl) => {
    domEl.appendChild(el);
  }
};
