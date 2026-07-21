from pathlib import Path

import joblib
import numpy as np
import pandas as pd

# ======================================================
# Load Models
# ======================================================

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"

pipeline = joblib.load(MODEL_DIR / "attrition_pipeline.pkl")

preprocessor = pipeline.named_steps["preprocessor"]
model = pipeline.named_steps["classifier"]

explainer = joblib.load(MODEL_DIR / "shap_explainer.pkl")


# ======================================================
# SHAP Explanation
# ======================================================

def get_shap_explanation(employee_df: pd.DataFrame, top_n: int = 5):

    # Transform input exactly like prediction
    X = preprocessor.transform(employee_df)

    # Compute SHAP values
    shap_values = explainer.shap_values(X)

    # Handle different SHAP versions
    if isinstance(shap_values, list):

        values = shap_values[1][0]

    elif isinstance(shap_values, np.ndarray):

        if shap_values.ndim == 3:
            values = shap_values[0, :, 1]

        elif shap_values.ndim == 2:
            values = shap_values[0]

        else:
            raise ValueError(
                f"Unexpected SHAP shape: {shap_values.shape}"
            )

    else:
        raise ValueError(
            f"Unsupported SHAP output type: {type(shap_values)}"
        )

    feature_names = preprocessor.get_feature_names_out()

    shap_df = pd.DataFrame({
        "feature": feature_names,
        "shap_value": values
    })

    # Remove sklearn prefixes
    shap_df["feature"] = (
        shap_df["feature"]
        .str.replace("num__", "", regex=False)
        .str.replace("cat__", "", regex=False)
    )

    # Merge one-hot encoded categorical features
    categorical_features = {
        "BusinessTravel",
        "Department",
        "EducationField",
        "Gender",
        "JobRole",
        "MaritalStatus",
        "OverTime"
    }

    def merge_feature(name):

        for feature in categorical_features:
            if name.startswith(feature + "_"):
                return feature

        return name

    shap_df["feature"] = shap_df["feature"].apply(merge_feature)

    shap_df = (
        shap_df
        .groupby("feature", as_index=False)["shap_value"]
        .sum()
    )

    shap_df["abs_importance"] = shap_df["shap_value"].abs()

    shap_df = shap_df.sort_values(
        by="abs_importance",
        ascending=False
    )

    explanations = []

    for _, row in shap_df.head(top_n).iterrows():

        shap_value = round(float(row["shap_value"]), 4)

        impact = (
            "Increases Attrition Risk"
            if shap_value > 0
            else "Decreases Attrition Risk"
        )

        explanations.append(
            {
                "feature": row["feature"],
                "shap_value": shap_value,
                "impact": impact
            }
        )

    return explanations