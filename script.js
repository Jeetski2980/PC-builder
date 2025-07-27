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
Return data in JSON format like:
{
  "Budget Video Editing Build": {
    "price": "$2000",
    "parts": {
      "CPU": "Intel Core i5...",
      "GPU": "NVIDIA RTX...",
      ...
    }
  },
  ...
}
`;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "⏳ Generating PC builds...";

  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer tgp_v1_X2teqUGKpH2OnSFb5cy5gmgu5Jk9EkTLV-R5sk___do"
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;
    const builds = JSON.parse(text);

    resultsDiv.innerHTML = "";

    Object.entries(builds).forEach(([buildName, buildData]) => {
      const card = document.createElement("div");
      card.className = "result-card";

      const header = document.createElement("h2");
      header.textContent = `${buildName} – ${buildData.price}`;
      card.appendChild(header);

      Object.entries(buildData.parts).forEach(([part, detail]) => {
        const partLine = document.createElement("p");
        const amazonURL = `https://www.amazon.com/s?k=${encodeURIComponent(detail)}`;
        partLine.innerHTML = `<span class="part-title">${part}:</span> ${detail} <a class="buy-link" href="${amazonURL}" target="_blank">Buy</a>`;
        card.appendChild(partLine);
      });

      resultsDiv.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "❌ Error generating builds.";
  }
});
