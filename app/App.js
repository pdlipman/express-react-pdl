const React = require('react');
const ReactDom = require('react-dom');

/**
 * App Class
 */
export default class App extends React.Component {

    /**
     * constructor
     * @param {object} props - properties
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} title - element title
         */
        this.state = {
            title: props.title,
        };
    }

    /**
     * render
     * @return {ReactElement} - generated markup
     */
    render() {
        return (
            <div>
                {this.props.title}, working!
                I think it does.
            </div>
        );
    }
}

App.propTypes = {
    title: React.PropTypes.string,
};

App.defaultProps = {
    title: 'Hello, World!',
};

ReactDom.render((<App />), document.getElementById('react-app'));
