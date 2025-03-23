// Use ES Modules import instead of require
import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key (should be stored securely)
const apiKey = "AIzaSyBWORHGsDscferBn1a8EcI_RF1QhjzD1lc";
const genAI = new GoogleGenerativeAI(apiKey);

// Initialize the generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 0.7,
  topP: 0.5,
  topK: 10,
  maxOutputTokens: 8192
};

// Function to search movies based on a query
async function searchMovies(query) {
  const chatSession = model.startChat({
    generationConfig,
    history: [{
      role: "user",
      parts: [{ 
        text: `Find movies related to: "${query}". 
        - Return only JSON format, nothing else. 
        - Each movie should have: "movieName", "genre", "releaseYear", and "bio". 
        - If asked for "top" or "trending" movies, provide the latest ones.` 
      }]
    }]
  });

  try {
    const result = await chatSession.sendMessage("Provide a JSON array of movies matching my query.");

    // Extract response text
    const responseText = await result.response.text();

    // Clean and parse JSON response
    const cleanedResponse = responseText
      .replace(/```json/g, "") // Remove markdown JSON blocks
      .replace(/```/g, "")
      .trim();

    const moviesData = JSON.parse(cleanedResponse);
    return moviesData; // Return array of movie objects

  } catch (error) {
    console.error("Error:", error);
    console.log("Returning fallback movie data...");

    // Fallback movie data
    return [
      {
        movieName: "Jawan",
        genre: "Action",
        releaseYear: 2023,
        bio: "A high-octane action thriller starring Shah Rukh Khan, depicting the journey of a soldier with a cause."
      },
      {
        movieName: "Animal",
        genre: "Crime Thriller",
        releaseYear: 2023,
        bio: "A psychological action thriller starring Ranbir Kapoor, exploring a strained father-son relationship amidst a crime syndicate."
      }
    ];
  }
}


// Export the function properly
export { searchMovies };


