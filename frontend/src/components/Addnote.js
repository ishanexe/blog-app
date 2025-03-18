import React, { useContext, useState,useEffect } from "react";
import noteContext from "../context/Notecontext";
import "./Addnote.css";

const Addnote = ({ post, handleModalClose }) => {
  // if (!post) return null; // Do not render the modal if post is false
  const { addNote,userinfo,getUser } = useContext(noteContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState(userinfo?.user?._id ||"60c72b2f9b1e8b06d8e6c6e9");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    // console.log(userinfo.user._id);
    useEffect(() => {
      getUser();
    }, []);
  

  if(!post) return null; // Do not render

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && content.trim() && author.trim()) {
      setLoading(true);
      try {
        const formattedTags = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
        await addNote(title, content, author, formattedTags);
        setTitle("");
        setContent("");
        setTags("");
        handleModalClose();
        setError("");
      } catch (err) {
        console.error("Error adding note:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("All fields (title, content, and author) are required.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleModalClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the modal
      >
        <h2>Add a Note</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              required
              aria-label="Note Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
