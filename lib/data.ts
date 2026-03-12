import type { Procedure, Hospital, Doctor, Accommodation } from "./types";

export const procedures: Procedure[] = [
  { id: 1, uid: "heart-bypass-surgery", name: "Heart Bypass Surgery", description: "Coronary artery bypass grafting to improve blood flow to the heart.", costRange: "$4,500 - $6,500", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop" },
  { id: 2, uid: "knee-replacement", name: "Knee Replacement", description: "Total knee arthroplasty to relieve pain and restore function in diseased knee joints.", costRange: "$3,500 - $5,000", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop" },
  { id: 3, uid: "dental-implants", name: "Dental Implants", description: "Surgical component that interfaces with the bone of the jaw or skull to support a dental prosthesis.", costRange: "$600 - $1,000 per tooth", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop" },
  { id: 4, uid: "ivf-treatment", name: "IVF Treatment", description: "In vitro fertilization to assist with the conception of a child.", costRange: "$2,500 - $4,000 per cycle", image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop" },
];

export const hospitals: Hospital[] = [
  { id: 1, uid: "apollo-hospital-delhi", name: "Apollo Hospital, Delhi", location: "New Delhi", specialties: "Cardiology, Orthopedics, Oncology", accreditations: "JCI, NABH", image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop" },
  { id: 2, uid: "fortis-escorts-gurgaon", name: "Fortis Escorts, Gurgaon", location: "Delhi NCR", specialties: "Cardiac Sciences, Renal Sciences", accreditations: "JCI, NABH", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop" },
  { id: 3, uid: "manipal-hospital", name: "Manipal Hospital", location: "Bangalore", specialties: "Multi-specialty, IVF, Organ Transplant", accreditations: "JCI, NABH", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop" },
];

export const doctors: Doctor[] = [
  { id: 1, uid: "dr-arun-prasad", name: "Dr. Arun Prasad", specialty: "Cardiothoracic Surgeon", experience: "25+ Years", hospitalId: 1, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop" },
  { id: 2, uid: "dr-smita-singh", name: "Dr. Smita Singh", specialty: "Orthopedic Surgeon", experience: "18+ Years", hospitalId: 1, image: "https://images.unsplash.com/photo-1594824432258-29b31d044949?w=800&auto=format&fit=crop" },
  { id: 3, uid: "dr-rajeev-kumar", name: "Dr. Rajeev Kumar", specialty: "Cardiologist", experience: "20+ Years", hospitalId: 2, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop" },
  { id: 4, uid: "dr-anjali-sharma", name: "Dr. Anjali Sharma", specialty: "IVF Specialist", experience: "15+ Years", hospitalId: 3, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop" },
];

export const accommodations: Accommodation[] = [
  { id: 1, uid: "taj-palace-hotel", name: "Taj Palace Hotel", distance: "2 km", priceRange: "$100 - $150 / night", hospitalId: 1, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop" },
  { id: 2, uid: "comfort-inn-suites", name: "Comfort Inn Suites", distance: "0.5 km", priceRange: "$40 - $70 / night", hospitalId: 1, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop" },
  { id: 3, uid: "radisson-blu", name: "Radisson Blu", distance: "3 km", priceRange: "$80 - $120 / night", hospitalId: 2, image: "https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?w=800&auto=format&fit=crop" },
  { id: 4, uid: "green-view-guest-house", name: "Green View Guest House", distance: "1 km", priceRange: "$30 - $50 / night", hospitalId: 3, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop" },
];
