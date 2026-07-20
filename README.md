# 🛡️ TalentGuard AI

> **AI-Powered Employee Attrition Analytics Platform with Explainable AI**

TalentGuard AI is an end-to-end Machine Learning application that predicts employee attrition risk and provides explainable AI insights using SHAP. It helps HR teams identify employees who are likely to leave and understand the key factors influencing each prediction.

---

## 🚀 Features

- 🔮 Single Employee Attrition Prediction
- 📁 Batch CSV Prediction
- 📊 Employee Risk Probability
- 🧠 Explainable AI using SHAP
- 📈 Global & Local Feature Importance
- 📄 CSV Report Generation *(Coming Soon)*
- 📑 PDF Report Generation *(Coming Soon)*
- 🌐 REST API with FastAPI *(Coming Soon)*
- 📊 Interactive HR Dashboard *(Coming Soon)*

---

# 🛠️ Tech Stack

### Machine Learning
- Python
- Scikit-learn
- XGBoost
- Pandas
- NumPy

### Explainable AI
- SHAP

### Backend *(Upcoming)*
- FastAPI
- Uvicorn

### Frontend *(Upcoming)*
- HTML
- CSS
- JavaScript
- Chart.js

### Deployment *(Upcoming)*
- Docker
- Nginx
- AWS EC2

---

# 📂 Project Structure

```text
TalentGuard_AI/

├── backend/
├── frontend/
├── data/
│   ├── raw/
│   └── processed/
├── models/
│   ├── attrition_pipeline.pkl
│   └── threshold.pkl
├── notebooks/
│   ├── 01_eda.ipynb
│   ├── 02_Preprocessing.ipynb
│   ├── 03_models.ipynb
│   ├── 04_Hyperparameter_Tuning.ipynb
│   └── 05_SHAP_Explainability.ipynb
├── reports/
├── requirements.txt
└── README.md
```

---

# 📊 Dataset

**IBM HR Analytics Employee Attrition Dataset**

The dataset contains employee demographic, job, compensation and work-related information used to predict whether an employee is at risk of leaving the organization.

---

# ⚙️ Machine Learning Pipeline

- Data Cleaning
- Exploratory Data Analysis (EDA)
- Feature Engineering
- Data Preprocessing
- Model Training
- Hyperparameter Tuning
- Threshold Optimization
- SHAP Explainability
- Model Serialization

---

# 🤖 Models Evaluated

- Logistic Regression
- Decision Tree
- Random Forest
- XGBoost

After hyperparameter tuning and evaluation, **Random Forest** was selected as the final deployment model.

---

# 📈 Model Performance

## Random Forest (Default Threshold = 0.50)

| Metric | Score |
|---------|-------|
| Accuracy | 82.65% |
| Precision | 46.43% |
| Recall | 55.32% |
| F1 Score | **50.49%** |
| ROC-AUC | **0.784** |

---

## 🚀 Deployment Threshold

The application is deployed using a **decision threshold of 0.35** instead of the default **0.50**.

This improves the model's ability to identify employees who are at risk of leaving.

| Metric | Score |
|---------|-------|
| Precision | 35.6% |
| Recall | **76.6%** |
| F1 Score | 48.6% |

> **Why 0.35?**
>
> In employee attrition prediction, missing an employee who is likely to leave is often more costly than incorrectly flagging someone who stays. Therefore, the deployment threshold was lowered from **0.50** to **0.35** to significantly improve recall and help HR identify more at-risk employees.

---

# 🧠 Explainable AI (SHAP)

The project uses SHAP (SHapley Additive exPlanations) to provide transparent and interpretable predictions.

### Global Explainability

- SHAP Summary Plot
- SHAP Feature Importance

### Local Explainability

- Waterfall Plot
- Employee-level Prediction Explanation
- Top Contributing Features

Example Output

```json
{
    "Prediction": "High Risk",
    "Probability": 0.7286,
    "Threshold": 0.35,
    "Top Factors": [
        "Total Working Years",
        "Years With Current Manager",
        "Years At Company",
        "Monthly Income",
        "Age"
    ]
}
```

---

# 📌 Future Roadmap

- FastAPI Backend
- REST APIs
- Batch CSV Prediction
- Interactive Dashboard
- PDF Report Generation
- Docker Support
- AWS EC2 Deployment

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/sharaddsingh/TalentGuard_AI.git
```

Move into the project

```bash
cd TalentGuard_AI
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# 📋 Current Project Status

| Module | Status |
|---------|--------|
| Data Cleaning | ✅ |
| Exploratory Data Analysis | ✅ |
| Feature Engineering | ✅ |
| Model Training | ✅ |
| Hyperparameter Tuning | ✅ |
| Threshold Optimization | ✅ |
| SHAP Explainability | ✅ |
| FastAPI Backend | 🚧 In Progress |
| Frontend | 🚧 Planned |
| Deployment | 🚧 Planned |

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome. Feel free to fork the repository and submit a pull request.

---

# 📜 License

This project is licensed under the MIT License.

---

## ⭐ If you found this project useful, consider giving it a star!
