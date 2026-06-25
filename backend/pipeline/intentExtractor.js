const Groq = require("groq-sdk");

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY,
});

async function extractIntent(prompt) {
const response = await groq.chat.completions.create({
model: "llama-3.3-70b-versatile",
temperature: 0,
messages: [
{
role: "system",
content: `
You are an Intent Extraction Engine.

IMPORTANT:
Return ONLY raw JSON.

Do NOT return:

* markdown
* code blocks
* json

Output format:

{
"appType": "",
"features": [],
"roles": []
}
`
},
{
role: "user",
content: prompt
}
]
});

const content = response.choices[0].message.content;

console.log("RAW RESPONSE:");
console.log(content);

const cleanContent = content
.replace(/`json/gi, "")
    .replace(/`/g, "")
.trim();

try {
return JSON.parse(cleanContent);
} catch (error) {
console.error("JSON Parse Error:", error);
console.error("Content:", cleanContent);


throw new Error("Invalid JSON returned by model");


}
}

module.exports = extractIntent;
