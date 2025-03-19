import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

const ResumeForm = ({ onGenerate, resetTrigger }) => {
  const [name, setName] = useState(""); // ✅ New state for name
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Reset state when resetTrigger changes
  useEffect(() => {
    if (resetTrigger) {
      setName("");
      setJobTitle("");
      setExperience("");
      setSkills("");
    }
  }, [resetTrigger]); // Runs ONLY when resetTrigger updates

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      prompt: `Generate a resume for a ${name} ${jobTitle} with ${experience} years of experience, skilled in ${skills}.`,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate resume");
      }

      const data = await response.json();
      onGenerate(data.resume || JSON.stringify(data, null, 2)); // Pass resume data to App.jsx
    } catch (error) {
      console.error("Error generating resume:", error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
        Generate Your Resume
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        Enter your job details below to create a professional resume.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Name Input */}
        <div>
          <label className="block text-gray-700 font-medium text-md mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-md mb-2">
            Job Title
          </label>
          <input
            type="text"
            // autoComplete="off"  // ✅ Prevents browser autofill from misinterpreting the field
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-md mb-2block text-gray-600 text-sm">
            Years of Experience
          </label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-md mb-2block text-gray-600 text-sm">
            Key Skills
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="E.g., JavaScript, React, Agile"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-900 shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="h-3 w-3 bg-white rounded-full animate-bounce"></span>
              <span className="h-3 w-3 bg-white rounded-full animate-bounce delay-150"></span>
              <span className="h-3 w-3 bg-white rounded-full animate-bounce delay-300"></span>
              <span className="ml-2 text-white font-medium">Generating...</span>
            </div>
          ) : (
            "Generate Resume"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
