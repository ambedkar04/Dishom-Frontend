import Sidebar from "@/components/Sidebar";
import Menubar from "@/components/Menubar";

function Study() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar */}
        <Menubar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Study Dashboard
            </h1>

            {/* Placeholder content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Courses</h2>
                <p className="text-gray-600">
                  Your enrolled courses will appear here
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Progress</h2>
                <p className="text-gray-600">Track your learning progress</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Upcoming Tests</h2>
                <p className="text-gray-600">Scheduled tests and deadlines</p>
                <p className="text-grey-600">This is test for github push</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Study;
