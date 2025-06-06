import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from './navbar';
import dietImage from '../assets/images/diet.jpg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { useNavigate } from 'react-router-dom';

const steps = ['Tell us about yourself', 'Choose your type', 'Are you allergic?'];

export default function HorizontalLinearStepper() {
  // Stepper states
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [errorStep0, setErrorStep0] = React.useState('');
  const [errorStep1, setErrorStep1] = React.useState('');
  const [errorStep2, setErrorStep2] = React.useState('');

  const [error, setError] = React.useState({  });


  // Form data for step 0 (user basics)
  const [userBasics, setUserBasics] = React.useState({
    height: '',
    weight_kg: '',
    age: '',
    gender: 'male',
    exercise: 'none',
  });

  // Form data for step 1 (diet type)
  const [dietType, setDietType] = React.useState('keto');

  // Form data for step 2 (allergies)
  const [allergies, setAllergies] = React.useState({
    gluten: false,
    dairy: false,
    nuts: false,
    soy: false,
    eggs: false,
    shellfish: false,
  });

  const navigate = useNavigate();

  // Helper functions for stepper
  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  const handleNext = () => {
    let newSkipped = skipped;
    let valid = true;
    
    // Step 0 Validation
    if (activeStep === 0) {
      if (!validateStep0()) {
        setErrorStep0('Please fill in all fields with valid data.');
        valid = false;
      } else {
        setErrorStep0('');
      }
    }
  
    // Step 1 Validation
    if (activeStep === 1) {
      if (!validateStep1()) {
        setErrorStep1('Please select a diet type.');
        valid = false;
      } else {
        setErrorStep1('');
      }
    }
  
    // Step 2 Validation
    if (activeStep === 2) {
      if (!validateStep2()) {
        setErrorStep2('Please select at least one allergy.');
        valid = false;
      } else {
        setErrorStep2('');
      }
    }
  
    if (!valid) {
      return; // Don't proceed to next step if validation fails
    }
  
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
  
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };




  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // OnChange handlers for step 0
  const handleBasicsChange = (e) => {
    const { name, value } = e.target;
    setUserBasics((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for step 1 (Diet Type)
  const handleDietChange = (event) => {
    setDietType(event.target.value);
  };

  // Handler for step 2 (Allergies)
  const handleAllergyChange = (event) => {
    setAllergies({
      ...allergies,
      [event.target.name]: event.target.checked,
    });
  };

  // Assemble and submit data to backend on Finish
  const handleFinish = async () => {
    // Get email from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user'));
  
    // Extract height (cm) and weight (kg) from user input
    const heightInMeters = Number(userBasics.height) / 100; // Convert height to meters
    const weightInKg = Number(userBasics.weight_kg); // Weight is already in kg
  
    // Calculate BMI
    const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2); // Round to two decimal places
  
    // Set the goal based on BMI
    let goal = 'maintain';  // Default goal
    if (bmi < 18.5) {
      goal = 'weight_gain';
    } else if (bmi >= 25) {
      goal = 'weight_loss';
    }
  
    // Combine allergies that are selected into an array
    const selectedAllergies = Object.keys(allergies).filter((key) => allergies[key]);
  
    // Mapping exercise level to activity_level directly; you might refine mapping if necessary.
    const submissionData = {
      // Step 0
      height: Number(userBasics.height),
      weight: weightInKg,
      bmi: bmi, // Add BMI to the data
      age: Number(userBasics.age),
      gender: userBasics.gender,
      activity: userBasics.exercise, // corresponds to 'exercise' field
  
      // Step 1
      diet: dietType,
  
      // Step 2
      allergies: selectedAllergies,
  
      // Set the goal based on BMI
      goal: goal,
  
      // Add email from sessionStorage
      email: user.email,
  
      // Optionally include submittedAt (or have backend default it)
      submittedAt: new Date(),
    };
  
    try {
      const response = await fetch('/api/auth/submit-input', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (response.ok) {
        const result = await response.json();
        navigate('/result', { state: { mealPlan: result.mealPlan, input: result.inputData } });
      } else {
        console.error('Submission failed.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  
  
  // Step 0: Validate basic information
const validateStep0 = () => {
  const { height, weight_kg, age } = userBasics;
  if (!height || !weight_kg || !age) {
    return false;
  }
  if (isNaN(height) || isNaN(weight_kg) || isNaN(age)) {
    return false;
  }
  return true;
};

// Step 1: Validate diet type selection
const validateStep1 = () => {
  return dietType !== ''; // Make sure a diet type is selected
};

// Step 2: Validate allergies selection (at least one allergy selected)
const validateStep2 = () => {
  const selectedAllergies = Object.values(allergies).some((value) => value);
  return selectedAllergies; // At least one allergy must be selected
};


  return (
    <section>
      <Navbar />
      <div
        className="container mx-auto px-6 relative h-[530px] bg-cover bg-center w-screen mt-1"
        style={{ backgroundImage: `url(${dietImage})` }}
      >
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center px-4">
          <div className="text-center bg-white rounded-lg shadow-2xl p-6 text-black h-[90%] w-[80%]">
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = <Typography variant="caption"></Typography>;
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }} component="div">
                    All steps completed - you're finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }} component="div">
                    {activeStep === 0 && (
                      <form>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                          {errorStep0 && <span style={{ color: 'red' }}>{errorStep0}</span>}
                          <div className="mb-4">
                              <label className="block text-lg mb-2" htmlFor="height">
                                Height (cm)
                              </label>
                              <input
                                type="number"
                                id="height"
                                name="height"
                                value={userBasics.height}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  handleBasicsChange(e); // Update state
                                  if (value && (value < 50 || value > 300)) {
                                    setError((prev) => ({ ...prev, height: 'Height must be between 50 and 300 cm.' }));
                                  } else {
                                    setError((prev) => ({ ...prev, height: '' })); // Clear error
                                  }
                                }}
                                className={`w-full p-2 border ${
                                  error.height ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg`}
                                placeholder="Enter your height (50-300)"
                                required
                              />
                              {error.height && <span className="text-red-600">{error.height}</span>}
                            </div>


                            <div className="mb-4">
                            <label className="block text-lg mb-2" htmlFor="weight_kg">
                              Weight (kg)
                            </label>
                            <input
                              type="number"
                              id="weight_kg"
                              name="weight_kg"
                              value={userBasics.weight_kg}
                              onChange={(e) => {
                                const value = e.target.value;
                                handleBasicsChange(e); // Update state
                                if (value && (value < 10 || value > 500)) {
                                  setError((prev) => ({ ...prev, weight: 'Weight must be between 10 and 500 kg.' }));
                                } else {
                                  setError((prev) => ({ ...prev, weight: '' })); // Clear error
                                }
                              }}
                              className={`w-full p-2 border ${
                                error.weight ? 'border-red-500' : 'border-gray-300'
                              } rounded-lg`}
                              placeholder="Enter your weight (10-500)"
                              required
                            />
                            {error.weight && <span className="text-red-600">{error.weight}</span>}
                          </div>

                          <div className="mb-4">
                          <label className="block text-lg mb-2" htmlFor="age">
                            Age
                          </label>
                          <input
                            type="number"
                            id="age"
                            name="age"
                            value={userBasics.age}
                            onChange={(e) => {
                              const value = e.target.value;
                              handleBasicsChange(e); // Update state
                              if (value && (value < 1 || value > 120)) {
                                setError((prev) => ({ ...prev, age: 'Age must be between 1 and 120.' }));
                              } else {
                                setError((prev) => ({ ...prev, age: '' })); // Clear error
                              }
                            }}
                            className={`w-full p-2 border ${
                              error.age ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg`}
                            placeholder="Enter your age (1-120)"
                            required
                          />
                          {error.age && <span className="text-red-600">{error.age}</span>}
                        </div>

                          </div>
                          <div>
                            <div className="mb-4">
                              <label className="block text-lg mb-2" htmlFor="gender">
                                Gender
                              </label>
                              <select
                                id="gender"
                                name="gender"
                                value={userBasics.gender}
                                onChange={handleBasicsChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="block text-lg mb-2" htmlFor="exercise">
                                Exercise Level
                              </label>
                              <select
                                id="exercise"
                                name="exercise"
                                value={userBasics.exercise}
                                onChange={handleBasicsChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              >
                                <option value="none">None</option>
                                <option value="light">Light</option>
                                <option value="moderate">Moderate</option>
                                <option value="intense">Intense</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                    {activeStep === 1 && (
                      <div>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            Select your preferred type of diet:
                          </FormLabel>
                          <RadioGroup
                            aria-label="diet-type"
                            name="diet-type"
                            value={dietType}
                            onChange={handleDietChange}
                          >
                            <FormControlLabel value="keto" control={<Radio />} label="Keto" />
                            <FormControlLabel value="vegan" control={<Radio />} label="Vegan" />
                            <FormControlLabel value="paleo" control={<Radio />} label="Paleo" />
                            <FormControlLabel
                              value="mediterranean"
                              control={<Radio />}
                              label="Mediterranean"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    )}
                    {activeStep === 2 && (
                      <div>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            What foods are you allergic to? (Select all that apply)
                          </FormLabel>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={allergies.gluten}
                                  onChange={handleAllergyChange}
                                  name="gluten"
                                />
                              }
                              label="Gluten"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={allergies.dairy}
                                  onChange={handleAllergyChange}
                                  name="dairy"
                                />
                              }
                              label="Dairy"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={allergies.nuts}
                                  onChange={handleAllergyChange}
                                  name="nuts"
                                />
                              }
                              label="Nuts"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={allergies.soy}
                                  onChange={handleAllergyChange}
                                  name="soy"
                                />
                              }
                              label="Soy"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={allergies.eggs}
                                  onChange={handleAllergyChange}
                                  name="eggs"
                                />
                              }
                              label="Eggs"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={allergies.shellfish}
                                  onChange={handleAllergyChange}
                                  name="shellfish"
                                />
                              }
                              label="Shellfish"
                            />
                          </FormGroup>
                        </FormControl>
                      </div>
                    )}
                    <div className="flex justify-between mt-6">
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="contained"
                        color="primary"
                      >
                        Back
                      </Button>
                      {activeStep === steps.length - 1 ? (
                        <Button onClick={handleFinish} variant="contained" color="primary">
                          Finish
                        </Button>
                      ) : (
                        <Button onClick={handleNext} variant="contained" color="primary">
                          Next
                        </Button>
                      )}
                    </div>
                  </Typography>
                </React.Fragment>
              )}
            </Box>
          </div>
        </div>
      </div>
    </section>
  );
}
