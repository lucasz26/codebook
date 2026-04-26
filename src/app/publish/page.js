'use client'; // This must be at the very top to allow hooks like useState

import { useState } from 'react';
import { problems } from '@/lib/data';
import { addProblem, resetDB } from "./actions";


export default function Publish() {

    // Using useState helps a lot in this case. We can quickly adapt or remove.

    //    Variable      "Set method"          Init value
    const [title,       setTitle]           = useState('');   // The title
    const [description, setDescription]     = useState('');   // Descrption
    const [id,          setCount]           = useState(2);    // The "Next ID". Since we start w/ 1, our next ID is 2.
    const [hiddenCase,  setHidden]          = useState([1])   // Array of what test cases are "Hidden". Upon creation, they will automatically be hidden.
  
    // Dictionary for test cases. This is a JS object that works similarly to map<int, pair<string,string>>
    const [testCases, setTestCase] = useState({
        [1] : { input: "" , output: ""}
    });

    // FUNCTIONS

    // Handles overall "submit". For now it's just a dummy console.log.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const tTitle = title.trim(); const tDescription = description.trim()

        if (tTitle == "" || tDescription == "") {
            console.log("Empty");
        } else {
            try {
                pullTestCases(); // Print out test cases. We can't yet store them, so this is more just "verification" that it showed up.
                await addProblem(tTitle, tDescription); // Actually add to the SQL database.
            } catch (e) {
                console.log(e.toString());
            }
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        await resetDB();
    }

    // Adds a case
    const addCase = (e) => {
        e.preventDefault(); 
        if (e) e.preventDefault(); 

        setTestCase(prev => ({ // We're essentially saying "Hey, take the previous inputs, and tack on this new one."
            ...prev,
            [id]: { input: "", output: "" }     // Keep it blank. This is also how we check if an entry is empty.
        }));

        setHidden(prev => [...prev, id]);
        setCount(prevCount => prevCount + 1);
        
    };

    // Removes a case.
    const removeCase = (e) => {
        e.preventDefault();
        if (e) e.preventDefault();

        // Check if there's 1 case, you must submit minimum 1 case.
        if (id <= 2) { // Since we use id like "nextID", we know that there's only one case if our "Next ID" is 2.
            console.log("CANNOT REMOVE");    
        } else {
            setTestCase(prev => {
                const newState = { ...prev };   // Take the old dictionary..
                delete newState[id-1];          // Remove the last id 
                return newState;                // Now set the dictionary to this new, removed-case dictionary.
            });
            
            setHidden(prev => prev.filter(item => item !== id - 1));

            setCount(prevCount => prevCount - 1)
        }   
    }

    const updateCase = (id, edited, value) => {
        setTestCase(prev => ({
          ...prev,
          [id]: { ...prev[id], [edited]: value}
        }));
    };

    const pullTestCases = (e) => {
        // First, check if everything has an entry. If not, we'll pass an error.
        for (const [id, data] of Object.entries(testCases)) { if (!verifyCaseEntry([id,data])) { throw new Error("Case " + id + " has empty fields."); }}

        let inputForceArr = false;
        let outputForceArr = false;

        // Next, we check if entries are consistent. If one input contains an array, all should.

        // Should our given entry be an array? This is a very, VERY naive check. I love me a good lambda.
        const looksLikeArray = (str) => {
            if (str.startsWith('[') && str.endsWith(']')) {
                if (str[str.length-2] == ",") throw new Error("Array is incomplete"); // We have something like [1, 2.... 3,] Which is invalid
                return true;
            }
            return false;
        };
    
        // The first entry decides if we are looking at arrays.
        const [firstId, firstData] = Object.entries(testCases)[0];
        const shouldInputBeArray = looksLikeArray(firstData.input);
        const shouldOutputBeArray = looksLikeArray(firstData.output);
    
        for (const [id, data] of Object.entries(testCases)) {
            // Compare against the first input.
            if (looksLikeArray(data.input) !== shouldInputBeArray) {
                const status = shouldInputBeArray ? "an array" : "not an array";
                throw new Error(`Inconsistent Array Input: Case ${id} was expected to be ${status}.`);
            }
    
            if (looksLikeArray(data.output) !== shouldOutputBeArray) {
                const status = shouldOutputBeArray ? "an array" : "not an array";
                throw new Error(`Inconsistent Array Output: Case ${id} was expected to be ${status}.`);
            }
        }

        // Finally, we finally "pull" this validated information.
        console.log("All inputs are " + (shouldInputBeArray ? "arrays" : "single entries") + "  |  All outputs are " + (shouldOutputBeArray ? "arrays" : "single entries"));

        for (const [id, data] of Object.entries(testCases)) { 
            console.log(id + " : " + data.input + " => " + data.output + " and is " + (hiddenCase.includes(Number(id)) ? "HIDDEN" : "VISIBLE"));
        }
    };


    const verifyCaseEntry = ([id, data]) => {
        return !(data.input == "" || data.output == "");
    }

    const testID = (e) => {
        e.preventDefault();
        console.log({id});
        pullTestCases();
    };

    const updateHidden = (id) => {
        // Need to convert becuase this id is a string, oddly enough.
        const targetId = Number(id);
    
        setHidden((prev) => {
            if (prev.includes(targetId)) { // If it is in the "HIDDEN" list...
                return prev.filter((item) => item !== targetId); // Remove it.
            } else {
                return [...prev, targetId]; // Else, we can add it to our list.
            }
        });
    }

    const testExport = (e) => {
        e.preventDefault();
        // Need to convert becuase this id is a string, oddly enough.
        for (let i = 0; i < problems.length; i++) {
            console.log(problems[i].id + " : " + problems[i].title + "  |  " + problems[i].description);
        }
    }


    return (
        <main style={{ padding: '2rem' }}>
        <h1>Publish New Problem</h1>
        
            {/* Title Block */}
            <div style={{ marginBottom: '1rem' }}>
            {/* A space for a label and a subtext (which is italicized and is smaller) */}
                <div className="flex items-end">
                    <label htmlFor="textboxes" className="p-1">Title</label>
                    <label htmlFor="textboxes" className="p-1 text-xs italic">(What is your question called?)</label>
                </div>
                
                <textarea 
                    id="title"
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Question Name..."
                    style={{ padding: '0.5rem', width: '300px', resize: 'none' }}
                />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="description" style={{ display: 'block' }}>Description:</label>
                <textarea
                    id="description"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    style={{ padding: '0.5rem', width: '100%', height: '200px', borderWidth : '1px', 

                        resize: 'none',
                        
                        textWrap: 'wrap', 
                        whiteSpace: 'pre-wrap', 
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'}}
                />
            </div>

            {/* Test Cases */}
            <div className="flex items-center p-2 justify-between">
                
                {/* A space for a label and a subtext (which is italicized and is smaller) */}
                <div className="flex items-end">
                    <label htmlFor="textboxes" className="p-1">Test Cases:</label>
                    <label htmlFor="textboxes" className="p-1 text-xs italic">(Input test cases and their expected outputs)</label>
                </div>
                
                <div className="right flex items-center p-2">    
                    <form onSubmit={addCase}>
                        <div className="p-1 border rounded w-[35px] place-items-center center">
                            <button type="addCase" style={{ cursor: 'pointer', textAlign : 'center'}}>+</button>
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
            <div className="flex flex-col border rounded overflow-y-auto h-[400px] p-2 mb-2">
                {Object.entries(testCases).map(([id, data]) => (
                    <div key={id} className="flex items-center gap-3 p-3 border rounded shadow-sm mb-2">
                        <span className="text-sm font-bold whitespace-nowrap">Case {id}:</span>

                        {/* We're essentially that the first block is the test "input", while the second is the test "output" */}
                        <div className="flex flex-1 items-center gap-3">
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

                            {/* Button to toggle case visibility. */}
                            <button 
                                onClick={(e) => updateHidden(id)}
                                style={{
                                    // If the test case is in the "HIDDEN" list, it's red. Otherwise, it's green.
                                    backgroundColor: hiddenCase.includes(Number(id)) ? '#ef4444' : '#22c55e',
                                    padding: '10px 20px',
                                    cursor: 'pointer'
                                }}
                                >
                                    {hiddenCase.includes(Number(id)) ? "🤫" : "📣"}
                                </button>
                        </div>
                    </div>
                ))}
            </div>
            
        <form onSubmit={handleSubmit}> 
            <button type="submit" style={{ cursor: 'pointer' }}>
            Submit
            </button>
        </form>

        {/* This is the evil RESET DB button. YOU WILL RESET THE DATABASE TO THE ORIGINAL MOCK DATA. BE WARNED. */}
            <form onSubmit={resetDB}>
                <button type="submit" style={{ cursor: 'pointer' }}>
                Reset Database
                </button>
            </form> 
        </main>
    );
}