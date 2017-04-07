import React from 'react';

const styles = {
  messageContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  message: {
    width: 500 + 'px',
    margin: 'auto',
    textAlign: 'center'
  },
};

export default function NotFound() {
  return (
    <div>
      <div style={ styles.messageContainer }>
        <div style={ styles.message }>
          <h1>Wow! 404!</h1>
          <p>Unfortunately, what you are looking for, is <em>missing</em>!</p>
        </div>
      </div>
    </div>
  );
}
