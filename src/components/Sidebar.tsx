import { useState } from "react";
import {
  Menu,
  BookOpen,
  Users,
  FileText,
  Library,
  Store,
  Mail,
  Info,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Study");

  type NavigationItem = {
    name: string;
    icon?: typeof BookOpen;
    href?: string;
    isDivider?: boolean;
  };

  const navigationItems: NavigationItem[] = [
    { name: "Study", icon: BookOpen, href: "/study" },
    { name: "Batches", icon: Users, href: "/batches" },
    { name: "Test Series", icon: FileText, href: "/test-series" },
    { name: "Library", icon: Library, href: "/library" },
    { name: "Store", icon: Store, href: "/store" },
    { name: "divider", isDivider: true },
    { name: "Contact Us", icon: Mail, href: "/contact" },
    { name: "About Us", icon: Info, href: "/about" },
  ];

  type SidebarContentProps = {
    isMobile?: boolean;
  };

  const SidebarContent = ({ isMobile = false }: SidebarContentProps) => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-4 flex items-center justify-center">
            <img
              src="src/assets/BioCure.png"
              alt="BioCure"
              className="h-10 w-auto cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          if (item.isDivider) {
            return <hr key={item.name} className="my-2 border-gray-200" />;
          }
          
          const Icon = item.icon;
          const isActive = activeItem === item.name;
          
          // Skip items without href or icon
          if (!item.href || !Icon) return null;

          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
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
      {/* Desktop, Laptop, and Tablet Sidebar - Always Visible */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:h-screen">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
