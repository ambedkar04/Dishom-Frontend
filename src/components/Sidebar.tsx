import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  FileText,
  Library,
  Store,
  Mail,
  Info,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import logo from "@/assets/BioCure.png";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Study");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  type NavigationItem = {
    name: string;
    icon: typeof BookOpen;
    href: string;
    isDivider?: boolean;
  };

  const navigationItems: NavigationItem[] = [
    { name: "Study", icon: BookOpen, href: "/study" },
    { name: "Batches", icon: Users, href: "/batches" },
    { name: "Test Series", icon: FileText, href: "/test-series" },
    { name: "Library", icon: Library, href: "/library" },
    { name: "Store", icon: Store, href: "/store" },
    { name: "divider", isDivider: true } as any,
    { name: "Contact Us", icon: Mail, href: "/contact" },
    { name: "About Us", icon: Info, href: "/about" },
  ];

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navigationItems.find(
      (item) => item.href === currentPath
    );
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);

  const handleNavigation = (href: string, name: string) => {
    setActiveItem(name);
    navigate(href);
    setIsMobileOpen(false); // Close mobile sidebar on navigation
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-4 flex items-center justify-center">
            <img
              src={logo}
              alt="BioCure"
              className="h-10 w-auto cursor-pointer"
              onClick={() => handleNavigation("/study", "Study")}
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          if (item.isDivider) {
            return <hr key="divider" className="my-2 border-gray-200" />;
          }

          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href, item.name)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                />
                <span className="font-medium">{item.name}</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  isActive
                    ? "text-blue-600 rotate-90"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">© 2025 DISHOM Classes</p>
          <p className="text-xs text-gray-400 mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-white rounded-md shadow-lg border border-gray-200"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop, Laptop, and Tablet Sidebar - Always Visible */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:h-screen">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
