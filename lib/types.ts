// Types matching the original shared/schema.ts
export interface Procedure {
  id: number;
  uid?: string;
  category?: string;
  name: string;
  description: string;
  costRange: string;
  image: string;
}

export interface Hospital {
  id: number;
  uid?: string;
  category?: string;
  name: string;
  location: string;
  specialties: string;
  accreditations: string;
  image: string;
  rating?: string;
}

export interface Doctor {
  id: number;
  uid?: string;
  category?: string;
  name: string;
  specialty: string;
  experience: string;
  hospitalId: number;
  hospitalUid?: string;
  hospitalName?: string;
  image: string;
  rating?: string;
}

export interface Accommodation {
  id: number;
  uid?: string;
  name: string;
  distance: string;
  priceRange: string;
  hospitalId: number;
  hospitalUid?: string;
  hospitalName?: string;
  image: string;
  rating?: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  age: number;
  procedureId: number;
  hospitalId: number;
  doctorId: number;
  accommodationId: number;
  medicalNotes: string;
  visaStatus: string;
  status: string;
  createdAt: Date | null;
}

export interface InsertInquiry {
  name: string;
  email: string;
  phone: string;
  country: string;
  age: number;
  procedureId: number;
  hospitalId: number;
  doctorId: number;
  accommodationId: number;
  medicalNotes: string;
  visaStatus: string;
}
