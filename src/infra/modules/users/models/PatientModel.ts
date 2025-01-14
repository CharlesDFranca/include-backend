import mongoose, { Schema } from "mongoose";

export type PatientDocument = {
  name: string;
  email: string;
  contact: string;
  password: string;
};

const patientSchema = new Schema<PatientDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const PatientModel = mongoose.model<PatientDocument>("Patient", patientSchema);
