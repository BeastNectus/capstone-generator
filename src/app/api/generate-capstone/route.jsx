import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { industry, projectType, difficulty } = await req.json();

  if (!industry || !projectType || !difficulty) {
    return new Response(
      JSON.stringify({ error: "All filters are required" }),
      { status: 400 }
    );
  }

  try {
    const prompt = `
You are an assistant that generates structured capstone project ideas in JSON format. 
Generate a capstone project idea for the ${industry} industry. 
Project type: ${projectType}, Difficulty level: ${difficulty}.

Respond strictly in the following JSON format:
{
  "title": "A concise project title",
  "description": "A one-sentence project description.",
  "languages": ["Programming Language 1", "Programming Language 2"],
  "teamRoles": ["Role 1", "Role 2", "Role 3"],
  "similarProjects": [
    {"name": "Project Name 1", "link": "https://example.com/project1"},
    {"name": "Project Name 2", "link": "https://example.com/project2"}
  ],
  "timeline": "A total of timeline in months or weeks"
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an assistant that generates structured project ideas." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    // Clean response to remove code blocks or invalid JSON formatting
    let projectIdea = response.choices[0].message.content;
    projectIdea = projectIdea.replace(/```json|```/g, "").trim();

    // Check if JSON is valid before returning
    try {
      JSON.parse(projectIdea); // Validate JSON
    } catch (error) {
      throw new Error("OpenAI returned invalid JSON.");
    }

    return new Response(JSON.stringify({ projectIdea }), { status: 200 });
  } catch (error) {
    console.error("Error generating project idea:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate project idea" }),
      { status: 500 }
    );
  }
}
