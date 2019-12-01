//如何实现上面代码
function anElement(element, children) {
   // 继续element需要支持无状态组件
   if (typeof element === "function") {
      return element()
   } else {
      console.log("TCLog:: anElement -> element", element, typeof element)
      if (typeof element === "object") {
         return element
      } else {
         const anElement = document.createElement(element)
         anElement.innerHTML = children.join('')
         console.log("TCLog:: anElement -> anElement", anElement)
         return anElement
      }

   }
}

function createElement(el, props, ...children) {
   //children不是字符串处理
   if (children === null) {
      children = "hello word"
   }
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

ReactDOM.render(helloWord, document.getElementById('root'))
