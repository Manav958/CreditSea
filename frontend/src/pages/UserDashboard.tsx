import React, { useState } from 'react';
import axios from 'axios';
import './UserDashboard.css'; // Ensure the path matches your file structure

const UserDashboard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (resume) formData.append('resume', resume);

    try {
      await axios.post('http://localhost:5000/api/apply', formData);
      alert('Application submitted successfully');
      // Optionally reset form fields
      setName('');
      setEmail('');
      setResume(null);
    } catch (error) {
      console.error('Failed to submit application', error);
    }
  };

  return (
    <div className="applicant-container">
      <div className="sidebar">
        <header className="sidebar-header">
          <h2>Company Name</h2>
        </header>
        <ul>
          <li>Home</li>
          <li>Apply</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="content">
        <div className="form-container">
          <h1 className="form-title">Apply Form</h1>
          <form onSubmit={handleSubmit} className="application-form">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
            <input
              type="file"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              required
              className="form-input-file"
            />
            <button type="submit" className="form-submit-button">Apply</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

