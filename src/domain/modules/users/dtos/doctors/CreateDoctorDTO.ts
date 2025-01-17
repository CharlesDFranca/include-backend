import { Availability } from "../../value-objects/Availability";
import { Email } from "../../value-objects/Email";

export type CreateDoctorDTO = {
  name: string;
  email: Email;
  contact: string;
  crm: {
    value: string;
    uf: string;
  };
  specialty: string;
  availability: Availability;
  password: string;
};
