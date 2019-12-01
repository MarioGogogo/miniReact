//如何实现上面代码
function anElement(element, children) {
  const anElement = document.createElement(element);

  anElement.innerHTML = children.join("");

  console.log("%c✅", "color: #00a3cc", anElement);
  return anElement;
}

function createElement(el, props, ...children) {
  //注意children是数组
  console.log("%c✅", "color: #f2ceb6", el, props, ...children);
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
