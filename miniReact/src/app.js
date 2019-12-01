

function anElement(element,props,children){
  
    if(isClass(element)){

      return handleClass(element,props,children)
    }
    //todo
}



function createElement(el,props,...children) {
    //注意children是数组
   return anElement(el,props,children)
}



window.React = {
   createElement,
   Component
}

window.ReactDOM = {
    render:(el,domEl)=>{
       rootReactElement = el;
       rootDomElement = domEl;
       const currentDom = rootReactElement.render()
       rootDomElement.appendChild(el)
    }
}

//===================如何实现以下代码====================
class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  onPlusClick() {
    this.setState({value: this.state.value + 1});
  }

  onMinusClick() {
    this.setState({value: this.state.value - 1});
  }

  render() {
    return React.createElement('div', null,
      React.createElement('div', null, `The Famous Dan Abramov's Counter`),
      React.createElement('div', null, `${this.state.value}`),
      React.createElement('button', {onClick: this.onPlusClick.bind(this)}, '+'),
      React.createElement('button', {onClick: this.onMinusClick.bind(this)}, '-')
    );
  }
}
const counter = React.createElement(Counter, null, null);
ReactDOM.render(counter, document.getElementById('root'));