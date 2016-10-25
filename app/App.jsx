import React from 'react';
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
                {this.props.title}
            </div>
        );
    }
}

App.propTypes = {
    title: React.PropTypes.string,
};

App.defaultProps = {
    title: 'Express React App',
};

module.exports = App;
