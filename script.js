const form = document.getElementById("prediction-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const income = document.getElementById("income").value;

 const response = await fetch("https://mall-customer-api.onrender.com/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    gender: parseInt(gender),
    age: parseInt(age),
    income: parseInt(income)
  })
});

  const data = await response.json();

  document.getElementById("logistic").innerText =
    data.logistic_regression === 1 ? "High Spender" : "Low Spender";

  document.getElementById("tree").innerText =
    data.decision_tree === 1 ? "High Spender" : "Low Spender";

  resultDiv.classList.remove("hidden");
});
