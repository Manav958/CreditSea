import mongoose, { Schema, Document } from 'mongoose';

interface IApplicant extends Document {
  name: string;
  email: string;
  resumeUrl: string;
  status: 'pending' | 'accepted' | 'rejected' | 'deviated';
}

const applicantSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

export default mongoose.model<IApplicant>('Applicant', applicantSchema);
