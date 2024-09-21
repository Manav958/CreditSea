import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicantTable = ({ applicants }: { applicants: any[] }) => {
  const [totalApplicants, setTotalApplicants] = useState(0);

  useEffect(() => {
    // Fetch the total number of applicants
    const fetchTotalApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/applicants/count');
        setTotalApplicants(response.data.count); // Assuming the response returns { count: number }
      } catch (error) {
        console.error('Failed to fetch total applicants:', error);
      }
    };

    fetchTotalApplicants();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/applicants/${id}/status`, { status: newStatus });
      alert('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const handleResumeDownload = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/applicants/${id}/resume`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}_resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      alert('Resume downloaded successfully');
    } catch (error) {
      console.error('Failed to download resume:', error);
      alert('Failed to download resume');
    }
  };

  const handleAddApplicantClick = () => {
    window.location.href = 'http://localhost:3000'; // Redirect to the add applicant page
  };

  return (
    <div className="applicant-container">
      <div className="sidebar">
        <header className="sidebar-header">
          <h2>Company Name</h2>
        </header>
        <ul>
          <li>Applicants</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
      <div className="content">
        <header className="applicant-header">
          <h1>Applicant Management</h1>
        </header>
        <div className="cards">
          <div className="card1">Total Applicants: {totalApplicants}</div>
          <div className="card"></div>
          <div
            className="card1"
            onClick={handleAddApplicantClick}
            style={{ cursor: 'pointer' }}
          >
            + Add Applicant
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <tr key={applicant._id}>
                  <td>{applicant.name}</td>
                  <td>{applicant.email}</td>
                  <td className={applicant.status}>
                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                  </td>
                  <td>
                    <select
                      value={applicant.status}
                      onChange={(e) => handleStatusUpdate(applicant._id, e.target.value)}
                      className="status-dropdown"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      className="download-button"
                      onClick={() => handleResumeDownload(applicant._id)}
                      style={{ marginLeft: '10px' }}
                    >
                      Download Resume
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No applicants found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantTable;
