import { useState } from "react";
import { Plus, Search, Settings, LogOut, Menu } from "lucide-react";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menus = [
        { title: "New Chat", icon: <Plus size={20} />, active: true },
        { title: "Search", icon: <Search size={20} /> },
        { title: "Settings", icon: <Settings size={20} /> },
        { title: "Logout", icon: <LogOut size={20} /> },
    ];

    return (
        <>
            {/* Desktop / Tablet Sidebar */}
            <div
                className={`${isOpen ? "w-64" : "w-20"}
        hidden md:flex transition-all duration-300 h-screen 
        bg-gradient-to-b from-zinc-800 via-zinc-800 to-zinc-700 
        flex-col border-r border-gray-700 shadow-xl`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <h1
                        className={`text-xl font-bold text-gray-100 transition-all duration-300 ${!isOpen && "opacity-0 hidden"
                            }`}
                    >
                        Gemini
                    </h1>
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
                            <span className={`${!isOpen && "hidden"} text-sm font-medium`}>
                                {menu.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Footer Profile */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="profile"
                            className="w-10 h-10 rounded-full border border-gray-600"
                        />
                        <div className={`${!isOpen && "hidden"} leading-tight`}>
                            <p className="text-gray-100 font-semibold">Piyush Pandey</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar (Slide-in Drawer) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-zinc-800 border-r border-gray-700 z-50 
        transform transition-transform duration-300 md:hidden
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-bold text-gray-100">Gemini</h1>
                    <button
                        className="text-gray-400 hover:text-gray-200"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        ✖
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
                            <span className="text-sm font-medium">{menu.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Toggle Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-800 text-gray-300 shadow-lg"
                onClick={() => setIsMobileOpen(true)}
            >
                <Menu />
            </button>
        </>
    );
}

export default Sidebar;
