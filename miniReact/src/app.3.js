//如何实现上面代码
function anElement(element, children) {
   //对无状态组件的支持
   if (typeof element === "function") {
      return element()
   } else {
      console.log("TCLog:: anElement -> element", element, typeof element)
      if (typeof element === "object"){
         return element
      }
      const anElement = document.createElement(element)
      children.forEach(child => {
         if (typeof (child) === 'object') {
            anElement.appendChild(child)
         } else {
            anElement.innerHTML += child
         }
      });
      console.log("TCLog:: anElement -> anElement", anElement)
      return anElement
   }
}

function createElement(el, props, ...children) {
   console.log("TCLog:: createElement -> children", children)
   return anElement(el, children)
}


window.React = {
   createElement
}

window.ReactDOM = {
   render: (el, domEl) => {
      domEl.appendChild(el)
   }
}

const Hello = React.createElement('div', null, 'Hello word', ",React")

const helloWord = React.createElement(Hello, null, null)
const helloWord2 = React.createElement(Hello,null,null)
const regularDiv = React.createElement('div', null, "i am a React")

const Parent = React.createElement('div',null,helloWord,helloWord2,regularDiv,"i just a text")


ReactDOM.render(Parent, document.getElementById('root'))
// 继续element需要支持无状态组件