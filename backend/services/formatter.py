from typing import List, Dict


def get_reason(feature, value, impact):

    if feature == "OverTime":
        if value == "Yes":
            return "The employee works overtime, which is associated with higher burnout and attrition risk."
        return "The employee does not work overtime, reducing burnout risk."

    elif feature == "MonthlyIncome":
        if impact.startswith("Decrease"):
            return f"The employee earns {value} per month, which contributes positively to retention."
        return f"The employee earns {value} per month, which may increase attrition risk if compensation is not competitive."

    elif feature == "StockOptionLevel":
        if impact.startswith("Decrease"):
            return f"The employee has Stock Option Level {value}, encouraging long-term commitment."
        return f"The employee has Stock Option Level {value}, which provides limited long-term retention benefits."

    elif feature == "MaritalStatus":
        return f"The employee's marital status is {value}. This factor showed some influence in the historical training data."

    elif feature == "JobLevel":
        if impact.startswith("Decrease"):
            return f"The employee is at Job Level {value}, indicating greater organizational commitment."
        return f"The employee is at Job Level {value}, which may be associated with higher turnover."

    elif feature == "YearsAtCompany":
        if impact.startswith("Decrease"):
            return f"The employee has worked for {value} years, reflecting stronger organizational loyalty."
        return f"The employee has worked for {value} years, indicating relatively shorter tenure."

    elif feature == "BusinessTravel":
        return f"Business travel frequency is {value}, which can influence work-life balance."

    elif feature == "DistanceFromHome":
        return f"The employee lives {value} units from work. Longer commuting distances may increase dissatisfaction."

    elif feature == "EnvironmentSatisfaction":
        return "Workplace environment satisfaction plays an important role in employee retention."

    elif feature == "JobSatisfaction":
        return "Employees with higher job satisfaction are generally less likely to leave."

    elif feature == "WorkLifeBalance":
        return "Healthy work-life balance contributes positively to employee retention."

    elif feature == "YearsSinceLastPromotion":
        return "Long periods without promotion may increase resignation risk."

    elif feature == "TrainingTimesLastYear":
        return "Regular training opportunities improve employee engagement."

    return "This feature contributed to the model's prediction."


def get_recommendation(feature: str, value) -> str:

    if feature == "OverTime" and value == "Yes":
        return "Review workload and reduce overtime where possible."

    elif feature == "MonthlyIncome":
        return "Continue offering competitive compensation."

    elif feature == "StockOptionLevel":
        return "Maintain or expand long-term incentive programs."

    elif feature == "JobSatisfaction":
        return "Conduct employee feedback sessions to improve engagement."

    elif feature == "EnvironmentSatisfaction":
        return "Improve the workplace environment and employee experience."

    elif feature == "YearsSinceLastPromotion":
        return "Review promotion and career development opportunities."

    elif feature == "JobLevel":
        return "Continue providing career growth opportunities."

    elif feature == "MaritalStatus":
        return "No HR intervention is recommended based on this factor alone."

    return "Continue monitoring employee engagement."


def build_summary(prediction, probability, shap_output):

    probability_percent = round(probability * 100, 1)

    risk_features = [
        x["feature"]
        for x in shap_output
        if x["impact"] == "Increases Attrition Risk"
    ]

    retention_features = [
        x["feature"]
        for x in shap_output
        if x["impact"] == "Decreases Attrition Risk"
    ]

    risk_names = {
        "OverTime": "overtime",
        "MonthlyIncome": "competitive compensation",
        "StockOptionLevel": "stock options",
        "JobLevel": "job level",
        "MaritalStatus": "marital status",
        "YearsAtCompany": "employee tenure"
    }

    risk_text = ", ".join(
        risk_names.get(f, f)
        for f in risk_features[:2]
    )

    retention_text = ", ".join(
        risk_names.get(f, f)
        for f in retention_features[:2]
    )

    if prediction == "High Risk":
        return (
            f"The employee is classified as High Risk with a {probability_percent}% "
            f"probability of attrition. The primary risk drivers are "
            f"{risk_text}. Immediate HR intervention is recommended."
        )

    return (
        f"The employee is classified as Low Risk with a {probability_percent}% "
        f"probability of attrition. While {risk_text} contribute to attrition risk, "
        f"{retention_text} help improve employee retention."
    )


def get_priority(probability):

    probability *= 100

    if probability >= 70:
        return "Immediate Action"

    elif probability >= 50:
        return "High"

    elif probability >= 30:
        return "Monitor"

    return "Low"


def format_shap_output(
    prediction: str,
    probability: float,
    shap_output: List[Dict],
    employee_data: Dict
):

    formatted = []

    total_importance = sum(
        abs(item["shap_value"])
        for item in shap_output
    )

    for factor in shap_output:

        feature = factor["feature"]

        value = employee_data.get(feature)

        importance = round(
            abs(factor["shap_value"]) / total_importance * 100,
            1
        )

        formatted.append(
            {
                "feature": feature,
                "value": value,
                "importance": f"{importance}%",
                "impact": factor["impact"],
                "shap_value": round(factor["shap_value"], 4),
                "reason": get_reason(
                    feature,
                    value,
                    factor["impact"]
                ),
                "recommendation": get_recommendation(
                    feature,
                    value
                )
            }
        )

    return {
        "Prediction": prediction,
        "Probability": probability,
        "RiskScore": round(probability * 100, 1),
        "Priority": get_priority(probability),
        "Summary": build_summary(
            prediction,
            probability,
            shap_output
        ),
        "TopFactors": formatted
    }