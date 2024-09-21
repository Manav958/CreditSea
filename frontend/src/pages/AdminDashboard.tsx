import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApplicantTable from '../components/ApplicantTable';

const AdminDashboard = () => {
  const [applicants, setApplicants] = useState<any[]>([]); // Specify type if needed

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/applicants');
        console.log('Fetched applicants:', response.data); // Log the fetched data
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div>
      
      <ApplicantTable applicants={applicants} />
    </div>
  );
};

export default AdminDashboard;
