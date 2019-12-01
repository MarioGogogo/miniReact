/**
 * class中的点击事件的传值
 */

//如何实现上面代码
function anElement(element, props, children) {
  //判断是否是class组件
  if (isClass(element)) {

    return handleClass(element, props);

  } else if (isStateLessComponent(element)) {
    return element(props); //===> Hello({'数据'})执行
  } else {
    return handleHtmlElement(element, props, children)
  }
}

function createElement(el, props, ...children) {
  console.log('props', props)
  return anElement(el, props, children);
}

function handleClass(element, props) {
  const component = new element(props);
  return component.render();
}
// 组件的继承
class Component {
  constructor(props) {
    this.props = props;
  }
}

window.React = {
  createElement,
  Component
};
window.ReactDOM = {
  render: (el, domEl) => {
    domEl.appendChild(el);
  }
};

function isStateLessComponent(element) {
  return !isClass(element) && typeof element === 'function'
}

function isClass(func) {
  return typeof func === 'function' &&
    /^class\s/.test(Function.prototype.toString.call(func));
}


function handleHtmlElement(element, props, children) {
  //找到元素节点生成dom元素准备挂载
  console.log('handleHtmlElement', props)

  const anElement = document.createElement(element);
  children.forEach(child => {
    if (typeof(child) === 'object') {
      anElement.appendChild(child);
    } else {
      anElement.innerHTML += child;
    }
  });

  //判断点击事件的处理 
  Object.keys(props).forEach(propName => {

    if (/^on.*$/.test(propName)) {
      //截取前2个 on
      anElement.addEventListener(propName.substring(2).toLowerCase(), props[propName])
    } else {
      anElement.setAttribute(propName, props[propName])
    }
    console.log(propName)
  })
  return anElement;
}





class MyButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement('button', { onclick: this.props.onClick, className: 'box' }, `Click me`);
  }
}
const myBtn = React.createElement(MyButton, { onClick: () => alert('yay it worked') }, null);

ReactDOM.render(myBtn, document.getElementById('root'));