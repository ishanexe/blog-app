import React, { useContext, useEffect } from "react";
import noteContext from "../context/Notecontext";
import {useNavigate } from "react-router-dom";

// Personalized profile for each user
const Profile = ({ click, handleModalClose }) => {
  const context = useContext(noteContext);
  const { userinfo, getUser } = context;

  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate("/login"); // Using navigate to redirect
    handleModalClose(); 
  };
  
// console.log(userinfo);
  useEffect(() => {
    getUser();
  }, []);
  // console.log(userinfo);
  return (
    <div>
      {click && (
        <div className="modal d-block container-fluid" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {userinfo?.name || "User Profile"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                {userinfo ? (
                  <>
                    <p><strong>Name:</strong> {userinfo.user.name}</p>
                    <p><strong>Email:</strong> {userinfo.user.email}</p>
                  </>
                ) : (
                  <p>Loading user data...</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                {/* <li className="nav-item dropdown"><button className="btn btn-danger mx-1" onClick={handleLogout}>Logout</button> */}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
