from pydantic import BaseModel
from typing import Literal


class Employee(BaseModel):
    Age: int

    BusinessTravel: Literal[
        "Non-Travel",
        "Travel_Rarely",
        "Travel_Frequently"
    ]

    DailyRate: int

    Department: Literal[
        "Sales",
        "Research & Development",
        "Human Resources"
    ]

    DistanceFromHome: int
    Education: int
    EducationField: str
    EnvironmentSatisfaction: int

    Gender: Literal[
        "Male",
        "Female"
    ]

    HourlyRate: int
    JobInvolvement: int
    JobLevel: int

    JobRole: str

    JobSatisfaction: int

    MaritalStatus: Literal[
        "Single",
        "Married",
        "Divorced"
    ]

    MonthlyIncome: int
    MonthlyRate: int

    NumCompaniesWorked: int

    OverTime: Literal[
        "Yes",
        "No"
    ]

    PercentSalaryHike: int
    PerformanceRating: int
    RelationshipSatisfaction: int
    StockOptionLevel: int
    TotalWorkingYears: int
    TrainingTimesLastYear: int
    WorkLifeBalance: int
    YearsAtCompany: int
    YearsInCurrentRole: int
    YearsSinceLastPromotion: int
    YearsWithCurrManager: int