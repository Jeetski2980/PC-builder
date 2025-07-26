async function askAI() {
  const prompt = document.getElementById('prompt').value;
  const output = document.getElementById('output');

  output.textContent = "Thinking...";

  try {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer tgp_v1_01C6TYEbuIesSa2YC3m6u-gjL9NHdfDbslts88OjE1g", // Use your tgp_ API key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    const result = await response.json();

    if (result.choices && result.choices.length > 0) {
      output.textContent = result.choices[0].message.content.trim();
    } else {
      output.textContent = "Something went wrong. Check your API key or response format.";
      console.error(result);
    }
  } catch (error) {
    output.textContent = "Error talking to Together API.";
    console.error(error);
  }
}
