# 🚀 HireFind – AI-Powered Recruiting Platform

HireFind is a full-stack web application designed to streamline the recruiting process using AI.
It helps candidates improve their resumes and enables recruiters to efficiently evaluate and match talent.

This project demonstrates end-to-end engineering capability across **frontend, backend, and AI integration**.

<img width="450" height="540" alt="Screenshot 2026-05-01 at 12 57 56 PM" src="https://github.com/user-attachments/assets/43eeb4d9-0892-496b-9a74-737da32383d1" />
<img width="450" height="540" alt="Screenshot 2026-05-01 at 12 58 14 PM" src="https://github.com/user-attachments/assets/18690c01-2c38-45a5-b487-edace97cc702" />

---

## ✨ Key Features

### 📄 Resume Scoring

* Analyze resumes using AI
* Generate structured scores based on:

  * Skills relevance
  * Experience quality
  * Formatting & clarity
* Provide actionable score and feedback for improvement  (**todo the UI interface**)

<img width="369" height="540" alt="Screenshot 2026-05-04 at 11 08 52 PM" src="https://github.com/user-attachments/assets/babed065-f2ec-47cc-970a-2695bb7a0c1d" />


---

### 🎯 Job Matching

* Match candidates to job descriptions using semantic understanding
* AI evaluates:

  * Skill alignment
  * Experience overlap
  * Contextual relevance
* Returns a match score + explanation (**todo the UI interface**)

<img width="369" height="539" alt="Screenshot 2026-05-04 at 11 08 21 PM" src="https://github.com/user-attachments/assets/506edaf3-3035-4b26-be65-8f533f9e801e" />

---

### 🛠 Resume Optimization  

* Automatically rewrite and improve resumes
* Tailor resumes for specific job postings
* Enhance wording, keywords, and structure using AI

<img width="606" height="556" alt="Screenshot 2026-05-05 at 12 14 33 AM" src="https://github.com/user-attachments/assets/71c4f09f-8e7b-44cc-8767-a345433a0b19" />


---

## 🧠 AI Integration

Powered by **Claude AI API**, enabling:

* Natural language understanding
* Context-aware resume evaluation
* Intelligent content generation
* Structured scoring and reasoning

---

## 🏗 Tech Stack

### Frontend

* **React**
* TypeScript
* Redux / Context API
* Material UI / Tailwind CSS
* Axios

### Backend

* **Node.js**
* Express.js
* RESTful API design
* JWT Authentication (todo)

### AI Layer

* Claude AI API (Anthropic)
* Prompt engineering
* Response parsing & scoring logic

### Data & Infrastructure (todo)

* MongoDB / PostgreSQL (flexible design)
* AWS (optional deployment)
* Docker (containerization ready)

### Dev Tools

* Git & GitHub
* CI/CD (GitHub Actions)

---

## 📂 Project Structure

```
HireFindProject/
├── frontend/        # React application
├── backend/         # Node.js + Express API
├── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repo

```
git clone https://github.com/xxxx/HireFind.git
cd HireFindProject
```

---

### 2. Setup Backend

```
cd backend
npm install
```

Create `.env`:

```
CLAUDE_API_KEY=your_api_key
PORT=5000
```

Run:

```
npm run dev
```

---

### 3. Setup Frontend

```
cd frontend
npm install
npm start
```

---

## 🔌 API Overview

### Resume Score

```
POST /api/resume/score
```

### Job Match

```
POST /api/job/match
```

### Resume Update

```
POST /api/resume/update
```

---

## 💡 Why This Project Matters

This project highlights:

* ✅ Full-stack engineering (React + Node.js)
* ✅ AI integration in real-world business use cases
* ✅ API design and system architecture
* ✅ Practical application in recruiting domain
* ✅ Scalable and extensible design

---

## 📈 Future Improvements

* Real-time interview AI assistant
* Candidate ranking dashboard
* Vector database for semantic search
* Multi-tenant SaaS architecture
* Advanced analytics & reporting

---

## 👤 Author

Built by Leo Huang
Full-stack engineer with experience in scalable systems, fintech, and AI-driven applications.

---
