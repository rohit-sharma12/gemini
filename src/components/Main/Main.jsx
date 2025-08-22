import { Mic, Plus, Search, Image, BookOpen, Menu, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { GEMINI_API_URL } from "../../config/gemini";

const Main = () => {
    const [question, setQuestion] = useState("");
    const [result, setResult] = useState(null);
    const [typedResult, setTypedResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [displayedText, setDisplayedText] = useState("");

    const payload = {
        contents: [{ parts: [{ text: question }] }],
    };

    const askQuestion = async () => {
        if (!question.trim()) return;

        setLoading(true);
        setResult(null);
        setTypedResult("");

        try {
            let response = await fetch(
                GEMINI_API_URL + "?key=AIzaSyC6j0BPMcaMk0WHGu6485upgVL89zzuiBA",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            response = await response.json();
            const answer =
                response.candidates[0]?.content?.parts[0]?.text || "No response";

            setResult(answer);
        } catch (error) {
            setResult("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatResult = (text) => {
        if (!text) return "";

        return text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // ✅ Bold
            .replace(/\n\* (.*?)/g, "<li>$1</li>")            // ✅ * bullets
            .replace(/\n- (.*?)/g, "<li>$1</li>")             // ✅ - bullets
            .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")       // ✅ Wrap <ul>
            .replace(/\n/g, "<br/>");                         // ✅ Normal line break
    };

    useEffect(() => {
        if (result) {
            let i = 0;
            setDisplayedText(""); // reset before new text
            const interval = setInterval(() => {
                setDisplayedText((prev) => prev + result.charAt(i));
                i++;
                if (i >= result.length) clearInterval(interval);
            }, 15); // ⏩ Speed: smaller = faster typing
        }
    }, [result]);



    return (
        <div className="flex flex-col flex-1 bg-zinc-900 text-white">
            {/* Top Navbar */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 border-b border-zinc-800 bg-zinc-900">
                <div className="flex items-center space-x-3">
                    <button className="md:hidden p-2 rounded-lg hover:bg-zinc-800">
                        <Menu className="w-6 h-6 text-gray-300" />
                    </button>
                    <h1 className="text-lg sm:text-xl font-bold tracking-wide">Gemini</h1>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                    <button className="hidden sm:block bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium shadow-md">
                        ✨ Upgrade
                    </button>
                    <div className="w-9 h-9 rounded-full bg-gray-600 cursor-pointer border-2 border-gray-500"></div>
                </div>
            </div>

            <div className="flex-1 flex flex-col px-4 sm:px-6 py-6 overflow-y-auto">
                {loading ? (
                    // Loader
                    <div className="w-full flex flex-col gap-5 animate-pulse">
                        <div className="h-5 w-3/4 rounded bg-[#a0c9f1]" />
                        <div className="h-5 w-2/3 rounded bg-[#b4d3f1]" />
                        <div className="h-5 w-1/2 rounded bg-[#96c2ee]" />
                    </div>
                ) : !result ? (
                    // Greeting
                    <div className="text-center space-y-3">
                        <h2 className="text-2xl md:text-3xl font-semibold text-blue-500">
                            Hello, Rohit 👋
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400">
                            How can I help you today?
                        </p>
                    </div>
                ) : (
                    // ✅ Result (chat style, left aligned)
                    <div className="max-h-[70vh] overflow-y-scroll space-y-6">
                        <div>
                            <p className="text-base sm:text-lg font-semibold text-gray-100">
                                {question}
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <img
                                src="/src/assets/gemini_icon.png"
                                alt="Gemini"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 leading-relaxed">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: `<p>${formatResult(displayedText)}</p>`,
                                    }}
                                />
                                {/* Blinking cursor */}
                                {typedResult.length < (result?.length || 0) && (
                                    <span className="animate-pulse">|</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Input Section */}
            <div className="px-4 sm:px-6 pb-6">
                <div className="bg-zinc-800 border border-gray-700 rounded-2xl p-3 shadow-md max-w-2xl mx-auto w-full">
                    <div className="flex items-center space-x-3">
                        <Plus className="w-5 h-5 text-gray-300" />
                        <input
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            type="text"
                            placeholder="Ask Gemini anything..."
                            className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-100 placeholder-gray-400"
                        />
                        <Mic className="w-5 h-5 text-gray-300 cursor-pointer hover:text-blue-400" />
                        <Send
                            onClick={askQuestion}
                            className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-400 transition"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-gray-400">
                        <button className="flex items-center gap-1 hover:text-white transition">
                            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Deep Research</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-white transition">
                            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Image</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-white transition">
                            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Guided Learning</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
