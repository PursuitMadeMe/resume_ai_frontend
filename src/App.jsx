import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ResumeForm from "./components/ResumeForm";
import CoverLetterForm from "./components/CoverLetterForm";

function App() {
  const [resume, setResume] = useState(null); // ✅ Define state properly

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <ResumeForm onGenerate={setResume} />
      
      {/* Always Show Cover Letter Form */}
      <CoverLetterForm />

      {resume && (
        <div className="mt-6 max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Generated Resume</h3>
          <pre className="whitespace-pre-wrap text-gray-800">
            {JSON.stringify(resume, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );

}

export default App;
