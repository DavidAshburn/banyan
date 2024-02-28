import React from 'react';

export default function Windowpane({ title, content, mainclass }) {
  return (
    <div className={mainclass}>
      <p className="panetitle">{title}</p>
      <div className="panecontent">{content}</div>
    </div>
  );
}
