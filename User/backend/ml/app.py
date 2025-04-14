from flask import Flask, request, jsonify
import joblib
import pickle
import pandas as pd

app = Flask(__name__)

# Load the trained model and encoders
model = joblib.load("meal_plan_model.pkl")
with open("label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)
with open("target_encoder.pkl", "rb") as f:
    target_encoder = pickle.load(f)

# Define the feature columns used during training
FEATURE_COLUMNS = [
    "age", "gender", "weight", "height", "activity_level", 
    "goal", "preferences", "calorie_needs", "day", "meal_type"
]


@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Parse input data
        input_data = request.json
        input_df = pd.DataFrame([input_data])
        input_df = input_df[FEATURE_COLUMNS]

        # Encode categorical features
        for column, le in label_encoders.items():
            if column in input_df:
                input_df[column] = le.transform(input_df[column])

        # Log processed input for debugging
        print(f"Processed Input Data: {input_df}")

        # Make predictions
        prediction = model.predict(input_df)[0]

        # Debugging: Log the prediction before decoding
        print(f"Model Prediction (Encoded): {prediction}")

        # Decode the target variable to get the meal plan name
        predicted_meal = target_encoder.inverse_transform([prediction])[0]

        # Convert the decoded prediction to a Python string to avoid JSON serialization errors
        predicted_meal = str(predicted_meal)

        # Debugging: Log the decoded prediction
        print(f"Decoded Meal Plan: {predicted_meal}")

        # Return the decoded meal plan as the response
        return jsonify({"meal_plan": predicted_meal})

    except Exception as e:
        # Debugging: Log the error message
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
