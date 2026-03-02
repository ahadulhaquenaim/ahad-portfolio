// Admin Dashboard Types

export interface ProfileImage {
  id: string;
  imageUrl: string;
  uploadedDate: string;
}

export interface Bio {
  id: string;
  title: string;
  content: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  imageUrl: string;
}

export interface Resume {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedDate: string;
}

export interface Sport {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
}

// Form data types for components
export interface SkillFormData {
  name: string;
  category: string;
}

export interface ExperienceFormData {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface AchievementFormData {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export interface CertificationFormData {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  imageUrl: string;
}

export interface BioFormData {
  title: string;
  content: string;
}

export interface SportFormData {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
}
