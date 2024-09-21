import React, { useState } from 'react';
import axios from 'axios';
import './form.css'; // Importing external CSS file for styling

const Form = () => {
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
      const response = await axios.post('/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message || 'Application submitted successfully');
      setName('');
      setEmail('');
      setResume(null);
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/applicants">Applicants</a>
        <a href="/settings">Settings</a>
        <a href="/logout">Logout</a>
      </nav>
      <div className="container">
        <h1 className="form-title">Application Form</h1>
        <h2 className="company-name">Company Name</h2>
        <form onSubmit={handleSubmit} className="applicant-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            required
            className="form-input-file"
          />
          <button type="submit" className="form-submit-button">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
