let rootDOMElement, rootReactElement;
const REACT_CLASS = 'REACT_CLASS';


function anElement(element, props, children) {
  //判断是否class组件
  if (isClass(element)) {
    return handleClass(element, props,children);
    //判断是否function组件
  } else if (isStateLessComponent(element)) {
    return element(props);
  } else {
    return handleHtmlElement(element, props, children);
  }
}

function handleClass(clazz, props,children) {
  //class 新创建一个实例 执行 render方法
  console.log("TCL: handleClass -> props", props,children);
  const reactElement = new clazz(props);
  reactElement.children = children;
  reactElement.type = REACT_CLASS;
  return reactElement.render();
}

function handleHtmlElement(element, props, children) {
  const anElement = document.createElement(element);
  children.forEach(child => appendChild(anElement, child));
  _.forEach(props, (value, name) => appendProp(anElement, name, value));
  return anElement;
}

function appendChild(element, child) {
  if (child.type === REACT_CLASS) {
    //递归
    appendChild(element, child.render());
  } else if (Array.isArray(child)) {
    //child是数组则继续遍历 html元素
    child.forEach(ch => appendChild(element, ch));
  } else if (typeof(child) === 'object') {
    element.appendChild(child);
  } else {
    element.innerHTML += child;
  }
}

function appendProp(element, propName, propVal) {
  if (shouldAddEventListener(propName)) {
    element.addEventListener(propName.substring(2).toLowerCase(), propVal);
  } else {
    element.setAttribute(propName, propVal);
  }
}

//使用class状态组件传props
class Component {
  constructor(props) {
    this.props = props;
  }
  //state方法
  setState(state) {
  console.log("TCL: Component -> setState -> state", state)
    
    this.state = Object.assign({}, this.state, state);
    reRender();
  }
}


function reRender() {

  console.log('%c⧭', 'color: #00e600', rootDOMElement);
  while (rootDOMElement.hasChildNodes()) {
    console.log("TCL: reRender -> rootDOMElement.hasChildNodes()", rootDOMElement.hasChildNodes())
    console.log("TCL: reRender -> rootDOMElement.lastChild", rootDOMElement.lastChild)
    rootDOMElement.removeChild(rootDOMElement.lastChild);
   
  }
  //删除全部节点,重新渲染
  ReactDOM.render(rootReactElement, rootDOMElement);
}

function createElement(el, props, ...children) {
  return anElement(el, props, children);
}

window.React = {
  createElement,
  Component
};

window.ReactDOM = {
  render: (el, domEl) => {
    rootReactElement = el;
    rootDOMElement = domEl;
    const currentDOM = rootReactElement.render();
    rootDOMElement.appendChild(currentDOM);
  }
};
