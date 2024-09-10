import React, { useState } from 'react';

const App: React.FC = () => {
  return (
    <div>
      <pre>&lt;input type="text"/&gt;</pre>
      <input type="text" />
      <pre>&lt;input type="password"/&gt;</pre>
      <input type="password" />
      <pre>&lt;input type="radio"/&gt;</pre>
      <input type="radio" />
      <pre>&lt;input type="checkbox"/&gt;</pre>
      <input type="checkbox" />
      <pre>&lt;input type="file"/&gt;</pre>
      <input type="file" />
      <pre>&lt;input type="date"/&gt;</pre>
      <input type="date" />
      <pre>&lt;input type="search"/&gt;</pre>
      <input type="search" />
      <pre>&lt;input type="number"/&gt;</pre>
      <input type="number" />
      <pre>&lt;input type="range"/&gt;</pre>
      <input type="range" />
      <pre>&lt;input type="color"/&gt;</pre>
      <input type="color" />
    </div>
  );
};

export default App;
