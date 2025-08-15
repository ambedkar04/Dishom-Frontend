import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    const newPositions = Array.from({ length: 2 }).map(() => ({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    }));
    setPositions(newPositions);
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                <span className="text-blue-600">Bharat's</span> Trusted &{" "}
                <span className="text-green-600">Affordable</span>{" "}
                <span className="block mt-2">Educational Platform</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
                Unlock your potential by signing up with{" "}
                <span className="font-semibold text-blue-600">
                  Dishom Classes
                </span>{" "}
                - The most affordable learning solution
              </p>
            </div>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </Button>
            </div>
          </div>
          {/* Right Side - Two Round Images */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 scale-150"></div>
              {/* Images Container */}
              <div className="relative w-64 h-64">
                {positions.length > 0 && (
                  <>
                    {/* First Image */}
                    <div className="absolute group" style={{ top: positions[0].top, left: positions[0].left }}>
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <img
                          src="/images/HeroSection/imageStudent.JPG"
                          alt="Educational Excellence"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMzMzOEZGIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0cHgiPkVkdTwvdGV4dD4KPHN2Zz4=";
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    {/* Second Image */}
                    <div className="absolute group" style={{ top: positions[1].top, left: positions[1].left }}>
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <img
                          src="/images/HeroSection/imageStudent.JPG"
                          alt="Learning Success"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjMTBCOTgxIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0cHgiPlBXPC90ZXh0Pgo8L3N2Zz4=";
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Floating elements for visual appeal */}
              <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
