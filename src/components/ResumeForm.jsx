import { useState } from "react";

const ResumeForm = ({ onGenerate }) => {
  const [name, setName] = useState(""); // ✅ New state for name
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      prompt: `Generate a resume for a ${name} ${jobTitle} with ${experience} years of experience, skilled in ${skills}.`,
    };

    try {
      const response = await fetch("http://localhost:9000/ai/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate resume");
      }

      const data = await response.json();
      onGenerate(data); // Pass resume data to App.jsx
    } catch (error) {
      console.error("Error generating resume:", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Generate Your Resume
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      {/* ✅ Name Input */}
      <div>
          <label className="block text-gray-600 text-sm">Your Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm">Job Title</label>
          <input
            type="text"
            // autoComplete="off"  // ✅ Prevents browser autofill from misinterpreting the field
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm">
            Years of Experience
          </label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm">Key Skills</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 text-gray-900"
            placeholder="E.g., JavaScript, React, Agile"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
