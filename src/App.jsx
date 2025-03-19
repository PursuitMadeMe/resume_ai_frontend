import { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";
import ResumeForm from "./components/ResumeForm";
import CoverLetterForm from "./components/CoverLetterForm";

function App() {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [showResumeForm, setShowResumeForm] = useState(true);
  const [resetForm, setResetForm] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleGenerateResume = (generatedResume) => {
    setResume(generatedResume);
    setShowForm(false);

    setTimeout(() => {
      document
        .getElementById("resumeSection")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleGenerateCoverLetter = (generatedCoverLetter) => {
    setCoverLetter(generatedCoverLetter);
    setShowForm(false);

    setTimeout(() => {
      document
        .getElementById("coverLetterSection")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err));
  };

  const handleRestart = () => {
    setResume(null);
    setCoverLetter(null);
    setShowResumeForm(true);
    setResetForm(true);
    setTimeout(() => setResetForm(false), 50);
    setShowForm(true);
  };

  const downloadPDF = (text, filename) => {
    if (!text) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.text(text, 10, 10, { maxWidth: 180 });
    doc.save(`${filename}.pdf`);
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-between bg-cover bg-center px-4 md:px-8 pt-32"
      style={{
        backgroundImage: "url('/images/resumeAI.webp')",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-4xl text-white flex flex-col min-h-screen justify-between items-center">
        {/* Animated Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse mt-12 mb-10">
          AI Resume & Cover Letter Generator
        </h1>

        {/* Show Toggle Buttons Only If Nothing is Generated */}
        {!resume && !coverLetter && (
          <div className="flex justify-center space-x-4 mt-6 mb-10">
            <button
              onClick={() => setShowResumeForm(true)}
              className={`px-6 py-2 text-lg font-bold rounded-lg transition-all duration-300 ${
                showResumeForm
                  ? "bg-blue-600 text-white"
                  : "bg-white/20 text-gray-200"
              }`}
            >
              Show Resume Form
            </button>
            <button
              onClick={() => setShowResumeForm(false)}
              className={`px-6 py-2 text-lg font-bold rounded-lg transition-all duration-300 ${
                !showResumeForm
                  ? "bg-blue-600 text-white"
                  : "bg-white/20 text-gray-200"
              }`}
            >
              Show Cover Letter Form
            </button>
          </div>
        )}

        {/* Display Forms Based on Selection */}
        {showForm && showResumeForm && (
          <div className="w-full max-w-lg bg-white/5 backdrop-blur-lg p-6 rounded-lg shadow-md border border-white/10 flex flex-col justify-center items-center">
            <ResumeForm
              onGenerate={handleGenerateResume}
              resetTrigger={resetForm}
            />
          </div>
        )}

        {showForm && !showResumeForm && (
          <div className="w-full max-w-lg bg-white/5 backdrop-blur-lg p-6 rounded-lg shadow-md border border-white/10 flex flex-col justify-center items-center">
            <CoverLetterForm
              onGenerate={handleGenerateCoverLetter}
              resetTrigger={resetForm}
            />
          </div>
        )}

        {/* Auto-scroll into view when content is generated */}
        {resume && (
          <div
            className="mt-24 w-full max-w-3xl bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md border border-white/10 text-white"
            id="resumeSection"
          >
            <h3 className="text-xl font-bold mb-2">Generated Resume</h3>
            <pre className="whitespace-pre-wrap overflow-y-auto max-h-[600px] p-4">
              {resume}
            </pre>
          </div>
        )}

        {coverLetter && (
          <div
            className="mt-24 w-full max-w-3xl bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md border border-white/10 text-white"
            id="coverLetterSection"
          >
            <h3 className="text-xl font-bold mb-2">Generated Cover Letter</h3>
            <pre className="whitespace-pre-wrap overflow-y-auto max-h-[600px] p-4">
              {coverLetter}
            </pre>
          </div>
        )}

        {/* Action Buttons (Appear Only When Resume or Cover Letter is Generated) */}
        {(resume || coverLetter) && (
          <div className="mt-10 w-full max-w-3xl flex justify-around items-center px-6 pb-10">
            {/* Copy to Clipboard Button */}
            <button
              onClick={() => copyToClipboard(resume || coverLetter)}
              className="w-1/3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl transition-all duration-300 hover:from-purple-600 hover:to-blue-500 shadow-lg text-center"
            >
              📋 Copy
            </button>

            {/* Download PDF Button */}
            <button
              onClick={() =>
                downloadPDF(
                  resume || coverLetter,
                  resume ? "Resume" : "Cover_Letter"
                )
              }
              className="w-1/3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl transition-all duration-300 hover:from-purple-600 hover:to-blue-500 shadow-lg text-center"
            >
              📄 Download PDF
            </button>

            {/* Restart Button */}
            <button
              onClick={() => {
                handleRestart();
                setShowForm(true);
              }}
              className="w-1/3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl transition-all duration-300 hover:from-purple-600 hover:to-blue-500 shadow-lg text-center"
            >
              🔄 Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
