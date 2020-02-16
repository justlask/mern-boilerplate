import React from 'react'

const FlashMessage = (props) => {
  return (props.isVisable) ? (
    <div>
      <p>{props.message}</p>
    </div>
  ) : null
}

export default FlashMessage;
