class MyButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
  return React.createElement('button', {onclick:this.props.onClick,style:"background:red",class:"title"}, `Click me`);
  }
}
const myBtn = React.createElement(MyButton, {onClick: () => alert('yay it worked')}, null);
ReactDOM.render(myBtn, document.getElementById('root'));
