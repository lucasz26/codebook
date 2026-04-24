// TODO:    ADD TITLE INPUT
//          DESCRIPTION INPUT
//              SEPARATE DESCRIPTION
//              SEPERATE FOR INPUT RANGE
//          TEST CASE INPUT
//              TEST CASE + BUTTON
//              TEST CASE - BUTTON
//              TEST INPUT - > TEST OUTPUT
//          PULL USER INPUT
//              VERIFY ALL DATA IS INPUTTED
//              FORMAT AS JSON
//          MUTATE DATA.JS ARRAY
//          DISPLAY DATA IN ARRAY FOR TESTS
//          DISPLAY COMPLETION OF UPLOAD

'use client'; // This must be at the very top to allow hooks like useState

import { useState } from 'react';

export default function Publish() {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Title:", title);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Create New Entry</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title" style={{ display: 'block' }}>Title:</label>
          <input 
            id="title"
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            style={{ padding: '0.5rem', width: '300px' }}
          />
        </div>
        
        <button type="submit" style={{ cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </main>
  );
}