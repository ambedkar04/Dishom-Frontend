import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useResponsive from "@/hooks/useResponsive";
import { Button } from "./ui/button";
import BioCureLogo from "@/assets/BioCure.png";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Login from "@/pages/Auth/Login";
import Forgot from "@/pages/Auth/Forgot";
import Register from "@/pages/Auth/Register";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react"; // Hamburger Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login', 'register', or 'forgot'
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isDesktop = useResponsive();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Courses", href: "/courses" },
    { name: "Test Series", href: "/test-series" },
    { name: "Study Material", href: "/study-material" },
  ];

  const renderAuthView = () => {
    switch (authView) {
      case 'register':
        return <Register onSwitchToLogin={() => setAuthView('login')} />;
      case 'forgot':
        return <Forgot onSwitchToLogin={() => setAuthView('login')} />;
      case 'login':
      default:
                return <Login onSwitchToRegister={() => setAuthView('register')} onSwitchToForgotPassword={() => setAuthView('forgot')} />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        {/* Left Side - Hamburger + Logo */}
        <div className="flex items-center space-x-3 md:pl-24">
          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/">
            <img
              src={BioCureLogo}
              alt="BioCure"
              className="h-10 w-auto cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className="group inline-flex h-10 items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side - Login Button (Desktop + Mobile) */}
        <div className="flex items-center md:pr-24">
                              <Button 
            className="text-sm px-3 md:px-6 py-2 h-10 text-xs md:text-sm"
            onClick={() => {
              if (isDesktop) {
                setAuthView('login');
                setIsDialogOpen(true);
              } else {
                navigate('/login');
              }
            }}
          >
            <span className="hidden sm:inline">Login / Register</span>
            <span className="sm:hidden">Login/Register</span>
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              {renderAuthView()}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 animate-in slide-in-from-right-4 duration-300">
          <nav className="space-y-2 mt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-sm font-medium px-3 py-2 rounded-md hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;