
const API_KEY = "AIzaSyBeTrNIPsfSqispxAzx8eYdgqg7PAjNphI";
const MODEL_NAME = "gemini-2.0-flash";

async function runChat(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    const payload = {
        contents: [
            {
                parts: [
                    { text: prompt }
                ]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Extract the response text from the API response
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        console.log(text);
        return text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Error: " + error.message;
    }
}

export default runChat;
