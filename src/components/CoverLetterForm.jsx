import { useState } from "react";

function CoverLetterForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Now using "handleSubmit" for consistency
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh
    setLoading(true); // Show loading state

    try {
      const response = await fetch(
        "http://localhost:9000/ai/generate-cover-letter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_title: jobTitle,
            company: companyName,
            applicant_name: applicantName,
          }),
        }
      );

      const data = await response.json();
      setCoverLetter(data.cover_letter);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      setCoverLetter("Error generating cover letter.");
    }

    setLoading(false); // Hide loading state
  };

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
        Generate Your Cover Letter
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        Provide your details below to generate a personalized cover letter.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Applicant Name Input */}
        <div>
          <label className="block text-gray-600 text-sm">Your Name</label>
          <input
            type="text"
            name="applicantName"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>

        {/* Job Title Input */}
        <div>
          <label className="block text-gray-600 text-sm">Job Title</label>
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
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </form>

      {/* Display Cover Letter */}
      {coverLetter && (
        <div className="mt-6 p-4 bg-gray-100 border rounded-md">
          <h3 className="text-lg font-bold">Generated Cover Letter</h3>
          <pre className="whitespace-pre-wrap text-gray-800 mt-2">
            {coverLetter}
          </pre>
        </div>
      )}
    </div>
  );
}

export default CoverLetterForm;
