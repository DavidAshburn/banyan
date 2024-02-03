import React from 'react';

export default function Windowpane({ title, content }) {
  return (
    <div className="border-[6px] border-dark rounded-lg bg-white text-dark font-josefin h-fit">
      <div className="bg-dark border-b-4 border-coral h-8 text-white pl-2">
        {title}
      </div>
      <div className="grid gap-2 p-2">{content}</div>
    </div>
  );
}
