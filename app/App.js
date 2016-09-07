const React = require('react');
const ReactDom = require('react-dom');


/**
 * App Class
 */
export default class App extends React.Component {
  /**
   * @param {number} param this is param.
   * @return {number} this is return.
   */
  render() {
    return (
        <div>
          Hello World Zoe Rules!
        </div>
    );
  }
}
ReactDom.render((<App />), document.getElementById('react-app'));