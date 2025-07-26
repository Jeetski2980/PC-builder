document.getElementById("pc-builder-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const budget = document.getElementById("budget").value;
  const use_case = document.getElementById("use_case").value;
  const region = document.getElementById("region").value;
  const preferences = document.getElementById("preferences").value;
  const extra_info = document.getElementById("extra_info").value;

  const prompt = `
You are a PC building expert. Create 3 PC builds for a user with these requirements:
- Budget: $${budget}
- Use Case: ${use_case}
- Region: ${region}
- Preferences: ${preferences || 'None'}
- Extra Info: ${extra_info || 'None'}

Provide Budget, Balanced, and Performance builds with realistic components and pricing.
Each build needs: CPU, GPU, Motherboard, RAM, SSD, PSU, Case, Cooler.
Include component names, prices, and brief explanations.
`;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "⏳ Generating PC builds...";

  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer tgp_v1_01C6TYEbuIesSa2YC3m6u-gjL9NHdfDbslts88OjE1g",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const reply = data.choices[0].message.content;
      resultsDiv.innerHTML = `<pre>${reply}</pre>`;
    } else {
      resultsDiv.innerHTML = "⚠️ No response from the AI. Please try again.";
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p style="color:red;">❌ Error: ${error.message}</p>`;
    console.error("AI error:", error);
  }
});
