import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle

# Load the dataset
df = pd.read_csv("meal_plan_data.csv")

# Encoding categorical features in the dataset
categorical_columns = ['gender', 'activity_level', 'goal', 'preferences', 'day', 'meal_type', 'meal_name']
label_encoders = {}

for column in categorical_columns:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le

# Save label encoders for later use
with open("label_encoders.pkl", "wb") as f:
    pickle.dump(label_encoders, f)

# Splitting data into features and target
X = df.drop(columns=["meal_name", "ingredients", "calories"])  # Features
y = df["meal_name"]  # Target

# Encode the target variable (meal_name)
target_encoder = LabelEncoder()
y = target_encoder.fit_transform(y)

# Save the target encoder for later decoding
with open("target_encoder.pkl", "wb") as f:
    pickle.dump(target_encoder, f)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the trained model
with open("meal_plan_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model and encoders saved successfully!")
