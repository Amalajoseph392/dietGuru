const User = require('../model/meal_plan');

const getMealPlanByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const plan = await User.findOne({ email }).sort({ createdAt: -1 });

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Meal plan not found' });
    }

    res.status(200).json({
      success: true,
      mealPlan: plan
    });

  } catch (error) {
    console.error('Error fetching meal plan:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error retrieving meal plan',
      error: error.message
    });
  }
};

const addActualPlan = async (req, res) => {
  const { email, day } = req.params;
  const { breakfast, lunch, dinner, breakfast_grams, lunch_grams, dinner_grams, comment } = req.body;

  try {
    const updatedPlan = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          [`actual_plan.${day}`]: {
            breakfast,
            lunch,
            dinner,
            breakfast_grams,
            lunch_grams,
            dinner_grams,
            comment, // Adding the dietitian's comment
          }
        }
      },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.status(200).json({ message: 'Actual diet updated successfully', mealPlan: updatedPlan });
  } catch (error) {
    console.error('Error updating actual diet:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const editMeal= async (req, res) => {
  const { email } = req.params;
  const { plan, actual_plan } = req.body;

  try {
    const mealPlan = await MealPlan.findOne({ email });
    if (!mealPlan) {
      return res.status(404).json({ success: false, message: 'Meal plan not found.' });
    }

    mealPlan.plan = plan;
    mealPlan.actual_plan = actual_plan;
    await mealPlan.save();

    res.json({ success: true, message: 'Meal plan updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};


module.exports = {
  getMealPlanByEmail,addActualPlan,editMeal
};
