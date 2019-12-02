class Hello {
  render() {
    return React.createElement('div', null, `Hello World`,",I LOVE you");
  }
}

const helloWorld = React.createElement(Hello, null, null);

ReactDOM.render(helloWorld, document.getElementById('root'));
