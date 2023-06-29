import React, { useState } from 'react';
import './BlogCreator.css'; // Import your CSS file

const BlogCreator = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Title: ${title}`);
    console.log(`Content: ${content}`);

    // Clear the form fields
    setTitle('');
    setContent('');
  };

  return (
    <div className="blog-creator">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter the blog title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Enter the blog content"
            required
          />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default BlogCreator;
