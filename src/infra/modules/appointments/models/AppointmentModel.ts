import mongoose, { Schema, Types } from "mongoose";

const AppointmentSchema = new Schema(
  {
    patientID: {
      type: Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorID: {
      type: Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    startsAt: {
      type: Date,
      required: true,
    },
    endsAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);

export { AppointmentModel };
