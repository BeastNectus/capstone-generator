import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", 
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

IMPORTANT: Respond ONLY with valid JSON. Do not include any markdown, explanations, or code blocks.

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

    // Try multiple models in order of preference
    const models = [
      "google/gemini-flash-1.5",
      "meta-llama/llama-3.1-8b-instruct:free",
      "openai/gpt-3.5-turbo",
      "anthropic/claude-3-haiku:beta"
    ];

    let response;
    let lastError;

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);
        response = await openai.chat.completions.create({
          model: model,
          messages: [
            { role: "system", content: "You are an assistant that generates structured project ideas. Always respond with valid JSON only, no markdown or explanations." },
            { role: "user", content: prompt },
          ],
          max_tokens: 500,
        });
        console.log(`Successfully used model: ${model}`);
        break;
      } catch (error) {
        console.log(`Model ${model} failed:`, error.message);
        lastError = error;
        continue;
      }
    }

    if (!response) {
      throw lastError || new Error("All models failed");
    }

    // Clean response to remove code blocks or invalid JSON formatting
    let projectIdea = response.choices[0].message.content;
    
    // Remove common markdown code block patterns
    projectIdea = projectIdea.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    
    // Remove any leading/trailing text that's not part of the JSON
    const jsonStart = projectIdea.indexOf('{');
    const jsonEnd = projectIdea.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      projectIdea = projectIdea.substring(jsonStart, jsonEnd + 1);
    }

    // Check if JSON is valid before returning
    let parsedProject;
    try {
      parsedProject = JSON.parse(projectIdea); // Validate JSON
    } catch (error) {
      console.error("Invalid JSON received:", projectIdea);
      throw new Error("OpenAI returned invalid JSON.");
    }

    return new Response(JSON.stringify({ projectIdea }), { status: 200 });
  } catch (error) {
    console.error("Error generating project idea:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type
    });
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate project idea",
        details: error.message 
      }),
      { status: 500 }
    );
  }
}
