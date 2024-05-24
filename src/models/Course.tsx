import mongoose, { Document } from 'mongoose';

export interface Course extends Document {
    title: string;
    description: string;
    videoLink: string;
}

const courseSchema = new mongoose.Schema<Course>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoLink: { type: String, required: true }
});

const CourseModel = mongoose.models.Course || mongoose.model<Course>('Course', courseSchema);
export default CourseModel;