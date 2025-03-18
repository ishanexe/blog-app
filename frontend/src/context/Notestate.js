import React, { useState } from "react";
import NoteContext from "./Notecontext";

const NoteState = (props) => {
    const initialState = []; // Replace with your initial notes array if you have any
    const initUser=[];
    const [notes, setNotes] = useState(initialState);
    const [userinfo,setuserinfo]=useState(initUser);
    const host = 'http://localhost:5000';
    const authToken = localStorage.getItem('auth-token');
    // console.log('Auth token: ' + authToken);

    // Fetch notes from the server when the component mounts
    const getNote = async () => {
        try {
            const response = await fetch(`${host}/api/Blog/getblogs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }

            const json = await response.json();   //we got the response from the server and  contains all blogs
            // console.log("Fetched notes:", json); // Log fetched notes for debugging purposes
            setNotes(Array.isArray(json) ? json : []); // Update state with fetched notes
        } catch (err) {
            console.error("Error fetching notes:", err);
        }
    };



    // Add a new note to the server when the form is submitted
const addNote = async (title, content,author,tags) => {
    try {
        const response = await fetch(`${host}/api/Blog/addblog`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ title, content,author,tags }),
        });
        console.log(response);

        if (!response.ok) {
            throw new Error('Failed to add note');
        }

        const newNote = await response.json();

        // Append the new note to the existing notes array
        setNotes([...notes, newNote]);

        alert('Note added successfully');
    } catch (err) {
        console.error("Error adding note:", err);
        alert('Error adding note. Please try again.');
    }
};

//get user information
    const getUser = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'auth-token': authToken
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const json = await response.json();
            // console.log("User fetched:", json);
            setuserinfo(json);
            // console.log(userinfo)
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, getNote,addNote,getUser,userinfo }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
