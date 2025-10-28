# AI-Powered Resume Screener 🚀

A web application for recruiters to rapidly shortlist candidates from large resume stacks using AI extraction and matching — providing instant candidate ranking based on skills and job requirements.

**GitHub Repository:**  
[https://github.com/kkn1234-1234/AI-Powered-Resume-Screener.git](https://github.com/kkn1234-1234/AI-Powered-Resume-Screener.git)

---

## 🌟 Features

- **Bulk Resume Upload** (PDFs)
- **Automatic Extraction:** Skills, Experience, Education per resume
- **Job Description Matching:** Instantly score and rank candidates
- **Modern, Intuitive Recruiter Dashboard** (React.js frontend)
- **Top Candidates View:** Visual cards to compare resumes

---

## 🛠 Tech Stack

- **Backend:** Python (Flask), spaCy, PyPDF2, regex
- **Frontend:** React.js (Create React App), Axios
- **Database:** PostgreSQL

---

## ⚡️ How to Run the App

### 1. Clone & Install Dependencies

git clone https://github.com/kkn1234-1234/AI-Powered-Resume-Screener.git
cd AI-Powered-Resume-Screener
python -m venv venv
venv\Scripts\activate # On Windows
pip install flask flask-cors spacy PyPDF2 psycopg2-binary
python -m spacy download en_core_web_sm


### 2. Database Setup (PostgreSQL)

CREATE DATABASE resume_db;
\c resume_db
CREATE TABLE resumes (
id SERIAL PRIMARY KEY,
filename TEXT,
skills TEXT,
experience INT,
education TEXT
);

text
_Set your actual PostgreSQL password in `app.py`, if needed._

### 3. Start the Backend

set FLASK_APP=app.py

set FLASK_ENV=development

flask run

### 4. Start the Frontend

cd resume-screener-frontend

npm install

npm start


### 5. Use the App

- Go to [http://localhost:3000](http://localhost:3000) in your browser.
- Upload resume PDFs.
- Enter job description text.
- Click "Match & Rank Resumes" to instantly see the best candidates!
  
---

## 📷 Screenshots

<img width="1905" height="961" alt="image" src="https://github.com/user-attachments/assets/c66f748c-5752-4b8b-a9d9-d0e283aefb1f" />
<img width="1144" height="713" alt="image" src="https://github.com/user-attachments/assets/cfae5a8f-308f-401a-a91e-7df7b21eb949" />
<img width="1432" height="775" alt="image" src="https://github.com/user-attachments/assets/b8229ff7-6703-40e3-925e-a5bb797089e3" />
<img width="860" height="805" alt="image" src="https://github.com/user-attachments/assets/448e1e3a-2eb1-4651-8b91-ffff73aa7dee" />
<img width="991" height="830" alt="image" src="https://github.com/user-attachments/assets/d4b07a2a-738c-4fa1-842c-4feaa9a7eb01" />
<img width="1048" height="856" alt="image" src="https://github.com/user-attachments/assets/ff8c96fc-525e-4568-a64a-65256517e3d8" />
<img width="838" height="861" alt="image" src="https://github.com/user-attachments/assets/b958cef1-02eb-4663-a0f3-032a02fa5c52" />




## 📁 Project Structure

AI-Powered-Resume-Screener/
├─ app.py
├─ uploads/
├─ resume-screener-frontend/
│ └─ src/App.js
└─ README.md


---

## ✍️ Author

- MARLA KARTHIKEYAN

---

## 💼 License

MIT

---

## ⭐️ Future Improvements

- Advanced ML/NLP ranking (HuggingFace models)
- Filters for candidate experience/education
- Download/export top candidates to CSV
- User authentication for secure recruiter access
- Live deployment on cloud (Render/Heroku recommendations)
---
