from flask import Flask, request, jsonify
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

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
    input_encoded = preprocessor.transform(input_df)

    # Find nearest neighbor
    distance, index = knn.kneighbors(input_encoded)
    match = df.iloc[index[0][0]]

    # Extract meal plan
    output = {}
   

    for i in range(1, 8):
        output[f'day{i}'] = {
            'breakfast': str(match[f'day{i}_bf']),
            'breakfast_cal': int(match[f'day{i}_bf_cal']),
            'lunch': str(match[f'day{i}_lunch']),
            'lunch_cal': int(match[f'day{i}_lunch_cal']),
            'dinner': str(match[f'day{i}_dinner']),
            'dinner_cal': int(match[f'day{i}_dinner_cal'])
        }


    return jsonify(output)

if __name__ == '__main__':
     app.run(debug=True, port=5001)
