async function analyzeSentiment() {
    const comment = document.getElementById("comment").value;
    const resultDiv = document.getElementById("result");

    if (!comment) {
        alert("Please enter a comment to analyze.");
        return;
    }
    resultDiv.textContent = "Analyzing...";

    const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment })
    });

    const data = await response.json();

    resultDiv.innerHTML = `
    <h3>Result:</h3>
    <p><strong>Sentiment:</strong> ${data.sentiment}</p>
    <p><strong>Confidence:</strong> ${data.confidence}</p>
    <p><strong>Explanation:</strong> ${data.explanation}</p>
  `;


}