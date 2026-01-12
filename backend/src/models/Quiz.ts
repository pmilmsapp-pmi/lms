
// import mongoose, { Schema, Document } from 'mongoose';

// export interface IQuizQuestion {
//   q: string;
//   choices: string[];
//   answerIndex: number;
// }

// export interface IQuiz extends Document {
//   course: mongoose.Types.ObjectId;
//   title: string;
//   durationSeconds?: number;
//   questions: IQuizQuestion[];
// }


// const QuizSchema = new Schema<IQuiz>({
//   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
//   title: { type: String, required: true },
//   durationSeconds: { type: Number },
//   questions: [{ q: String, choices: [String], answerIndex: Number }]
// }, { timestamps: true });

// export default mongoose.model<IQuiz>('Quiz', QuizSchema);
import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  q: { type: String, required: true },
  choices: [{ type: String }],
  answerIndex: { type: Number, required: true } // 0, 1, 2, atau 3
});

const QuizSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  durationSeconds: { type: Number, default: 600 }, // Default 10 menit
  questions: [QuestionSchema]
}, { timestamps: true });

export const Quiz = mongoose.model('Quiz', QuizSchema);