// TODO:    ✅  ADD TITLE INPUT
//          ❌  DESCRIPTION INPUT
//          ❌      SEPARATE DESCRIPTION
//          ❌      SEPERATE FOR INPUT RANGE
//          🟨  TEST CASE INPUT
//          ✅      TEST CASE + BUTTON
//          ✅      TEST CASE - BUTTON
//          ✅      TEST INPUT - > TEST OUTPUT
//          ❌          IMPLEMENT CHECKS FOR ARRAYS
//          🟨  PULL USER INPUT
//          🟨      VERIFY ALL DATA IS INPUTTED
//          ❌      FORMAT AS JSON
//          ❌          USE THE SQL COMMAND INSTEAD?
//          ❌  MUTATE DATA.JS ARRAY ^
//          ❌  DISPLAY DATA IN ARRAY FOR TESTS
//          ❌  DISPLAY COMPLETION OF UPLOAD

'use client'; // This must be at the very top to allow hooks like useState

import { useState } from 'react';

export default function Publish() {

    // Using useState helps a lot in this case. We can quickly adapt or remove.

    //    Variable      "Set method"          Init value
    const [title,       setTitle]           = useState('');   // The title
    const [description, setDescription]     = useState('');   // Descrption
    const [id,          setCount]           = useState(2);    // The "Next ID". Since we start w/ 1, our next ID is 2.
  
    // Dictionary for test cases. This is a JS object that works similarly to:
    // map<int, pair<string,string>>
    const [testCases, setTestCase] = useState({
        [1] : { input: "" , output: ""}
    });

    // Handles overall "submit". For now it's just a dummy console.log.
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Title:", title);
        console.log("Submitted description", description);
        pullTestCases();
    };

    // Adds a case
    const addCase = (e) => {
        e.preventDefault(); 

        setTestCase(prev => ({ // We're essentially saying "Hey, take the previous inputs, and tack on this new one."
            ...prev,
            [id]: { input: "", output: "" }
        }));

        setCount(prevCount => prevCount + 1)
    };

    // Removes a case.
    const removeCase = (e) => {
        e.preventDefault();

        // Check if there's 1 case, you must submit minimum 1 case.
        if (id <= 2) { // Since we use id like "nextID", we know that there's only one case if our "Next ID" is 2.
            console.log("CANNOT REMOVE");    
        } else {
            setTestCase(prev => { // Similarly to add, we take the previous, then delete the last one on the list.
                const newState = { ...prev };
                delete newState[id-1];
                return newState;
            });

            setCount(prevCount => prevCount - 1)
        }   
    }

    const updateCase = (id, input, output) => {
        setTestCase(prev => ({
          ...prev,
          [id]: { ...prev[id], [input]: output}
        }));
    };

    const pullTestCases = (e) => {
        // Traverses through the user's inputted test cases and then pushes them out as console.logs.
        for (const [id, data] of Object.entries(testCases)) {
            console.log(id + ": " + data.input + " => " + data.output);
        }
    };

    const testID = (e) => {
        e.preventDefault();
        console.log({id});
        pullTestCases();
    };

    return (
        <main style={{ padding: '2rem' }}>
        <h1>Publish New Problem</h1>
        
            {/* Title Block */}
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="title" style={{ display: 'block' }}>Title:</label>
                <input 
                    id="title"
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Question Name..."
                    style={{ padding: '0.5rem', width: '300px' }}
                />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="description" style={{ display: 'block' }}>Description:</label>
                <input 
                    id="description"
                    type="text" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    style={{ padding: '0.5rem', width: '300px' }}
                />
            </div>

            {/* Test Cases */}
            <div className="flex items-center p-2 justify-between">
                <div className="flex items-center p-2">
                    <label htmlFor="textboxes" className="p-1" style={{ display: 'block' }}>Test Cases:</label>
                    <label htmlFor="textboxes" className="p-1" style= {{size: '5px'}}>TinyTinyTiny</label>
                </div>
                
                <div className="right flex items-center p-2">    
                    <form onSubmit={addCase}>
                        <div className="p-1">
                            <button type="addCase" style={{ cursor: 'pointer' }}>+</button>
                        </div>
                    </form>
    
                    <form onSubmit={removeCase}>
                        <div className="p-1">
                            <button type="addCase" style={{ cursor: 'pointer' }}>-</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* This block stores the adapting test cases. */}
            <div className="flex flex-col border rounded overflow-y-auto h-[400px]">
                {Object.entries(testCases).map(([id, data]) => (
                    <div key={id} className="flex items-center gap-3 p-3 border rounded shadow-sm mb-2">
                        <span className="text-sm font-bold whitespace-nowrap">Case {id}:</span>

                        {/* We're essentially that the first block is the test "input", while the second is the test "output" */}
                        <div className="flex flex-1 items-center gap-2">
                            <input 
                                className="flex-1 min-w-0 border p-1.5 rounded text-sm focus:ring-1 focus:outline-none"
                                placeholder="Input"
                                value={data.input}
                                onChange={(e) => updateCase(id, "input", e.target.value)}
                            />

                            <span className="text-gray-400 font-bold">→</span>

                            <input 
                                className="flex-1 min-w-0 border p-1.5 rounded text-sm focus:ring-1 focus:outline-none"
                                placeholder="Output"
                                value={data.output}
                                onChange={(e) => updateCase(id, "output", e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            
        <form onSubmit={handleSubmit}>
            <button type="submit" style={{ cursor: 'pointer' }}>
            Submit
            </button>
        </form>

        </main>
    );
}