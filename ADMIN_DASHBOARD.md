# Admin Dashboard

## Overview

The admin dashboard provides a comprehensive interface for managing your portfolio content. All data is currently stored in component state (local state management). When you're ready to integrate a database, you can replace the state management logic with API calls.

## Features

### 1. Profile Image Management

- Upload images via file input
- Enter image URL directly
- Real-time image preview
- Delete existing profile image

**Location**: `/admin` → Profile Image tab

### 2. Skills Management

- Add new skills with name, proficiency level, and category
- Update existing skills
- Delete skills
- View all skills in a list

**Fields**:

- Skill Name (e.g., React, Python)
- Proficiency Level (Beginner, Intermediate, Advanced, Expert)
- Category (e.g., Frontend, Backend, Database)

### 3. Experiences Management

- Add work experiences
- Update existing experiences
- Delete experiences
- Mark current position with "Currently working here" checkbox

**Fields**:

- Job Title
- Company Name
- Location
- Start Date (month/year)
- End Date (month/year) - optional if current
- Description

### 4. Achievements Management

- Add achievements with images
- Upload achievement images or enter image URLs
- Update existing achievements
- Delete achievements
- View achievements in a card grid layout

**Fields**:

- Title
- Description
- Date (month/year)
- Image (upload or URL)

### 5. Resume Management

- Upload PDF resume files
- Enter resume URL directly
- View current resume
- Delete resume
- Only one resume can be active at a time

**Supported Format**: PDF only

## File Structure

```
app/
  admin/
    page.tsx              # Main admin dashboard with tabs
components/
  admin/
    ImageUpload.tsx       # Profile image management
    SkillsManager.tsx     # Skills CRUD operations
    ExperiencesManager.tsx # Experience CRUD operations
    AchievementsManager.tsx # Achievement CRUD operations
    ResumeManager.tsx     # Resume upload/management
types/
  admin.ts               # TypeScript interfaces
```

## Usage

1. **Navigate to the admin dashboard**:

   ```
   http://localhost:3000/admin
   ```

2. **Use the navigation tabs** to switch between different sections

3. **Each section provides**:
   - Add/Create button
   - Form for data entry
   - List/Grid view of existing items
   - Edit and Delete actions

## Next Steps - Database Integration

When you're ready to add database functionality:

1. **Choose your database** (e.g., PostgreSQL, MongoDB, Supabase)

2. **Update the components** to use API calls instead of local state:
   - Replace `useState` with API fetch calls
   - Add loading states
   - Add error handling

3. **Create API routes** in `app/api/`:

   ```
   app/api/
     profile/route.ts
     skills/route.ts
     experiences/route.ts
     achievements/route.ts
     resume/route.ts
   ```

4. **Implement file upload**:
   - Set up cloud storage (AWS S3, Cloudinary, etc.)
   - Handle file uploads in API routes
   - Store URLs in database

5. **Add authentication** to protect admin routes

## Styling

The dashboard uses Tailwind CSS for styling with a clean, professional design:

- Gray color scheme for neutral background
- Blue accent colors for primary actions
- Responsive design that works on mobile and desktop
- Hover effects and transitions for better UX

## Notes

- All data is currently stored in component state (will be lost on refresh)
- Image uploads create preview URLs only (not saved to server)
- Form validation is basic (required fields only)
- No authentication yet - add this before deploying
