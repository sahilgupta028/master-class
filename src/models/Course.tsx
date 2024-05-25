import mongoose, { Document } from 'mongoose';

export interface Course extends Document {
  courseTitle: string;
  courseDescription: string;
  price: number;
  totalApplied: number;
  downloadSyllabus: string;
  courseType: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  aboutCourse: string;
  tools: string[];
}

const courseSchema = new mongoose.Schema<Course>({
  courseTitle: { type: String, required: true },
  courseDescription: { type: String, required: true },
  price: { type: Number, required: true },
  totalApplied: { type: Number, required: true },
  downloadSyllabus: { type: String, required: true },
  courseType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: String, required: true },
  aboutCourse: { type: String, required: true },
  tools: { type: [String], required: true },
});

const CourseModel = mongoose.models.Course || mongoose.model<Course>('Course', courseSchema);
export default CourseModel;
