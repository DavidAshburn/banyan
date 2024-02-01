import React from 'react';

export default function Windowpane({ title, content }) {
  return (
    <div className="windowpane h-fit">
      <div className="bg-dark border-b-4 border-coral h-8 text-white pl-2">
        {title}
      </div>
      {content}
    </div>
  );
}
