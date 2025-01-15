import { Schema, model } from "mongoose";

const TimeIntervalSchema = new Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const AvailabilitySchema = new Schema({
  monday: [TimeIntervalSchema],
  tuesday: [TimeIntervalSchema],
  wednesday: [TimeIntervalSchema],
  thursday: [TimeIntervalSchema],
  friday: [TimeIntervalSchema],
  saturday: [TimeIntervalSchema],
  sunday: [TimeIntervalSchema],
});

const DoctorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialty: { type: String, required: true },
  availability: { type: AvailabilitySchema, required: true },
});

export const DoctorModel = model("Doctor", DoctorSchema);
