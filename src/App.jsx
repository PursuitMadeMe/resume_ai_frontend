import { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";
import ResumeForm from "./components/ResumeForm";
import CoverLetterForm from "./components/CoverLetterForm";

function App() {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [showResumeForm, setShowResumeForm] = useState(true); // ✅ NEW TOGGLE STATE
  const [resetForm, setResetForm] = useState(false); // ✅ NEW RESET STATE
  const [showForm, setShowForm] = useState(true); // ✅ Controls whether the form is displayed or hidden

  const handleGenerateResume = (generatedResume) => {
    setResume(generatedResume); // ✅ Store the generated resume
    setShowForm(false); // ✅ Hide the form after generating
  };

  const handleGenerateCoverLetter = (generatedCoverLetter) => {
    setCoverLetter(generatedCoverLetter); // ✅ Store the generated cover letter
    setShowForm(false); // ✅ Hide the form after generating
  };

  const copyToClipboard = (text) => {
    if (!text) return; // Prevents copying empty content
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err));
  };

  const handleRestart = () => {
    setResume(null);
    setCoverLetter(null);
    setShowResumeForm(true);

    // ✅ Reset form, then turn off trigger to avoid infinite re-renders
    setResetForm(true);
    setTimeout(() => setResetForm(false), 50);
  };

  const downloadPDF = (text, filename) => {
    if (!text) return; // Prevent downloading empty content

    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.text(text, 10, 10, { maxWidth: 180 }); // Format text inside the PDF

    doc.save(`${filename}.pdf`); // Save with dynamic filename
  };

  return (
    // ✅ Apply the background image to the entire page
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-start bg-cover bg-center px-4 md:px-8 pt-32"
      style={{
        backgroundImage: "url('/images/resumeAI.webp')",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      {/* ✅ Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✅ Content Wrapper to ensure everything is above the background */}
      <div className="relative z-10 w-full max-w-4xl text-white">
        {/* 🎨 Animated Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse mt-24 mb-10 relative z-50">
          AI Resume & Cover Letter Generator
        </h1>

        {/* ✅ Center Everything on Page */}
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
          {/* ✅ Toggle Button for Forms */}
          {/* ✅ Hide toggle buttons after generation */}
          {!resume && !coverLetter && (
            <div className="flex space-x-4 mt-4 mb-6">
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

          {/* ✅ Show Resume Form If Selected */}
          {showForm && showResumeForm && (
            <div className="w-full max-w-lg bg-white/5 backdrop-blur-lg p-4 rounded-lg shadow-md border border-white/10">
              <ResumeForm
                onGenerate={handleGenerateResume}
                resetTrigger={resetForm}
              />
            </div>
          )}

          {/* ✅ Show Cover Letter Form If Selected */}
          {showForm && !showResumeForm && (
            <div className="w-full max-w-lg bg-white/5 backdrop-blur-lg p-4 rounded-lg shadow-md border border-white/10">
              <CoverLetterForm
                onGenerate={handleGenerateCoverLetter}
                resetTrigger={resetForm}
              />
            </div>
          )}
        </div>

        {/* 📄 Display Generated Resume */}
        {resume && (
          <div className="mt-6 w-full max-w-3xl bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-md border border-white/10 text-white">
            <h3 className="text-xl font-bold mb-2">Generated Resume</h3>
            <pre className="whitespace-pre-wrap">
              {typeof resume === "string"
                ? resume
                : JSON.stringify(resume, null, 2)}
            </pre>
            {/* ✅ Copy to Clipboard Button */}
            <button
              onClick={() => copyToClipboard(resume)}
              className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all"
            >
              Copy to Clipboard
            </button>
            {/* ✅ Download PDF Button */}
            <button
              onClick={() => downloadPDF(resume, "Resume")}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all"
            >
              Download as PDF
            </button>
            {/* ✅ Reset & Restart Button */}
            <button
              onClick={() => {
                handleRestart(); // ✅ Clears generated resume/cover letter
                setShowForm(true); // ✅ Shows the form again after clicking "Restart"
              }}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-700 transition"
            >
              Restart
            </button>
          </div>
        )}

        {/* 📄 Display Generated Cover Letter */}
        {coverLetter && (
          <div className="mt-6 w-full max-w-3xl bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-md border border-white/10 text-white">
            <h3 className="text-xl font-bold mb-2">Generated Cover Letter</h3>
            <pre className="whitespace-pre-wrap">
              {typeof coverLetter === "string"
                ? coverLetter
                : JSON.stringify(coverLetter, null, 2)}
            </pre>
            {/* ✅ Copy to Clipboard Button */}
            <button
              onClick={() => copyToClipboard(coverLetter)}
              className="mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all"
            >
              Copy to Clipboard
            </button>
            {/* ✅ Download PDF Button */}
            <button
              onClick={() => downloadPDF(coverLetter, "Cover_Letter")}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all"
            >
              Download as PDF
            </button>

            {/* ✅ Reset & Restart Button */}
            <button
              onClick={() => {
                handleRestart(); // ✅ Clears generated resume/cover letter
                setShowForm(true); // ✅ Shows the form again after clicking "Restart"
              }}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-700 transition"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
