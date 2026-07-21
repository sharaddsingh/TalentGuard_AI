from fastapi import APIRouter
import pandas as pd

from schemas.employee import Employee
from services.predictor import predict
from services.shap_service import get_shap_explanation
from services.formatter import format_shap_output

router = APIRouter()


@router.post("/predict")
def predict_employee(employee: Employee):

    employee_dict = employee.model_dump()

    employee_df = pd.DataFrame([employee_dict])

    result = predict(employee_df)

    try:

        raw_shap = get_shap_explanation(employee_df)

        result = format_shap_output(
            prediction=result["Prediction"],
            probability=result["Probability"],
            shap_output=raw_shap,
            employee_data=employee_dict
        )

    except Exception as e:

        result["SHAP_ERROR"] = str(e)

    return result