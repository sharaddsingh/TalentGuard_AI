import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "attrition_pipeline.pkl"

model = joblib.load(MODEL_PATH)

def predict(employee_data):
    probability = model.predict_proba(employee_data)[0][1]

    prediction = "High Risk" if probability >= 0.35 else "Low Risk"

    return {
        "Prediction": prediction,
        "Probability": round(float(probability), 4)
    }