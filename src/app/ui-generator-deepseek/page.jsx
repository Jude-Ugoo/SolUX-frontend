import { useState, useEffect } from "react";

const INITIAL_MESSAGES = [
  { role: "system", content: "You are an expert UI developer. Generate a complete HTML page based on the user's prompt. Return only the HTML code." },
  { role: "user", content: "A modern landing page for a crypto wallet app" }
];

const UIXGeneratorDeepseek = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessageChange = (idx, field, value) => {
    setMessages((prev) => prev.map((msg, i) => i === idx ? { ...msg, [field]: value } : msg));
  };

  const handleAddMessage = () => {
    setMessages((prev) => [...prev, { role: "user", content: "" }]);
  };

  const handleRemoveMessage = (idx) => {
    setMessages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleGenerate = async () => {
    if (!messages.length || messages.some(m => !m.content.trim())) return;
    setLoading(true);
    setHtml("");
    console.log('messages>>>>>>>', messages);
    try {
      const res = await fetch("/api/deepseek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
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
        <p className="text-gray-500 dark:text-gray-300 font-inter text-center text-sm mb-4">Edit the message array and generate HTML code, rendered live below!</p>
        <div className="w-full flex flex-col gap-4">
          {messages
            .map((msg, idx) => ({ ...msg, originalIdx: idx }))
            .filter(msg => msg.role !== "system")
            .map((msg) => (
              <div key={msg.originalIdx} className="flex gap-2 items-center">
                {/* <select
                  value={msg.role}
                  onChange={e => handleMessageChange(msg.originalIdx, "role", e.target.value)}
                  className="px-2 py-2 rounded-md border border-gray-400 dark:border-gray-700 bg-[#EAEAEA] dark:bg-[#121212] text-[#030103] dark:text-white font-inter"
                  disabled={loading}
                >
                  <option value="system">system</option>
                  <option value="user">user</option>
                  <option value="assistant">assistant</option>
                </select> */}
                <input
                  value={msg.content}
                  onChange={e => handleMessageChange(msg.originalIdx, "content", e.target.value)}
                  placeholder="Message content"
                  className="flex-1 px-4 py-2 rounded-md border border-gray-400 dark:border-gray-700 bg-[#EAEAEA] dark:bg-[#121212] text-[#030103] dark:text-white font-inter"
                  disabled={loading}
                />
                {messages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMessage(msg.originalIdx)}
                    className="text-red-500 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                    disabled={loading}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          <button
            type="button"
            onClick={handleAddMessage}
            className="mt-2 px-4 py-2 rounded-md bg-primary-100 text-white font-semibold font-dm-sans hover:bg-primary-300 transition disabled:opacity-50"
            disabled={loading}
          >
            + Add Message
          </button>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || messages.some(m => !m.content.trim())}
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