import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

/**
 * Top page component
 */
export default class Top extends React.Component {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const style = {
      title: {
        fontFamily: "'Playfair Display SC', serif"
      }
    };
    return (
      <div>
        <header className="page-header">
          <h1 style={style.title}>TopPage</h1>
        </header>
        <article>
          <p>Please select artist or country</p>
        </article>
        <Footer />
      </div>
    );
  }
}
