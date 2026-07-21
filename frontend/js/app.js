// ===============================
// TalentGuard AI Frontend
// ===============================

const API_URL = "http://127.0.0.1:8000/predict";

const form = document.getElementById("predictionForm");
const resultDiv = document.getElementById("result");
const predictBtn = document.getElementById("predictBtn");

// ===============================
// Submit Form
// ===============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    // ===============================
    // Form Validation
    // ===============================

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // ===============================
    // Loading State
    // ===============================

    predictBtn.disabled = true;
    predictBtn.innerHTML = "Predicting...";

    resultDiv.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Analyzing Employee...</p>
        </div>
    `;

    // ===============================
    // Employee Object
    // ===============================

    const employee = {

        // ==================================
        // User Inputs (Visible Fields)
        // ==================================

        Age: Number(document.getElementById("Age").value),

        Gender: document.getElementById("Gender").value,

        MaritalStatus: document.getElementById("MaritalStatus").value,

        Department: document.getElementById("Department").value,

        JobRole: document.getElementById("JobRole").value,

        BusinessTravel: document.getElementById("BusinessTravel").value,

        OverTime: document.getElementById("OverTime").value,

        MonthlyIncome: Number(
            document.getElementById("MonthlyIncome").value
        ),

        StockOptionLevel: Number(
            document.getElementById("StockOptionLevel").value
        ),

        EnvironmentSatisfaction: Number(
            document.getElementById("EnvironmentSatisfaction").value
        ),

        JobSatisfaction: Number(
            document.getElementById("JobSatisfaction").value
        ),

        WorkLifeBalance: Number(
            document.getElementById("WorkLifeBalance").value
        ),

        TotalWorkingYears: Number(
            document.getElementById("TotalWorkingYears").value
        ),

        YearsAtCompany: Number(
            document.getElementById("YearsAtCompany").value
        ),

        YearsWithCurrManager: Number(
            document.getElementById("YearsWithCurrManager").value
        ),

       // ==================================
            // Hidden Default Values
            // (Computed from X_train.csv)
            // ==================================

            Education: 3,

            EducationField: "Life Sciences",

            DailyRate: 800,          // Median = 799.5

            HourlyRate: 66,

            MonthlyRate: 14373,

            DistanceFromHome: 7,

            JobLevel: 2,

            JobInvolvement: 3,

            PercentSalaryHike: 14,

            PerformanceRating: 3,

            RelationshipSatisfaction: 4,

            TrainingTimesLastYear: 3,

            YearsInCurrentRole: 3,

            YearsSinceLastPromotion: 1,

            NumCompaniesWorked: 2
    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

        if (!response.ok) {
            throw new Error("Prediction failed.");
        }

        const data = await response.json();

        predictBtn.disabled = false;
        predictBtn.innerHTML = "Predict Employee";

        // ===============================
        // Prediction Color
        // ===============================

        let predictionClass = "monitor";

        if (data.Prediction.toLowerCase().includes("high")) {
            predictionClass = "high-risk";
        }

        if (data.Prediction.toLowerCase().includes("low")) {
            predictionClass = "low-risk";
        }

        // ===============================
        // Priority Badge
        // ===============================

        let priorityClass = "monitor";

        if (data.Priority.toLowerCase().includes("high")) {
            priorityClass = "high";
        }

        if (data.Priority.toLowerCase().includes("low")) {
            priorityClass = "low";
        }
        // ===============================
        // SHAP Cards
        // ===============================

        let factorsHTML = "";

        if (data.TopFactors && data.TopFactors.length > 0) {

            data.TopFactors.forEach((factor) => {

                let impactClass = "risk-up";

                if (
                    factor.impact &&
                    factor.impact.toLowerCase().includes("decrease")
                ) {

                    impactClass = "risk-down";

                }

                factorsHTML += `

                    <div class="factor-card">

                        <h4>

                            ${factor.feature}

                        </h4>

                        <p>

                            <strong>Importance:</strong>

                            ${factor.importance}

                        </p>

                        <p>

                            <strong>Impact:</strong>

                            <span class="${impactClass}">

                                ${factor.impact}

                            </span>

                        </p>

                        <p>

                            <strong>Reason:</strong>

                            <br>

                            ${factor.reason}

                        </p>

                        <p>

                            <strong>Recommendation:</strong>

                            <br>

                            ${factor.recommendation}

                        </p>

                    </div>

                `;

            });

        }

        // ===============================
        // Result UI
        // ===============================

        resultDiv.innerHTML = `

            <div class="result-box">

                <h3 class="${predictionClass}">

                    ${data.Prediction}

                </h3>

                <p>

                    <strong>Probability :</strong>

                    ${(data.Probability * 100).toFixed(2)}%

                </p>

                <p>

                    <strong>Risk Score :</strong>

                    ${data.RiskScore}

                </p>

                <p>

                    <strong>Priority :</strong>

                    <span class="priority ${priorityClass}">

                        ${data.Priority}

                    </span>

                </p>

                <hr>

                <p>

                    ${data.Summary}

                </p>

                <hr>

                <h3>

                    Top Risk Factors

                </h3>

                ${factorsHTML}

            </div>

        `;


            }

    // ===============================
    // Error Handling
    // ===============================

    catch (error) {

        predictBtn.disabled = false;
        predictBtn.innerHTML = "Predict Employee";

        resultDiv.innerHTML = `

            <div class="result-box">

                <h3 class="high-risk">

                    Prediction Failed

                </h3>

                <p>

                    ${error.message}

                </p>

            </div>

        `;

        console.error(error);

    }

});