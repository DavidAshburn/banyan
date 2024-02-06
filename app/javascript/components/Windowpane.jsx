import React from 'react';

export default function Windowpane({ title, content, light }) {
  let style
  light == '1' ? style = 'windowpanelight': style = 'windowpanedark';
  
  return (
    <div className={style}>
      <p>
        {title}
      </p>
      <div>{content}</div>
    </div>
  );
}
