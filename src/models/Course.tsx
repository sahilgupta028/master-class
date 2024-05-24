import mongoose, { Document } from 'mongoose';

export interface Course extends Document {
  title: string;
  videoLink: string;
  categoryName: string;
  courseName: string;
  batch: string;
  isActive: boolean;
  courseType: string;
  orderNo: string;
  price: number;
  imageUrl: string;
  emiMode: boolean;
  numberOfEmi: number;
  zoomLink: string;
  zoomId: string;
  zoomPassword: string;
  youtubeLink: string;
  videoDescription: string;
}

const courseSchema = new mongoose.Schema<Course>({
  title: { type: String, required: true },
  videoLink: { type: String, required: true },
  categoryName: { type: String, required: true },
  courseName: { type: String, required: true },
  batch: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  courseType: { type: String, required: true },
  orderNo: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  emiMode: { type: Boolean, required: true, default: false },
  numberOfEmi: { type: Number, required: true, default: 0 },
  zoomLink: { type: String, required: true },
  zoomId: { type: String, required: true },
  zoomPassword: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  videoDescription: { type: String, required: true }
});

const CourseModel = mongoose.models.Course || mongoose.model<Course>('Course', courseSchema);
export default CourseModel;
