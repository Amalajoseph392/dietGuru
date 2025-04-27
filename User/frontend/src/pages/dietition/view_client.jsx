import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './navbar1';
import Topbar from './topbar1';
import { jsPDF } from 'jspdf';
import { toast } from "react-toastify";

function ViewClient() {
  const { email } = useParams();
  const [mealPlanData, setMealPlanData] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const res = await axios.get(`/api/auth/meal-plan/${email}`);
        if (res.data && res.data.success) {
          setMealPlanData(res.data.mealPlan);
        }
      } catch (error) {
        console.error('Error fetching meal plan data:', error);
      }
    };

    fetchClientData();
  }, [email]);

  if (!mealPlanData) {
    return <div>Loading...</div>;
  }

  const { plan, actual_plan, email: clientEmail } = mealPlanData;

  // Render the planned meals for a single day
  const renderDayPlan = (day) => {
    const dayPlan = plan?.meal_plan?.[day] || {};
    return (
      <tr key={day}>
        <td className="border px-4 py-2">Plan - {day}</td>
        <td className="border px-4 py-2">{dayPlan.breakfast || 'N/A'}</td>
        <td className="border px-4 py-2">{dayPlan.breakfast_cal || 'N/A'}</td>
        <td className="border px-4 py-2">{dayPlan.breakfast_grams || 'N/A'}</td>
        <td className="border px-4 py-2">{dayPlan.lunch || 'N/A'}</td>
        <td className="border px-4 py-2">{dayPlan.lunch_cal || 'N/A'}</td>
        <td className="border px-4 py-2">{dayPlan.lunch_grams || 'N/A'}</td>
        <td className="border px-4 py-2">{dayPlan.dinner || 'N/A'}</td>
        <td className="border px-4 py-2">{dayPlan.dinner_cal || 'N/A'}</td>
        <td className="border px-4 py-2">{dayPlan.dinner_grams || 'N/A'}</td>
      </tr>
    );
  };

  // Render the actual intake (editable) for a single day
  const renderActualIntake = (day) => {
    const actualDay = actual_plan[day] || {};
    return (
      <tr key={day}>
        <td className="border px-4 py-2">Actual - {day}</td>
        <td className="border px-4 py-2">{actualDay.breakfast || 'N/A'}</td>
        <td className="border px-4 py-2">{actualDay.breakfast_grams || 'N/A'}</td>
        <td className="border px-4 py-2">{actualDay.lunch || 'N/A'}</td>
        <td className="border px-4 py-2">{actualDay.lunch_grams || 'N/A'}</td>
        <td className="border px-4 py-2">{actualDay.dinner || 'N/A'}</td>
        <td className="border px-4 py-2">{actualDay.dinner_grams || 'N/A'}</td>
        <td className="border px-4 py-2">
          <input
            type="text"
            defaultValue={actualDay.comment || ''}
            onChange={(e) => {
              const updated = { ...actual_plan };
              updated[day] = { ...updated[day], comment: e.target.value };
              setMealPlanData((prev) => ({ ...prev, actual_plan: updated }));
            }}
            className="w-full px-2 py-1 border rounded"
          />
        </td>
      </tr>
    );
  };

  // Submit updated actual intake to the server
  const handleSubmit = async () => {
    try {
      const requests = Object.keys(actual_plan).map((day) =>
        fetch(`/api/auth/meal-plan/${email}/actual/${day}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            breakfast: actual_plan[day]?.breakfast,
            breakfast_grams: actual_plan[day]?.breakfast_grams,
            lunch: actual_plan[day]?.lunch,
            lunch_grams: actual_plan[day]?.lunch_grams,
            dinner: actual_plan[day]?.dinner,
            dinner_grams: actual_plan[day]?.dinner_grams,
            comment: actual_plan[day]?.comment,
          }),
        })
      );
      const results = await Promise.all(requests);
      results.forEach((res) => {
        if (!res.ok) console.error('Error updating:', res.statusText);
      });
      toast.success('Comment added successfully')

      console.log('All updates completed');
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  // Generate PDF of actual intake and comments
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('Client Meal Plan Report', 20, 20);
    doc.text(`Email: ${clientEmail}`, 20, 30);
    let y = 40;

    Object.keys(actual_plan).forEach((day) => {
      const item = actual_plan[day];
      doc.text(`Day: ${day}`, 20, y); y += 10;
      doc.text(`Breakfast: ${item.breakfast || 'N/A'}`, 20, y);
      doc.text(`Grams: ${item.breakfast_grams || 'N/A'}`, 120, y); y += 10;
      doc.text(`Lunch: ${item.lunch || 'N/A'}`, 20, y);
      doc.text(`Grams: ${item.lunch_grams || 'N/A'}`, 120, y); y += 10;
      doc.text(`Dinner: ${item.dinner || 'N/A'}`, 20, y);
      doc.text(`Grams: ${item.dinner_grams || 'N/A'}`, 120, y); y += 10;
      doc.text(`Comment: ${item.comment || 'N/A'}`, 20, y); y += 15;
    });

    doc.save(`${clientEmail}-meal-plan-report.pdf`);
  };

  return (
    <div className="flex h-screen gap-8">
      <Navbar />
      <div className="flex-1">
        <Topbar />
        <div className="p-8 overflow-auto">
          <h1 className="text-2xl font-bold mb-5">Client Meal Plan</h1>
          <p className="mb-6"><strong>Email:</strong> {clientEmail}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Meal Plan (Read-only)</h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Day</th>
                  <th className="border px-4 py-2">Breakfast</th>
                  <th className="border px-4 py-2">Calories</th>
                  <th className="border px-4 py-2">Grams</th>
                  <th className="border px-4 py-2">Lunch</th>
                  <th className="border px-4 py-2">Calories</th>
                  <th className="border px-4 py-2">Grams</th>
                  <th className="border px-4 py-2">Dinner</th>
                  <th className="border px-4 py-2">Calories</th>
                  <th className="border px-4 py-2">Grams</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(plan.meal_plan).map(renderDayPlan)}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Actual Intake (Editable)</h2>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Day</th>
                  <th className="border px-4 py-2">Breakfast</th>
                  <th className="border px-4 py-2">Grams</th>
                  <th className="border px-4 py-2">Lunch</th>
                  <th className="border px-4 py-2">Grams</th>
                  <th className="border px-4 py-2">Dinner</th>
                  <th className="border px-4 py-2">Grams</th>
                  <th className="border px-4 py-2">Comment</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(actual_plan).map(renderActualIntake)}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
            <button
              onClick={generatePDFReport}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Generate PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewClient;