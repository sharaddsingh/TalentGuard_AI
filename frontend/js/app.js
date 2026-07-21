// ============================================
// TalentGuard AI
// Frontend Logic
// ============================================

const API_URL = "http://127.0.0.1:8000/predict";

const form = document.getElementById("predictionForm");
const resultDiv = document.getElementById("result");
const predictBtn = document.getElementById("predictBtn");

// ============================================
// Submit Form
// ============================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    predictBtn.disabled = true;
    predictBtn.textContent = "Analyzing...";

    resultDiv.innerHTML = `
        <div class="placeholder">
            <div class="placeholder-icon">🤖</div>
            <h3>Analyzing Employee</h3>
            <p>Please wait while TalentGuard AI predicts the attrition risk.</p>
        </div>
    `;

    // ============================================
    // Employee Payload
    // ============================================

    const employee = {

        // Visible Fields

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

        // Hidden Default Values

        Education: 3,

        EducationField: "Life Sciences",

        DailyRate: 800,

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
        predictBtn.textContent = "Predict Employee";
                // ============================================
        // Safe Data
        // ============================================

        const prediction = data.Prediction ?? "Unknown";

        const probability = Number(data.Probability ?? 0);

        const riskScore = Number(data.RiskScore ?? probability * 100);

        const summary = data.Summary ?? "No summary available.";

        const topFactors = Array.isArray(data.TopFactors)
            ? data.TopFactors
            : [];

        // ============================================
        // Prediction Badge
        // ============================================

        let predictionClass = "low-risk";

        if (prediction.toLowerCase().includes("high")) {

            predictionClass = "high-risk";

        }

        // ============================================
        // Priority (Frontend Logic)
        // ============================================

        let priority = "";
        let priorityClass = "";

        if (probability < 0.35) {

            priority = "Low";
            priorityClass = "low";

        }

        else if (probability < 0.60) {

            priority = "Medium";
            priorityClass = "medium";

        }

        else {

            priority = "High";
            priorityClass = "high";

        }

        // ============================================
        // Display Values
        // ============================================

        const probabilityPercent = (probability * 100).toFixed(1);

        // ============================================
        // SHAP Cards
        // ============================================

        let factorsHTML = "";

        if (topFactors.length > 0) {

            topFactors.forEach((factor) => {

                let impactColor = "#16a34a";

                if (
                    factor.impact &&
                    factor.impact.toLowerCase().includes("increase")
                ) {

                    impactColor = "#dc2626";

                }

                factorsHTML += `

                <div class="factor-card">

                    <div class="factor-header">

                        <h4>${factor.feature}</h4>

                        <span class="factor-score">

                            ${factor.importance}

                        </span>

                    </div>

                    <p>

                        <strong>Impact:</strong>

                        <span style="color:${impactColor};font-weight:600;">

                            ${factor.impact}

                        </span>

                    </p>

                    <p>

                        ${factor.reason}

                    </p>

                    <div class="recommendation">

                        💡 ${factor.recommendation}

                    </div>

                </div>

                `;

            });

        }

        else {

            factorsHTML = `

                <div class="summary-card">

                    <h3>No Risk Factors Available</h3>

                    <p>

                        SHAP explanation is not available for this prediction.

                    </p>

                </div>

            `;

        }

        // ============================================
        // Result UI
        // ============================================

        resultDiv.innerHTML = `
        <div class="result-content">
        <div class="summary-card">

    <h3>

        Attrition Probability

    </h3>

    <div class="progress-wrapper">

        <div class="progress-bar">

            <div
                class="progress-fill"
                style="width:${probabilityPercent}%">

            </div>

        </div>

        <p style="margin-top:10px;font-weight:600;">

            ${probabilityPercent}%

        </p>

    </div>

    <div
        style="
        display:flex;
        justify-content:space-between;
        margin-top:22px;
        gap:20px;
        ">

        <div>

            <small
                style="color:#6b7280;">

                Prediction

            </small>

            <h3
                class="${predictionClass}"
                style="margin-top:5px;">

                ${prediction}

            </h3>

        </div>

        <div>

            <small
                style="color:#6b7280;">

                HR Priority

            </small>

            <h3
                class="${priorityClass}"
                style="margin-top:5px;">

                ${priority}

            </h3>

        </div>

    </div>

</div>

    <!-- SUMMARY -->

    <div class="summary-card">

        <h3>

            AI Summary

        </h3>

        <p>

            ${summary}

        </p>

    </div>

    <!-- SHAP -->

    <h3>

        Top Risk Factors

    </h3>

    <div class="factors">

        ${factorsHTML}

    </div>

</div>

`;

    }

    // ============================================
    // Error Handling
    // ============================================

    catch (error) {

        console.error(error);

        predictBtn.disabled = false;

        predictBtn.textContent = "Predict Employee";

        resultDiv.innerHTML = `

        <div class="summary-card">

            <h3>

                Prediction Failed

            </h3>

            <p>

                ${error.message}

            </p>

        </div>

        `;

    }

});

// ============================================
// Helper Functions
// ============================================

function formatPercentage(value){

    return `${Number(value).toFixed(1)}%`;

}

function capitalize(text){

    if(!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);

}