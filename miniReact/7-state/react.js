
  let rootDOMElement, rootReactElement;
  const REACT_CLASS = 'REACT_CLASS';

  function anElement(element, props, children) {
    if (isClass(element)) {
      return handleClass(element, props, children);
    } else if (isStateLessComponent(element)) {
      return element(props);
    } else {
      return handleHtmlElement(element, props, children);
    }
  }

  function createElement(el, props, ...children) {
    return anElement(el, props, children);
  }

  function handleClass(clazz, props, children) {
    const reactElement = new clazz(props);
    reactElement.children = children;
    reactElement.type = REACT_CLASS;
    return reactElement;
  }

  function handleHtmlElement(element, props, children) {
    const anElement = document.createElement(element);
    children.forEach(child => appendChild(anElement, child));
    _.forEach(props, (value, name) => appendProp(anElement, name, value));
    return anElement;
  }

  function appendChild(element, child) {
    if (child.type === REACT_CLASS) {
      appendChild(element, child.render());
    } else if (Array.isArray(child)) {
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
    } else { element.setAttribute(propName, propVal);
    }
  }

  class Component {
    constructor(props) {
      this.props = props;
    }

    setState(state) {
      this.state = Object.assign({}, this.state, state);
      reRender();
    }
  }

  function reRender() {
    //删除整个dom树结构
    while (rootDOMElement.hasChildNodes()) {

      
      rootDOMElement.removeChild(rootDOMElement.lastChild);
    }
    console.log("TCL: reRender -> rootDOMElement.hasChildNodes()", rootDOMElement.hasChildNodes())
    //重新渲染节点
    ReactDOM.render(rootReactElement, rootDOMElement);
  }

  window.React = {
    createElement,
    Component
  };
  window.ReactDOM = {
    render: (el, domEl) => {
      rootReactElement = el;
      console.log("TCL: rootReactElement", rootReactElement)
      rootDOMElement = domEl;
      console.log("TCL: rootDOMElement", rootDOMElement)
      
      const currentDOM = rootReactElement.render();
      console.log("TCL: rootReactElement.render()", rootReactElement.render())
      rootDOMElement.appendChild(currentDOM);
    }
  };
