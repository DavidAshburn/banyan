import React from 'react';

export default function Windowpane({ title, content }) {
  return (
    <div className="mainpane">
      <p className="panetitle">{title}</p>
      <div className="panecontent">{content}</div>
    </div>
  );
}
