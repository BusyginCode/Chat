import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';


export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    return (
      <html lang="en-us">
        <head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/reset.css" />
          <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"  />
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}
          <title>Chat</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body style={{ fontFamily: 'Roboto, sans-serif' }}>
          <div  style={ styles.content } id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center'
  }
}
