🛡️ TalentGuard AI

AI-Powered Employee Attrition Prediction Platform with Explainable AI

TalentGuard AI is an end-to-end Machine Learning application that predicts employee attrition risk and provides explainable AI insights using SHAP. The platform helps HR teams identify employees at risk of leaving and understand the key factors influencing each prediction through an interactive web application.

🌐 Live Demo
🚀 Frontend

https://talentguard-frontend.onrender.com/

⚙️ Backend API

https://talentguard-backend.onrender.com/

📖 API Documentation

https://talentguard-backend.onrender.com/docs

🚀 Features
🔮 Single Employee Attrition Prediction
📊 Attrition Probability Score
🎯 HR Risk Priority Classification
🧠 Explainable AI using SHAP
💡 AI-Generated Prediction Summary
⚡ FastAPI REST API
🎨 Responsive HTML/CSS/JavaScript Dashboard
☁️ Deployed Frontend & Backend on Render
🚧 Planned Features
📁 Batch CSV Prediction
📄 CSV Report Generation
📑 PDF Report Generation
📊 HR Analytics Dashboard
📈 Prediction History
🛠️ Tech Stack
Frontend
HTML5
CSS3
JavaScript
Backend
FastAPI
Uvicorn
Pydantic
Machine Learning
Python
Scikit-learn
XGBoost
Pandas
NumPy
Explainable AI
SHAP
Deployment
Render (Frontend)
Render (Backend)
📂 Project Structure
TalentGuard_AI/

├── backend/
│   ├── app.py
│   ├── routers/
│   ├── services/
│   ├── schemas/
│   ├── utils/
│   └── models/
│       ├── attrition_pipeline.pkl
│       ├── shap_explainer.pkl
│       └── threshold.pkl
│
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── notebooks/
├── data/
├── reports/
├── requirements.txt
└── README.md
📊 Dataset

IBM HR Analytics Employee Attrition Dataset

The dataset contains employee demographic, compensation, job role, and work-related attributes used to predict employee attrition.

⚙️ Machine Learning Pipeline
Data Cleaning
Exploratory Data Analysis (EDA)
Feature Engineering
Data Preprocessing
Model Training
Hyperparameter Tuning
Threshold Optimization
SHAP Explainability
Model Serialization
FastAPI Deployment
🤖 Model

The final deployed model is:

XGBoost Classifier

The model was selected after evaluating multiple machine learning algorithms based on classification performance and explainability.

Models evaluated:

Logistic Regression
Decision Tree
Random Forest
XGBoost
📈 Model Performance
Default Threshold (0.50)
Metric	Score
Accuracy	82.65%
Precision	46.43%
Recall	55.32%
F1 Score	50.49%
ROC-AUC	0.784
Production Threshold (0.35)
Metric	Score
Precision	35.6%
Recall	76.6%
F1 Score	48.6%
Why use a threshold of 0.35?

Employee attrition prediction prioritizes identifying employees who are likely to leave. Lowering the decision threshold from 0.50 to 0.35 improves recall, enabling HR teams to proactively engage with more at-risk employees, even if it increases the number of false positives.

🧠 Explainable AI (SHAP)

TalentGuard AI uses SHAP (SHapley Additive exPlanations) to make predictions transparent and interpretable.

Global Explainability
SHAP Summary Plot
Feature Importance Plot
Local Explainability
Employee-level Explanation
Top Contributing Features
AI-generated Natural Language Summary

Example Response

{
  "prediction": "High Risk",
  "probability": 0.7286,
  "threshold": 0.35,
  "top_factors": [
    "Total Working Years",
    "Years With Current Manager",
    "Years At Company",
    "Monthly Income",
    "Age"
  ]
}
🏗️ System Architecture
                Employee Details
                        │
                        ▼
             HTML • CSS • JavaScript
                  (Frontend UI)
                        │
                  REST API Request
                        │
                        ▼
                  FastAPI Backend
                        │
                        ▼
              XGBoost Prediction Model
                        │
                        ▼
                 SHAP Explainability
                        │
                        ▼
      Probability • Risk Level • AI Summary
⚙️ Installation
git clone https://github.com/sharaddsingh/TalentGuard_AI.git

cd TalentGuard_AI

pip install -r requirements.txt

uvicorn backend.app:app --reload
