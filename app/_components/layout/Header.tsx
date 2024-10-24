import Link from "next/link";
import { Home, ListTodo, Calendar, User, LogOut } from "lucide-react";

export default function Header() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 w-full h-[80px] shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              GameBacklog
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/backlog" 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50"
            >
              <ListTodo size={20} />
              <span>Backlog</span>
            </Link>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50">
              <Calendar size={20} />
              <span>Planner</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50">
              <Home size={20} />
              <span>Suggestion</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50">
              <User size={20} />
              <span>Profile</span>
            </button>
          </div>

          {/* Sign Out Button */}
          <button 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg
                     bg-red-500/10 text-red-400 hover:bg-red-500/20 
                     transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}