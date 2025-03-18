import React from "react";

const Noteitem = (props) => {
  const { note } = props;

  return (
    <div className="col-md-6 col-lg-4 col-12 mb-4">
      <div className="card note-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="note-header">
            <h5 className="note-title">{note.title}</h5>
            <p className="note-info">Posted by User | Date</p>
          </div>
          {/* You can add actions here like upvote/downvote */}
          <div className="note-actions">
            <button className="btn btn-outline-secondary btn-sm">Upvote</button>
            <button className="btn btn-outline-secondary btn-sm">Downvote</button>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{note.content}</p>
        </div>
        <div className="card-footer text-muted">
          {/* Actions like comments or sharing */}
          <button className="btn btn-link">Comment</button>
          <button className="btn btn-link">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
