/**
 * class中的props情况
 */

//如何实现上面代码
function anElement(element, props, children) {
  //判断是否是class组件
  if (isClass(element)) {
    const component = new element(props); //加入props
    return component.render();

  } else if (isStateLessComponent(element)) {
    return element(props); //===> Hello({'数据'})执行
  } else {
    //找到元素节点生成dom元素准备挂载
    const anElement = document.createElement(element);
    children.forEach(child => {
      if (typeof(child) === 'object') {
        anElement.appendChild(child);
      } else {
        anElement.innerHTML += child;
      }
    });
    return anElement;
  }
}

function createElement(el, props, ...children) {
  console.log('props', props)
  return anElement(el, props, children);
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


class Hello extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement('div', null, `Hello ${this.props.name}`);
  }
}
const helloWorld = React.createElement(Hello, { name: 'Ofir' }, null);
ReactDOM.render(helloWorld, document.getElementById('root'));