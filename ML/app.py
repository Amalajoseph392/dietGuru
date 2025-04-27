from flask import Flask, request, jsonify
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from datetime import datetime, timedelta

app = Flask(__name__)

# Load dataset
df = pd.read_csv('meal_data_detailed.csv')

# Input columns
input_cols = ['height', 'weight', 'age', 'gender', 'activity', 'diet', 'allergies', 'goal']
X = df[input_cols]

# One-hot encode categorical data
categorical = ['gender', 'activity', 'diet', 'allergies', 'goal']
preprocessor = ColumnTransformer(transformers=[
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical)
], remainder='passthrough')

X_encoded = preprocessor.fit_transform(X)

# Train NearestNeighbors model
knn = NearestNeighbors(n_neighbors=1)
knn.fit(X_encoded)

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json
    input_df = pd.DataFrame([input_data])
    print("Received input:", input_data)

    # Calculate BMI
    height_m = input_data['height'] / 100  # Convert height from cm to meters
    bmi = input_data['weight'] / (height_m ** 2)  # BMI formula

    # Get today's date and calculate end date (7 days from now)
    today = datetime.today()
    end_date = today + timedelta(days=6)  # 7th day, not including today

    # Format the dates as strings (e.g., 'YYYY-MM-DD')
    start_date = today.strftime('%Y-%m-%d')
    end_date = end_date.strftime('%Y-%m-%d')

    # Transform the input data
    input_encoded = preprocessor.transform(input_df)

    # Find nearest neighbor
    distance, index = knn.kneighbors(input_encoded)
    match = df.iloc[index[0][0]]

    # Prepare the output
    output = {
        'bmi': round(bmi, 2),  # Add BMI to the response
        'start_date': start_date,  # Add start date (today)
        'end_date': end_date,  # Add end date (7 days from today)
    }

    # Add meal plan and grams of food for each day (only 7 days starting from today)
    meal_plan = {}
    for i in range(7):  # 7 days, starting from today
        day_date = today + timedelta(days=i)  # Calculate date for each day
        meal_plan[f'day{i+1}'] = {
            'date': day_date.strftime('%Y-%m-%d'),  # Add date for the day
            'breakfast': str(match[f'day{i+1}_bf']),
            'breakfast_cal': int(match[f'day{i+1}_bf_cal']),
            'breakfast_grams': float(match[f'day{i+1}_bf_grams']),  # Add grams for breakfast
            'lunch': str(match[f'day{i+1}_lunch']),
            'lunch_cal': int(match[f'day{i+1}_lunch_cal']),
            'lunch_grams': float(match[f'day{i+1}_lunch_grams']),  # Add grams for lunch
            'dinner': str(match[f'day{i+1}_dinner']),
            'dinner_cal': int(match[f'day{i+1}_dinner_cal']),
            'dinner_grams': float(match[f'day{i+1}_dinner_grams']),  # Add grams for dinner
        }

    # Add the meal plan to the response
    output['meal_plan'] = meal_plan

    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
