async function askAI() {
  const prompt = document.getElementById('prompt').value;
  const output = document.getElementById('output');

  const response = await fetch("https://api.together.xyz/inference", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 1dcb0c48c5afc74229cf8eca52f3996550bfd0a4ef978f2103d4cb9d192936d6",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.7
    })
  });

  const result = await response.json();

  try {
    output.textContent = result.output.choices[0].text.trim();
  } catch (e) {
    output.textContent = "Something went wrong. Check API key or response format.";
    console.error(result);
  }
}
