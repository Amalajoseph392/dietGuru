import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  TextField
} from '@mui/material';
import axios from 'axios';
import Navbar from './navbar';
import dietImage from '../assets/images/hero.jpg';

const Status = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [actualDiet, setActualDiet] = useState(
    Array(7).fill({ breakfast: '', lunch: '', dinner: '', submitted: false, error: '' })
  );

  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/auth/meal-plan/${user.email}`);
        const planData = res.data.mealPlan;
        setMealPlan(planData);

        if (planData.actual_plan) {
          const filledActual = Array(7).fill({ breakfast: '', lunch: '', dinner: '', submitted: false });
          Object.entries(planData.actual_plan).forEach(([dayKey, meals]) => {
            const index = parseInt(dayKey.replace('day', '')) - 1;
            if (index >= 0 && index < 7) {
              filledActual[index] = { ...meals, submitted: true }; // Mark as submitted
            }
          });
          setActualDiet(filledActual);
        }
      } catch (err) {
        console.error('Error fetching meal plan:', err);
      }
    };

    fetchUser();
  }, [user.email]);

  const handleActualChange = (index, field, value) => {
    const regex = /^[A-Za-z\s]*$/;  // Regex to allow only letters and spaces
    if (regex.test(value) || value === '') {
      const updated = [...actualDiet];
      updated[index][field] = value;
      updated[index].error = ''; // Clear error if input is valid
      setActualDiet(updated);
    } else {
      const updated = [...actualDiet];
      updated[index].error = 'Only letters and spaces are allowed!';
      setActualDiet(updated);
    }
  };

  const handleSubmitActual = async (index) => {
    const dayKey = `day${index + 1}`;
    const entry = actualDiet[index];

    try {
      const updatedDiet = [...actualDiet];
      updatedDiet[index].submitted = true;
      setActualDiet(updatedDiet);

      await axios.put(`/api/auth/meal-plan/${user.email}/actual/${dayKey}`, entry);
      alert(`Actual meal for ${dayKey} saved successfully!`);
    } catch (error) {
      console.error('Error saving actual diet:', error);
      alert('Failed to save actual meal.');
    }
  };

  const renderMealCard = (day, meals, index) => (
    <Grid item xs={12} key={day}>
      <Card sx={{ marginBottom: 2, backgroundColor: '#fdfdfd', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {`Day ${index + 1}`}
          </Typography>
          <Typography><strong>Breakfast:</strong> {meals.breakfast} - {meals.breakfast_cal} cal</Typography>
          <Typography><strong>Lunch:</strong> {meals.lunch} - {meals.lunch_cal} cal</Typography>
          <Typography><strong>Dinner:</strong> {meals.dinner} - {meals.dinner_cal} cal</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderActualInput = (dayIndex) => (
    <Grid item xs={12} key={dayIndex}>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {`Day ${dayIndex + 1}`}
          </Typography>
          <TextField
            fullWidth
            label="Breakfast"
            variant="outlined"
            margin="normal"
            value={actualDiet[dayIndex].breakfast}
            onChange={(e) => handleActualChange(dayIndex, 'breakfast', e.target.value)}
            disabled={actualDiet[dayIndex].submitted} // Disable if already submitted
            error={Boolean(actualDiet[dayIndex].error)} // Display error if input is invalid
            helperText={actualDiet[dayIndex].error}
          />
          <TextField
            fullWidth
            label="Lunch"
            variant="outlined"
            margin="normal"
            value={actualDiet[dayIndex].lunch}
            onChange={(e) => handleActualChange(dayIndex, 'lunch', e.target.value)}
            disabled={actualDiet[dayIndex].submitted} // Disable if already submitted
            error={Boolean(actualDiet[dayIndex].error)} // Display error if input is invalid
            helperText={actualDiet[dayIndex].error}
          />
          <TextField
            fullWidth
            label="Dinner"
            variant="outlined"
            margin="normal"
            value={actualDiet[dayIndex].dinner}
            onChange={(e) => handleActualChange(dayIndex, 'dinner', e.target.value)}
            disabled={actualDiet[dayIndex].submitted} // Disable if already submitted
            error={Boolean(actualDiet[dayIndex].error)} // Display error if input is invalid
            helperText={actualDiet[dayIndex].error}
          />
          <Box textAlign="right" mt={2}>
            <button
              className={`px-4 py-2 font-semibold rounded transition ${
                actualDiet[dayIndex].submitted
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-yellow-400 text-black hover:bg-yellow-300'
              }`}
              onClick={() => handleSubmitActual(dayIndex)}
              disabled={actualDiet[dayIndex].submitted || Boolean(actualDiet[dayIndex].error)} // Disable if submitted or error exists
            >
              Submit
            </button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <div className="relative min-h-screen container mx-auto px-6">
      <Navbar />
      <div
        className="bg-cover bg-center min-h-screen w-full pt-6"
        style={{ backgroundImage: `url(${dietImage})` }}
      >
        <Box container mx-auto px-6
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 4,
            gap: 4,
            flexWrap: 'wrap'
          }}
        >
          {/* Meal Plan Section */}
          <Paper
            elevation={4}
            sx={{
              flex: 1,
              minWidth: 300,
              maxWidth: 600,
              p: 3,
              height: 750,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Your 7-Day Meal Plan
            </Typography>
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              <Grid container spacing={2}>
                {mealPlan && mealPlan.plan ? (
                  Object.entries(mealPlan.plan).map(([day, meals], index) =>
                    renderMealCard(day, meals, index)
                  )
                ) : (
                  <Typography>Loading...</Typography>
                )}
              </Grid>
            </Box>
          </Paper>

          {/* Actual Diet Section */}
          <Paper
            elevation={4}
            sx={{
              flex: 1,
              minWidth: 300,
              maxWidth: 600,
              p: 3,
              height: 750,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Actual Diet
            </Typography>
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              <Grid container spacing={2}>
                {actualDiet.map((_, index) => renderActualInput(index))}
              </Grid>
            </Box>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default Status;
