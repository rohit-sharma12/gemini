import { Mic, Plus, Search, Image, BookOpen, Menu, Send } from "lucide-react";
import { useState } from 'react'
import { GEMINI_API_URL } from "../../config/gemini";

const Main = () => {
    const [question, setQuestion] = useState('');

    // const payload = {
    //     "contents": [{
    //         "parts": [{ "text": 'Explain React.js' }]
    //     }]
    // }
    const askQuestion = async () => {
        const payload = {
            contents: [{
                parts: [{ text: question }]
            }]
        };

        try {
            let response = await fetch(GEMINI_API_URL, { // Use your backend proxy
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            response = await response.json();
            console.log(response);
        } catch (error) {
            console.error("API error:", error);
        }
    };

    // const askQuestion = async () => {
    //     let response = await fetch(GEMINI_API_URL, {
    //         method: 'POST',
    //         body: JSON.stringify(payload)
    //     })
    //     response = await response.json();
    //     console.log(response);

    // }

    return (
        <div className="flex flex-col flex-1 bg-zinc-900 text-white">
            {/* Top Navbar */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 border-b border-zinc-800">
                {/* Left side */}
                <div className="flex items-center space-x-3">
                    {/* Mobile Menu */}
                    <button className="md:hidden p-2 rounded-lg hover:bg-zinc-800">
                        <Menu className="w-6 h-6 text-gray-300" />
                    </button>

                    <h1 className="text-base sm:text-lg font-semibold">Gemini</h1>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <button className="hidden sm:block bg-gray-800 px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-gray-700">
                        ✨ Upgrade
                    </button>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-600 cursor-pointer"></div>
                </div>
            </div>

            {/* Center Greeting */}
            <div className="flex flex-1 flex-col items-center justify-center text-center gap-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl text-blue-500 font-medium">
                    Hello, Rohit
                </h2>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-zinc-500 font-medium">
                    How can I help you today?
                </h2>
            </div>

            {/* Bottom Input Section */}
            {/* Bottom Input Section */}
            <div className="px-3 sm:px-6 pb-4 sm:pb-6 py mb-6">
                <div className="bg-zinc-800 border border-gray-600 rounded-2xl p-3 
                  max-w-2xl mx-auto w-full">
                    {/* Input Row */}
                    <div className="flex items-center space-x-3">
                        <Plus className="w-5 h-5 text-gray-300" />
                        <input
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            type="text"
                            placeholder="Ask Gemini"
                            className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder-gray-400"
                        />
                        <Mic className="w-5 h-5 text-gray-300 cursor-pointer" />
                        <Send onClick={askQuestion} className="w-5 h-5 text-blue-500 cursor-pointer" />
                    </div>

                    {/* Options */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:space-x-6 mt-3 text-xs sm:text-sm text-gray-300">
                        <button className="flex items-center space-x-1 hover:text-white">
                            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Deep Research</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-white">
                            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Image</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-white">
                            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Guided Learning</span>
                        </button>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Main;

