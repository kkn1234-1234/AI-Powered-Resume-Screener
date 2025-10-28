import os
import re
import spacy
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from PyPDF2 import PdfReader

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# SETUP DATABASE CONNECTION (update credentials as needed)
conn = psycopg2.connect("dbname=resume_db user=postgres password=Karthik@25 host=localhost")
cur = conn.cursor()
nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(pdf_file):
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        t = page.extract_text()
        if t:
            text += t + " "
    return text

def extract_details(text):
    skills = re.findall(r'(Python|Java|SQL|React|Flask|NLP)', text, re.IGNORECASE)
    exp_match = re.search(r'(\d+)\s+years?', text)
    education = re.findall(r'(Bachelor|Master|Ph\.?D)', text, re.IGNORECASE)
    return {
        "skills": list(set([skill.upper() for skill in skills])),
        "experience": int(exp_match.group(1)) if exp_match else 0,
        "education": education[0] if education else ""
    }

@app.route("/upload", methods=["POST"])
def upload_resumes():
    files = request.files.getlist('resumes')
    for file in files:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        text = extract_text_from_pdf(filepath)
        details = extract_details(text)
        cur.execute(
            "INSERT INTO resumes (filename, skills, experience, education) VALUES (%s, %s, %s, %s)",
            (file.filename, ','.join(details["skills"]), details["experience"], details["education"])
        )
        conn.commit()
    return jsonify({'message': 'Uploaded successfully'}), 200

@app.route("/match", methods=["POST"])
def match_resumes():
    job_desc = request.json.get("job_desc", "")
    # Convert both skills and keywords to uppercase & strip spaces
    job_keywords = set([word.upper().strip() for word in re.findall(r'\b\w+\b', job_desc)])
    cur.execute("SELECT id, filename, skills, experience, education FROM resumes")
    candidates = cur.fetchall()
    results = []
    for cand in candidates:
        cand_skills = set([skill.upper().strip() for skill in cand[2].split(',')])
        score = len(cand_skills & job_keywords)
        results.append({
            "id": cand[0],
            "filename": cand[1],
            "skills": cand[2],
            "experience": cand[3],
            "education": cand[4],
            "score": score
        })
    sorted_results = sorted(results, key=lambda x: x['score'], reverse=True)
    return jsonify(sorted_results)

if __name__ == "__main__":
    app.run(debug=True)
