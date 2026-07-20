# 🛡️ TalentGuard AI
### AI-Powered Employee Attrition Analytics Platform

TalentGuard AI is an end-to-end machine learning application that predicts employee attrition risk and provides explainable AI insights to help HR teams identify employees who may be at risk of leaving.

The project combines machine learning, explainable AI (SHAP), and a FastAPI-powered backend to deliver both individual employee predictions and batch CSV analysis.

---

## 🚀 Features

- 🔮 Predict employee attrition risk
- 📊 Risk probability score
- 🧠 Explainable AI using SHAP
- 📁 Batch CSV prediction
- 📈 HR analytics dashboard *(Coming Soon)*
- 📄 CSV & PDF report generation *(Coming Soon)*
- 🌐 REST API using FastAPI *(Coming Soon)*
- 🎨 Interactive frontend *(Coming Soon)*

---

## 🛠 Tech Stack

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

Dataset Used:

**IBM HR Analytics Employee Attrition Dataset**

The dataset contains employee demographic, job, compensation, and performance information used to predict attrition.

---

# 🤖 Machine Learning Pipeline

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

# 🧪 Models Evaluated

- Logistic Regression
- Decision Tree
- Random Forest
- XGBoost

Random Forest was selected as the final production model after hyperparameter tuning and threshold optimization.

---

# 📈 Model Performance

| Metric | Score |
|---------|-------|
| Accuracy | 82.65% |
| Precision | 46.43% |
| Recall | 55.32% |
| F1 Score | **50.49%** |
| ROC-AUC | **0.784** |

**Decision Threshold:** `0.35`

---

# 🧠 Explainable AI (SHAP)

The model provides both:

### Global Explainability
- SHAP Summary Plot
- SHAP Feature Importance

### Local Explainability
- Waterfall Plot
- Top Risk Factors
- Employee-level prediction explanation

Example:

```json
{
    "Prediction": "High Risk",
    "Probability": 0.7286,
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

# 🚀 Future Roadmap

- FastAPI Backend
- REST APIs
- Batch CSV Upload
- HR Dashboard
- Employee Analytics
- PDF Report Generation
- Docker Deployment
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

# 📌 Project Status

| Module | Status |
|---------|--------|
| Data Cleaning | ✅ |
| EDA | ✅ |
| Feature Engineering | ✅ |
| Model Training | ✅ |
| Hyperparameter Tuning | ✅ |
| Threshold Optimization | ✅ |
| SHAP Explainability | ✅ |
| FastAPI Backend | 🚧 |
| Frontend | 🚧 |
| Deployment | 🚧 |

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ If you found this project useful, consider giving it a star!
