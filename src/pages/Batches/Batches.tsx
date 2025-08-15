import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, BookOpen } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Menubar from '@/components/Menubar';

const Batches: React.FC = () => {
  // Dummy batch data
  const batches = [
    {
      id: 1,
      name: "NEET 2025 - Foundation Batch",
      subject: "Physics, Chemistry, Biology",
      instructor: "Dr. Rajesh Kumar",
      startDate: "2024-09-01",
      duration: "12 months",
      students: 150,
      status: "Active",
      price: "₹25,000"
    },
    {
      id: 2,
      name: "JEE Main 2025 - Crash Course",
      subject: "Physics, Chemistry, Mathematics",
      instructor: "Prof. Anita Sharma",
      startDate: "2024-10-15",
      duration: "6 months",
      students: 89,
      status: "Enrolling",
      price: "₹18,000"
    },
    {
      id: 3,
      name: "Class 12 Board Exam Prep",
      subject: "All Subjects",
      instructor: "Multiple Instructors",
      startDate: "2024-11-01",
      duration: "8 months",
      students: 200,
      status: "Coming Soon",
      price: "₹15,000"
    }
  ];


  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Menubar />
        <div className="flex-1 overflow-y-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Batches</h1>
          <p className="text-gray-600">Choose from our comprehensive coaching programs</p>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <Card key={batch.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {batch.name}
                  </CardTitle>
                  <Badge variant={batch.status === 'Active' ? 'default' : batch.status === 'Enrolling' ? 'secondary' : 'outline'}>
                    {batch.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  {batch.subject}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Instructor */}
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{batch.instructor}</span>
                </div>

                {/* Start Date */}
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    Starts: {new Date(batch.startDate).toLocaleDateString()}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Duration: {batch.duration}</span>
                </div>

                {/* Students */}
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{batch.students} students enrolled</span>
                </div>

                {/* Price */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">{batch.price}</span>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={batch.status === 'Coming Soon'}
                    >
                      {batch.status === 'Coming Soon' ? 'Notify Me' : 'Enroll Now'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Section */}
        <div className="mt-12">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-900">
                🧪 Test Section - Dummy Data
              </CardTitle>
              <CardDescription className="text-blue-700">
                This is a test component with sample batch data for development purposes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Batches</h4>
                  <p className="text-2xl font-bold text-blue-600">{batches.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Students</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {batches.reduce((sum, batch) => sum + batch.students, 0)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Active Batches</h4>
                  <p className="text-2xl font-bold text-orange-600">
                    {batches.filter(batch => batch.status === 'Active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batches;