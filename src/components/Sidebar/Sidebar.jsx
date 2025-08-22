import { useState } from "react";
import { Plus, Search, Settings, LogOut, Menu, Clock } from "lucide-react";

function Sidebar({ recent = [] }) {
    const [isOpen, setIsOpen] = useState(true);
    const [prevQuestion, setPrevQuestion] = useState('');
    
    const menus = [
        { title: "New Chat", icon: <Plus size={20} />, active: true },
        { title: "Search", icon: <Search size={20} /> },
        { title: "Settings", icon: <Settings size={20} /> },
        { title: "Logout", icon: <LogOut size={20} /> },
    ];

    

    return (
        <div
            className={`${isOpen ? "w-64" : "w-20"} transition-all duration-300 h-screen 
      bg-gradient-to-b from-zinc-800 via-zinc-800 to-zinc-700 
      flex flex-col border-r border-gray-700 shadow-xl`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                {isOpen && (
                    <h1 className="text-xl font-bold text-gray-100">Gemini</h1>
                )}
                <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu />
                </button>
            </div>

            {/* Menu List */}
            <div className="flex-1 px-2 space-y-2">
                {menus.map((menu, i) => (
                    <button
                        key={i}
                        className={`flex items-center gap-3 p-3 w-full rounded-xl 
              text-gray-300 hover:bg-gray-700 hover:text-white transition-all
              ${menu.active
                                ? "bg-gray-700 text-white shadow-md shadow-blue-400/20"
                                : ""
                            }`}
                    >
                        {menu.icon}
                        {isOpen && (
                            <span className="text-sm font-medium">
                                {menu.title}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Recent Questions */}
            <div className="px-2 pb-4">
                {isOpen && (
                    <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2 flex items-center gap-2">
                        <Clock size={14} /> Recent
                    </h3>
                )}
                <div className="space-y-2">
                    {recent.length > 0 ? (
                        prevQuestion.map((item, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-lg bg-zinc-700/40 text-gray-300 text-xs truncate 
                  hover:bg-zinc-600 cursor-pointer transition`}
                                title={item} 
                            >
                                {isOpen ? item : <Clock size={16} />}
                            </div>
                        ))
                    ) : (
                        isOpen && (
                            <p className="text-xs text-gray-500">
                                No recent questions
                            </p>
                        )
                    )}
                </div>
            </div>

            {/* Footer Profile */}
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="w-10 h-10 rounded-full border border-gray-600"
                    />
                    {isOpen && (
                        <div className="leading-tight">
                            <p className="text-gray-100 font-semibold">Piyush Pandey</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
