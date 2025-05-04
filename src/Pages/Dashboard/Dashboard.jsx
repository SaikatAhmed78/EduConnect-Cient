import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaPlus, FaEdit, FaCalendarAlt, FaUsers, 
  FaUserShield, FaBars 
} from 'react-icons/fa';
import useAdminRole from '../../Hooks/useAdminRole';
import useTutorRole from '../../Hooks/useTutorRole';

const tutorMenuItems = [
  { to: "/dashboard/tutorDS", label: "Tutor Dashboard", icon: <FaHome />, end: true },
  { to: "/dashboard/create-study-session", label: "Create Study Session", icon: <FaPlus /> },
  { to: "/dashboard/view-all-study-session", label: "View All Study Sessions", icon: <FaEdit /> },
  { to: "/dashboard/upload-materials", label: "Upload Materials", icon: <FaCalendarAlt /> },
  { to: "/dashboard/view-all-materials", label: "View All Materials", icon: <FaUsers /> },
];

const studentMenuItems = [
  { to: "/dashboard/studentDS", label: "Student Dashboard", icon: <FaHome />, end: true },
  { to: "/dashboard/view-booked-session", label: "View Booked Sessions", icon: <FaCalendarAlt /> },
  { to: "/dashboard/create-note", label: "Create Note", icon: <FaPlus /> },
  { to: "/dashboard/manage-notes", label: "Manage Personal Notes", icon: <FaEdit /> },
  { to: "/dashboard/view-study-meterials", label: "View Study Materials", icon: <FaCalendarAlt /> },
];

const adminMenuItems = [
  { to: "/dashboard/adminDa", label: "Admin Dashboard", icon: <FaHome />, end: true },
  { to: "/dashboard/view-all-users", label: "View All Users", icon: <FaUserShield /> },
  { to: "/dashboard/view-all-study-sessionA", label: "View All Sessions", icon: <FaEdit /> },
  { to: "/dashboard/view-all-materialsA", label: "View All Materials", icon: <FaCalendarAlt /> },
];

const Dashboard = () => {
  const [isAdmin] = useAdminRole();
  const [isTutor] = useTutorRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) navigate("/dashboard/adminDa");
    else if (isTutor) navigate("/dashboard/tutorDS");
    else navigate("/dashboard/studentDS");
  }, [isAdmin, isTutor, navigate]);

  let menuItems = studentMenuItems;
  if (isAdmin) menuItems = adminMenuItems;
  else if (isTutor) menuItems = tutorMenuItems;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`fixed z-30 ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 h-full bg-white/80 backdrop-blur-lg border-r border-blue-200 shadow-xl`}>
        <div className="flex items-center justify-between px-4 py-6">
          {isSidebarOpen && (
            <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">EduConnect</h1>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-indigo-600">
            <FaBars size={20} />
          </button>
        </div>

        <nav className="px-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-md'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-indigo-200 pt-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                ${isActive
                  ? 'bg-indigo-100 text-indigo-700 font-semibold shadow-md'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`
              }
            >
              <FaHome />
              {isSidebarOpen && <span className="text-sm">Back to Home</span>}
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 ml-${isSidebarOpen ? '64' : '20'} p-6 overflow-y-auto`}>
        <div className="rounded-xl bg-white shadow-lg p-6 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
