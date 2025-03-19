import { useState } from "react";
import API_BASE_URL from "../config";

function CoverLetterForm({ onGenerate }) {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Now using "handleSubmit" for consistency
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // ✅ Clear any previous errors

    const requestData = {
      job_title: jobTitle,
      company: companyName,
      applicant_name: applicantName,
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-cover-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate resume. Please try again.");
      }

      const data = await response.json();
      onGenerate(data.resume || JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error:", error);
      setError(error.message); // ✅ Show user-friendly error message
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
        Generate Your Cover Letter
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        Provide your details below to generate a personalized cover letter.
      </p>
      {error && (
        <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Applicant Name Input */}
        <div>
          <label className="block text-gray-700 font-medium text-md mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="applicantName"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>

        {/* Job Title Input */}
        <div>
          <label className="block text-gray-700 font-medium text-md mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>

        {/* Company Name Input */}
        <div>
          <label className="block text-gray-600 text-sm">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
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
}

export default CoverLetterForm;
