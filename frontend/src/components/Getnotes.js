import React, { useEffect, useContext, useState } from 'react';
import Noteitem from './Noteitem';
import noteContext from "../context/Notecontext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Getnotes = () => {
    const context = useContext(noteContext);
    const { notes, getNote } = context;
    let navigate = useNavigate(); // Use useNavigate instead of useHistory

    // State to handle loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getNote().then(() => setLoading(false)); // Fetch notes and then set loading to false
        } else {
            navigate('/login');  // Redirect to login page if not authenticated using navigate
        }
    }, [navigate, getNote]);  // Added getNote to the dependency array

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Blogs</h1>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="row justify-content-center">
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <div className='container-fluid '>
                                <div className="d-flex justify-content-center " key={note._id}>
                                <Noteitem note={note} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No notes available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Getnotes;
