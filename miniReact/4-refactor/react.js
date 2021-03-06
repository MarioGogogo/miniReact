
function anElement(element,children){
    //判断是否class组件
    if(isClass(element)){
      return handleClass(element);
      //判断是否function组件
    }else if (isStateLessComponent(element)) {
      return element();
    }else{
      return handleHtmlElement(element, children);
    }
}


function handleClass(clazz) {
  //class 新创建一个实例 执行 render方法
  const component = new clazz();
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


function createElement(el,props,...children){
console.log("TCL: createElement -> children", children)
  return anElement(el, children);
}


window.React = {
   createElement
}

window.ReactDOM = {
  render:(el,domEl)=>{
      domEl.appendChild(el)
  }
}