// Admin Dashboard Types

export interface ProfileImage {
  id: string;
  imageUrl: string;
  uploadedDate: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
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

export interface Resume {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedDate: string;
}

// Form data types for components
export interface SkillFormData {
  name: string;
  level: string;
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
