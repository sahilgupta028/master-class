import mongoose, { Document } from 'mongoose';

export interface Course extends Document {
  title: string;
  description: string;
  imageLink: string;
  coursePrice: number;
  premiumPrice: number;
  tags: string;
  downloadLink: string;
}

const courseSchema = new mongoose.Schema<Course>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageLink: { type: String, required: true },
  coursePrice: { type: Number, required: true },
  premiumPrice: { type: Number, required: true },
  tags: { type: String, required: true }, // Assuming tags will be stored as a single string representing one selected tag
  downloadLink: { type: String, required: true },
});

const CourseModel = mongoose.models.Course || mongoose.model<Course>('Course', courseSchema);
export default CourseModel;
