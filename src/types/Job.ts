export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string; // e.g. Full-time, Contract, Part-time
  description: string;
  requirements: string;
}

export interface ApplicationForm {
  fullName: string;
  email: string;
  mobile: string;
  message: string;
}

export interface ApplicationFormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  message?: string;
}
