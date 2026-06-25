const Groq = require("groq-sdk");

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY,
});

async function schemaGenerator(architecture) {
const response = await groq.chat.completions.create({
model: "llama-3.3-70b-versatile",
temperature: 0,
messages: [
{
role: "system",
content: `
You are a Schema Generator.

Return ONLY valid JSON.

Format:

{
"database": {
"tables": []
},
"api": {
"endpoints": []
},
"ui": {
"pages": []
},
"auth": {
"roles": []
}
}
`
},
{
role: "user",
content: JSON.stringify(architecture)
}
]
});

const content = response.choices[0].message.content;

const cleanContent = content
.replace(/`json/gi, "")
    .replace(/`/g, "")
.trim();

return JSON.parse(cleanContent);
}

module.exports = schemaGenerator;
