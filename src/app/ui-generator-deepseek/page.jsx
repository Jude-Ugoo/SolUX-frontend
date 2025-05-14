import { useState, useEffect } from "react";

const INITIAL_PROMPT = "A modern landing page for a crypto wallet app";

const UIXGeneratorDeepseek = () => {
  const [prompt, setPrompt] = useState(INITIAL_PROMPT);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setHtml("");
    try {
      const res = await fetch("/api/deepseek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setHtml(data.text);
    } catch (e) {
      console.log(e);
      alert("Error generating HTML");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#030103] py-8 px-2">
      <div className="w-full max-w-2xl bg-white dark:bg-[#030103] rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 border border-gray-200 dark:border-[#5C5A5A]">
        <h1 className="text-2xl font-bold font-dm-sans text-[#030103] dark:text-white mb-2 text-center">AI HTML UI Generator</h1>
        <p className="text-gray-500 dark:text-gray-300 font-inter text-center text-sm mb-4">Enter a prompt and generate HTML code, rendered live below!</p>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe the UI you want..."
          className="w-full min-h-[80px] px-4 py-2 rounded-md border border-gray-400 dark:border-gray-700 bg-[#EAEAEA] dark:bg-[#121212] text-[#030103] dark:text-white font-inter mb-2"
          disabled={loading}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className={`w-full py-3 rounded-md font-semibold font-dm-sans text-white transition-colors bg-primary-100 hover:bg-primary-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base shadow-custom mt-2`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : null}
          {loading ? "Generating..." : "Generate HTML UI"}
        </button>
        <div className="w-full min-h-[300px] flex items-center justify-center mt-4">
          {html && (
            <iframe
              srcDoc={html}
              title="Generated UI"
              className="w-full h-[600px] rounded-lg border border-gray-200 dark:border-[#5C5A5A] shadow-md bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UIXGeneratorDeepseek; 