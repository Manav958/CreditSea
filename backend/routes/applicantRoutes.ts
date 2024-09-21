import express from 'express';
import multer from 'multer';
import { applyApplicant, getApplicants, updateApplicantStatus,downloadResume,getTotalApplicants } from '../controllers/applicantController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.get('/admin/applicants', getApplicants);
router.get('/admin/applicants/:id/resume', downloadResume);
router.get('/admin/applicants/count', getTotalApplicants);
router.post('/apply', upload.single('resume'), applyApplicant);
router.patch('/admin/applicants/:id/status', updateApplicantStatus);


export default router;
