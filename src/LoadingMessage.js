import React from 'react';

export default function LoadingMessage(props) {
  const {loadMessage} = props;
  console.log('loadMessage in LoadingMessage component', loadMessage)
  return(
    <>
      {loadMessage}
    </>
  )
} 