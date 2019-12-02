//无状态组件
const Hello = ({name}) => {
  return React.createElement('div', null, `Hello ${name}123`);
};


class Hello1 extends React.Component {
  //继承子Component 创建一个实例
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement('div', null, `ZHELI ${this.props.name},`);
  }
}





const helloWorld = React.createElement(Hello1, {name: 'Ofir'});








ReactDOM.render(helloWorld, document.getElementById('root'));
