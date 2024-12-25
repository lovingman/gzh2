import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { useNavigation } from '../../hooks/useNavigation';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function Sidebar() {
  const { isAdmin } = useAuth();
  const { menuItems } = useNavigation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <React.Fragment key={item.path}>
            {(!item.adminOnly || isAdmin) && (
              <div className="mb-2">
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.path)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      {React.createElement(item.icon, { className: "h-5 w-5" })}
                      <span className="ml-3 flex-1">{item.label}</span>
                      {expandedItems.includes(item.path) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedItems.includes(item.path) && (
                      <div className="ml-4 mt-1">
                        {item.subItems.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 text-sm rounded-lg ${
                                isActive
                                  ? 'bg-indigo-50 text-indigo-600'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`
                            }
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 text-sm rounded-lg ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    {React.createElement(item.icon, { className: "h-5 w-5" })}
                    <span className="ml-3">{item.label}</span>
                  </NavLink>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}