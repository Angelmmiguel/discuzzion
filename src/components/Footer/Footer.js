import React, { PureComponent } from 'react';

// Styles
import './footer.css';

class Footer extends PureComponent {
  render() {
    return <footer className="Footer pa3 flex justify-between f7">
      <p className="ma0">
        v0.0.1
      </p>
      <p className="ma0">
        A project by <a className="link" href="https://twitter.com/laux_es" rel="noopener" target="_blank">@angel</a>
         and <a className="link" href="https://twitter.com/carlosrdrz" rel="noopener" target="_blank">@carlosrdrz</a>
      </p>
    </footer>
  }
}

export default Footer;
