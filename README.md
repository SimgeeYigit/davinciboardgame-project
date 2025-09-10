# React + Vite Frontend - Sample Data (Phase 1)

## 📌 Objective
This project is built as part of **Phase 1** to evaluate:
- Ability to set up a React + TypeScript project using Vite
- Fetch and display sample data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- Implement CRUD operations
- Apply basic styling and maintain ESLint rules

---

## 🚀 Features
- **Homepage** with navigation to:
  - **Users List**: `id`, `name`, `username`, `email`
  - **Posts List**: `userId`, `id`, `title`
- **CRUD Operations**:
  - Create new users and posts
  - Update existing users and posts
  - Delete users and posts
- **Relation between Users and Posts**:
  - Posts are linked to Users through the `userId` field
- **Search & Filter** functionality for readability
- **Basic UI/UX** for a clean layout
- **Linting**: ESLint rules applied with no errors

---

## 🛠️ Tech Stack
- [React](https://reactjs.org/) (with Hooks & TypeScript)
- [Vite](https://vitejs.dev/) (fast dev server & bundler)
- [Axios](https://axios-http.com/) (for API requests)
- [React Toastify](https://fkhadra.github.io/react-toastify/) (for notifications)
- [Tailwind CSS](https://tailwindcss.com/) (styling)
- [ESLint](https://eslint.org/) (linting rules)

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/SimgeeYigit/davinciboardgame-project.git
cd davinciboardgame-project
npm install
