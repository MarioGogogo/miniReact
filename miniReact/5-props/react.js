
function anElement(element,props,children){
    //判断是否class组件
    if(isClass(element)){
      return handleClass(element,props);
      //判断是否function组件
    }else if (isStateLessComponent(element)) {
      return element(props);
    }else{
      return handleHtmlElement(element, children);
    }
}


function handleClass(clazz,props) {
  //class 新创建一个实例 执行 render方法
  console.log("TCL: handleClass -> props", props)
  const component = new clazz(props);
 
  
  return component.render();
}


function handleHtmlElement(element, children) {
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

//使用class状态组件传props
class Component {
  constructor(props) {
    this.props = props;
  }
}


function createElement(el, props, ...children) {
  return anElement(el, props, children);
}


window.React = {
   createElement,
   Component
}

window.ReactDOM = {
  render:(el,domEl)=>{
      domEl.appendChild(el)
  }
}