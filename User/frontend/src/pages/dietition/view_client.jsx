import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './navbar1';
import Topbar from "./topbar1";

function ViewClient() {
  const { email } = useParams();  // Get the email parameter from the URL
  const [mealPlanData, setMealPlanData] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Fetch the meal plan data based on the email
        const res = await axios.get(`/api/auth/meal-plan/${email}`);
        if (res.data) {
          setMealPlanData(res.data.mealPlan);  // Assuming the data comes inside mealPlan
        }
      } catch (error) {
        console.error("Error fetching meal plan data:", error);
      }
    };

    fetchClientData();
  }, [email]);

  if (!mealPlanData) return <div>Loading...</div>;

  const { plan, actual_plan } = mealPlanData;  // Destructure the data

  // Function to render meal data for a single day (Non-editable)
  const renderDayPlan = (day, planType) => {
    const dayPlan = plan[day] || {}; // fallback to empty object

    return (
      <tr key={day}>
        <td className="border px-4 py-2">{`${planType} - ${day}`}</td>
        <td className="border px-4 py-2">
          <span>{dayPlan?.breakfast || "N/A"}</span>
        </td>
        <td className="border px-4 py-2">
          <span>{dayPlan?.breakfast_cal || "N/A"}</span>
        </td>
        <td className="border px-4 py-2">
          <span>{dayPlan?.lunch || "N/A"}</span>
        </td>
        <td className="border px-4 py-2">
          <span>{dayPlan?.lunch_cal || "N/A"}</span>
        </td>
        <td className="border px-4 py-2">
          <span>{dayPlan?.dinner || "N/A"}</span>
        </td>
        <td className="border px-4 py-2">
          <span>{dayPlan?.dinner_cal || "N/A"}</span>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex h-screen gap-8">
      <Navbar />
      <div className="flex-1">
        <Topbar />
        <div className="p-8 overflow-auto">
          <h1 className="text-2xl font-bold mb-5">Client Meal Plan</h1>

          {/* Display the client info (email, dietitian, etc.) */}
          <div className="mb-6">
            <p><strong>Email:</strong> {mealPlanData.email}</p>
          </div>

          {/* Display the Meal Plan and Actual Plan side by side */}
          <div className="grid grid-cols-1 md:grid-cols-1">
            {/* Left side: Meal Plan */}
            <div className="flex flex-col mb-4">
              <h2 className="text-xl font-semibold mb-4">Meal Plan</h2>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Day</th>
                    <th className="border px-4 py-2">Breakfast</th>
                    <th className="border px-4 py-2">Breakfast Calories</th>
                    <th className="border px-4 py-2">Lunch</th>
                    <th className="border px-4 py-2">Lunch Calories</th>
                    <th className="border px-4 py-2">Dinner</th>
                    <th className="border px-4 py-2">Dinner Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {plan && Object.keys(plan).map((day) => renderDayPlan(day, 'Plan'))}
                </tbody>
              </table>
            </div>

            {/* Right side: Actual Plan (Non-editable) */}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Actual Intake</h2>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Day</th>
                    <th className="border px-4 py-2">Breakfast</th>
                    <th className="border px-4 py-2">Lunch</th>
                    <th className="border px-4 py-2">Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {actual_plan && Object.keys(actual_plan).map((day) => (
                    <tr key={day}>
                      <td className="border px-4 py-2">{`Actual - ${day}`}</td>
                      <td className="border px-4 py-2">
                        <span>{actual_plan[day]?.breakfast || "N/A"}</span>
                      </td>
                      <td className="border px-4 py-2">
                        <span>{actual_plan[day]?.lunch || "N/A"}</span>
                      </td>
                      <td className="border px-4 py-2">
                        <span>{actual_plan[day]?.dinner || "N/A"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewClient;
