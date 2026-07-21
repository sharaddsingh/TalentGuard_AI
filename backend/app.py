from fastapi import FastAPI
from routers.predict import router as predict_router

app = FastAPI(
    title="TalentGuard AI",
    description="Employee Attrition Prediction API",
    version="1.0.0"
)

app.include_router(predict_router)

@app.get("/")
def home():
    return {
        "status": "running",
        "message": "TalentGuard AI Backend is Running 🚀"
    }