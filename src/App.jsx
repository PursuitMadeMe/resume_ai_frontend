import { useState } from "react";
import "./App.css";
import ResumeForm from "./components/ResumeForm";
import CoverLetterForm from "./components/CoverLetterForm";

function App() {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  return (
    // ✅ Apply the background image to the entire page
    <div
      className="relative h-screen w-full flex flex-col items-center justify-center bg-cover bg-center px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: "url('/images/resumeAI.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
    >
      {/* ✅ Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✅ Content Wrapper to ensure everything is above the background */}
      <div className="relative z-10 w-full max-w-6xl text-white">
        {/* 🎨 Animated Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
          AI Resume & Cover Letter Generator
        </h1>

        {/* ✅ Wrap both forms in a flex container to position them side by side */}
        <div className="w-full max-w-6xl mt-10 flex flex-col md:flex-row gap-6 justify-center">
          {/* 📝 Resume Form */}
          <div className="w-full md:w-1/2 bg-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <ResumeForm onGenerate={setResume} />
          </div>

          {/* 📝 Cover Letter Form */}
          <div className="w-full md:w-1/2 bg-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <CoverLetterForm onGenerate={setCoverLetter} />
          </div>
        </div>

        {/* 📄 Display Generated Resume */}
        {resume && (
          <div className="mt-6 w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Generated Resume</h3>
            <pre className="whitespace-pre-wrap text-gray-300">{resume}</pre>
          </div>
        )}

        {/* 📄 Display Generated Cover Letter */}
        {coverLetter && (
          <div className="mt-6 w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Generated Cover Letter</h3>
            <pre className="whitespace-pre-wrap text-gray-300">
              {coverLetter}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
