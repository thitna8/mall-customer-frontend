const form = document.getElementById("prediction-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const income = document.getElementById("income").value;

  // Check if inputs are valid
  if (gender === "" || age === "" || income === "") {
    alert("Please fill all fields!");
    return;
  }

  try {
    const response = await fetch("https://mall-customer-api-1.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gender: parseInt(gender),
        age: parseInt(age),
        income: parseInt(income)
      })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    document.getElementById("logistic").innerText =
      data.logistic_regression === 1 ? "High Spender" : "Low Spender";

    document.getElementById("tree").innerText =
      data.decision_tree === 1 ? "High Spender" : "Low Spender";

    resultDiv.classList.remove("hidden");

  } catch (error) {
    console.error("Error:", error);
    alert("Prediction failed! Check console for details.");
  }
});

