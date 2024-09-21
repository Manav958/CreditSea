import mongoose, { Document, Schema } from 'mongoose';
import { Request, Response } from 'express';
import { GridFSBucket } from 'mongodb';
import Applicant from '../models/applicantModel';
import { Readable } from 'stream';


interface IApplicant extends Document {
  name: string;
  email: string;
  resumeUrl: string;
  status: 'pending' | 'accepted' | 'rejected' | 'deviated';
}

const connection = mongoose.connection;
let gfs: GridFSBucket;

connection.on("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connection.db);
});

export const applyApplicant = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const resumeFile = req.file;
  if (!resumeFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const uploadStream = gfs.openUploadStream(resumeFile.originalname);
  const readStream = new Readable();
  readStream.push(resumeFile.buffer);
  readStream.push(null);
  readStream.pipe(uploadStream);


  const newApplicant = new Applicant({
    name,
    email,
    resumeUrl:resumeFile.originalname,
    status: 'pending',
  });

  try {
    await newApplicant.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export const getApplicants = async (req: Request, res: Response) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
};

export const updateApplicantStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Applicant.findByIdAndUpdate(id, { status });
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

export const downloadResume = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const applicant = await Applicant.findById(id);
    if (!applicant || !applicant.resumeUrl) {
      return res.status(404).json({ error: 'Applicant not found or no resume available' });
    }

    const downloadStream = gfs.openDownloadStreamByName(applicant.resumeUrl);
    downloadStream.on('error', (err) => {
      return res.status(404).json({ error: 'Resume not found' });
    });
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve resume' });
  }
};

export const getTotalApplicants = async (req: Request, res: Response) => {
  try {
    const totalApplicants = await Applicant.countDocuments(); // Count total applicants
    res.json({ count: totalApplicants });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count applicants' });
  }
};
