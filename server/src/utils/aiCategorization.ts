import fetch from "node-fetch";

export async function categorizeResource(title: string, description = "") {
  const prompt = `You are a helpful classifier. Given the resource title and description, return JSON with fields:
  { "category": "<one short category>", "tags": ["tag1","tag2"] }
  Category should be one of: "Web Development","Design","Data Science","AI/ML","Business","Productivity","Career","Mathematics","Other".
  Title: ${title}
  Description: ${description}
  Respond with ONLY valid JSON.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    })
  });

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? "";
  try {
    const parsed = JSON.parse(content);
    return {
      category: parsed.category ?? "Other",
      tags: Array.isArray(parsed.tags) ? parsed.tags.map(String) : []
    };
  } catch (e) {
    // Fallback: return "Other"
    return { category: "Other", tags: [] };
  }
}
