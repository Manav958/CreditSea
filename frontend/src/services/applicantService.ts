import axios from 'axios';

export const getApplicants = async () => {
  const response = await axios.get('/api/admin/applicants');
  return response.data;
};

export const applyApplicant = async (formData: FormData) => {
  const response = await axios.post('/api/apply', formData);
  return response.data;
};
