from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.predict import router as predict_router

app = FastAPI(
    title="TalentGuard AI",
    description="Employee Attrition Prediction API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
allow_origins=[
    "https://talentguard-frontend.onrender.com",
],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)

@app.get("/")
def home():
    return {
        "status": "running",
        "message": "TalentGuard AI Backend is Running 🚀"
    }