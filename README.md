

```markdown
# IPL E-commerce App

An IPL-themed e-commerce platform that allows users to select their favorite IPL team, explore merchandise, and enjoy a customized shopping experience with team-specific branding.

## Features
- **Team Customization**: Users can select their favorite IPL team during signup or update it later in their profile.
- **Personalized Experience**: Team logos, taglines, and color themes are dynamically displayed based on the selected team.
- **Merchandise Store**: Explore team-specific merchandise like jerseys, caps, and accessories.
- **Secure Authentication**: JWT-based authentication implemented with Zod validation.
- **Tech Stack**:
  - **Frontend**: Vite + React + TypeScript, with SADCN for UI components.
  - **Backend**: Express.js with TypeScript.
  - **Database**: MongoDB.

---

## Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/)
- Package manager: npm

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ipl-ecommerce.git
   cd ipl-ecommerce
   ```

2. **Install Dependencies**
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     ```

3. **Set Up Environment Variables**
   Create `.env` files in both `frontend` and `backend` directories with the following variables:

   #### Backend `.env`
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```



4. **Run the Application**
   - Start the backend:
     ```bash
     cd backend
     node dist/index.js
     
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm run dev
     ```

5. **Access the App**
   Open your browser and navigate to `http://localhost:5173`.

---

## Environment Variables Details

| Variable         | Description                                       |
|-------------------|---------------------------------------------------|
| `PORT`           | Port number for the backend server                |
| `MONGO_URI`      | MongoDB connection string                         |
| `JWT_SECRET`     | Secret key for signing JWT tokens                 |
| `VITE_API_URL`   | URL of the backend API, used by the frontend       |

---

## Team Assignment Logic

### During Signup
1. Users are prompted to select their favorite IPL team.
2. The team selection is stored in the database along with the user details.

### Updating Team
1. Users can update their favorite team via the profile settings.
2. The backend validates the request and updates the team information in the database.

### Personalized Experience
- The selected team's details, including **logo**, **tagline**, and **color theme**, are fetched dynamically.
- Products displayed are filtered to show only merchandise relevant to the selected team.

---



---

## Tech Stack

| Component    | Technology         |
|--------------|---------------------|
| **Frontend** | Vite, React, TypeScript, SADCN |
| **Backend**  | Express, TypeScript |
| **Database** | MongoDB             |
| **Auth**     | JWT, Zod            |

---


