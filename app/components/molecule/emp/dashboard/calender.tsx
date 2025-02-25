import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function InventoryDashboard() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate fetching events based on the selected date
    const eventList = {
      "2024-02-19": ["Meeting with vendors", "Stock update"]
    };
    const formattedDate = date.toISOString().split('T')[0];
    setEvents(eventList[formattedDate] || []);
  }, [date]);

  return (
    <div className="flex bg-blue-50 rounded-2xl mt-5 shadow-lg">
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex-1 p-6 overflow-y-auto"
      >
        
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            {/* Events Card */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Events</h2>
              {events.length > 0 ? (
                <ul>
                  {events.map((event, index) => (
                    <li key={index} className="p-2 border-b">{event}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No events today</p>
              )}
            </div>
            
            {/* Date & Time Details Card */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Today's Date & Time</h2>
              <p className="text-lg font-medium">{time.toLocaleDateString('en-IN')} - {time.toLocaleTimeString()}</p>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            {/* Calendar Card */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Calendar</h2>
              <Calendar onChange={setDate} value={date} className="w-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
