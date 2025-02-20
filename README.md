Angular Project Setup Guide

Prerequisites:
Before running the project, ensure you have the following installed:
- Node.js (LTS version) - Download from https://nodejs.org/
- Angular CLI - Install globally using:
  npm install -g @angular/cli
- Git - Download from https://git-scm.com/

---

Clone the Repository:
Use the following command to clone the repository:
git clone <repository-url>
Replace <repository-url> with the actual repository link.

---

Navigate to the Project Directory:
cd <project-folder>
Replace <project-folder> with your project's folder name.

---

Install Dependencies:
Run the following command to install required packages:
npm install

---

Environment Variables:
If the project requires environment configurations, update:
- src/environments/environment.ts
- src/environments/environment.prod.ts

---

Run the Project:
Start the development server:
ng serve

The application will be available at:
http://localhost:4200

---

Build for Production:
To create a production build, run:
ng build --configuration=production

The build output will be in the dist/ folder.

---

Additional Commands:
- Run Unit Tests:
  ng test
- Run Linter:
  ng lint

---

Note: Setup and Run Angular Project
- Ensure you are using the correct Node.js and Angular CLI versions to avoid compatibility issues.
- If you face permission issues while installing dependencies, try running:
  npm install --legacy-peer-deps
- In case of missing module errors, delete node_modules and package-lock.json, then reinstall:
  rm -rf node_modules package-lock.json
  npm install
- If the default port (4200) is busy, run:
  ng serve --port=4300
  (Change 4300 to any available port.)
- If you encounter CORS issues while calling APIs, update the backend to allow cross-origin requests.

---

Contributing:
1. Fork the repository.
2. Create a new branch:
   git checkout -b feature-branch
3. Make your changes and commit them:
   git commit -m "Added a new feature"
4. Push to the branch:
   git push origin feature-branch
5. Open a Pull Request.

---

Contact:
For any issues or questions, please reach out to the project maintainers.
#   U G C - I N Q U I R Y - S T U D E N T S  
 #   U G C - I N Q U I R Y - S T U D E N T S  
 