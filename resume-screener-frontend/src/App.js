import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [jobDesc, setJobDesc] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  const handleUpload = async (e) => {
    setUploadMessage('');
    setIsUploading(true);
    const formData = new FormData();
    for (let file of e.target.files) {
      formData.append('resumes', file);
    }
    try {
      await axios.post('http://localhost:5000/upload', formData);
      setUploadMessage('✅ Resumes uploaded! You may now run a match.');
    } catch {
      setUploadMessage('❌ Upload failed. Try again.');
    }
    setIsUploading(false);
  };

  const handleMatch = async () => {
    setIsMatching(true);
    setResults([]);
    const res = await axios.post('http://localhost:5000/match', { job_desc: jobDesc });
    setResults(res.data);
    setIsMatching(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(120deg, #f0f6ff 0%, #dbeafe 100%)",
      padding: 0,
      margin: 0
    }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "32px 16px"
      }}>
        <header style={{
          borderRadius: 18,
          padding: "24px 0",
          marginBottom: 32,
          background: "#2563eb",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 8px 36px rgba(36, 76, 183, 0.1)"
        }}>
          <h1 style={{fontWeight: 900, letterSpacing: 1}}>AI Resume Screener</h1>
          <p style={{opacity: 0.86, fontSize: 18}}>Shortlist top candidates in seconds. Upload resumes and match to any job description.</p>
        </header>

        <section style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 24px rgba(36,60,144,0.09)",
          padding: 30,
          marginBottom: 36
        }}>
          <form style={{marginBottom: 16}}>
            <label style={{
              fontWeight: "bold",
              fontSize: 16,
              display: "block",
              marginBottom: 8
            }}>Upload Resumes (.pdf)</label>
            <input
              type="file"
              multiple
              accept="application/pdf"
              onChange={handleUpload}
              disabled={isUploading}
              style={{
                marginBottom: 12, fontSize: 16
              }}
            />
            {uploadMessage && (
              <div style={{
                color: uploadMessage.startsWith("✅") ? "green" : "red",
                fontWeight: 600,
                marginTop: 5
              }}>{uploadMessage}</div>
            )}
          </form>
          <div style={{marginBottom: 12, marginTop: 12}}>
            <label style={{
              fontWeight: "bold",
              fontSize: 16,
              display: "block",
              marginBottom: 8
            }}>Job Description</label>
            <textarea
              rows={4}
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
              placeholder="Paste or type the job requirements here"
              style={{
                width: "100%", padding: 12, border: "1.5px solid #b2bcda",
                borderRadius: 6, fontSize: 15, minHeight: 68,
                background: "#f1f7fe"
              }}
              disabled={isUploading}
            />
          </div>
          <button
            type="button"
            onClick={handleMatch}
            disabled={!jobDesc || isMatching || isUploading}
            style={{
              padding: "11px 32px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 700,
              fontSize: 17,
              boxShadow: "0 2px 12px #e0ecff",
              cursor: !jobDesc || isMatching || isUploading ? "not-allowed" : "pointer"
            }}
          >
            {isMatching ? "Matching..." : "Match & Rank Resumes"}
          </button>
        </section>

        <section>
          <h2 style={{color: "#274789", fontSize: 27, marginBottom: 18, textAlign: "left"}}>Top Candidates</h2>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: results.length > 0 ? 'flex-start' : 'center'
          }}>
            {results.length > 0 ? results.map(r => (
              <div key={r.id} style={{
                background: "#f4fafb",
                borderRadius: 12,
                boxShadow: "0 1px 7px #ddeaffb0",
                padding: "17px 23px",
                minWidth: 320,
                flexGrow: 1,
                maxWidth: 330,
                borderLeft: r.score > 0 ? "5px solid #2563eb" : "5px solid #e5e8ee",
                transition: "border .2s"
              }}>
                <div style={{
                  fontSize: 16, fontWeight: 600, letterSpacing: 0.2,
                  color: "#164072"
                }}>{r.filename}</div>
                <div style={{
                  fontSize: 15,
                  margin: '6px 0',
                  color: "#1d2539"
                }}><span style={{
                  fontWeight: 500
                }}>
                  Score: <span style={{
                    color: r.score > 0 ? "#2563eb" : "#cc2730", fontWeight: 700
                  }}>{r.score}</span>
                </span></div>
                <div style={{marginBottom: 2, fontSize: 14}}>
                  <b>Skills:</b> <span style={{
                    color: "#205a32"
                  }}>{r.skills}</span>
                </div>
                <div style={{marginBottom: 2, fontSize: 14}}><b>Experience:</b> {r.experience} years</div>
                <div style={{marginBottom: 2, fontSize: 14}}><b>Education:</b> {r.education}</div>
              </div>
            )) : (
              <div style={{
                color: "#789", opacity: 0.84, padding: 25, borderRadius: 10,
                background: "#f1f7fe", fontSize: 18
              }}>
                No candidates found. Upload resumes and run a match!
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
