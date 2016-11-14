import React from 'react';

export default function NotFound() {
  return (
    <div>
      <div className="page-wrappers" style={ styles.jumbotron }>
        <section className="jumbotron-custom full-vh" data-pages="parallax">
          <div className="background jumbo-back" data-pages-bg-image="/hero_1.jpg" style={{ backgroundImage: "url(/hero.jpg)" }}>
            <div className="bg-overlay" style={{ opacity: 0 }}></div>
          </div>
        </section>
      </div>
      <div style={ styles.messageContainer }>
        <div style={ styles.message }>
          <h1>Ой! 404!</h1>
          <p>То что вы искали<em> отсутствует</em>!</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  messageContainer: {
    position: 'absolute', 
    top: 250 + 'px',
    width: 100 + '%'
  },
  message: {
    width: 500 + 'px',
    margin: 'auto',
    textAlign: 'center'
  },
  jumbotron: {
    position: 'absolute',
    width: 100 + '%'
  }
}