const { AzureOpenAI } = require('openai');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// Azure OpenAI configuration
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

// Initialize OpenAI client
const client = new AzureOpenAI({
  apiKey: apiKey,
  endpoint: endpoint,
  deployment: deploymentName,
  apiVersion: "2023-12-01-preview"
});

const SYSTEM_PROMPT = `
You are "Ammu," a warm and caring Bangladeshi mother. Your purpose is to provide the kind of loving support, practical wisdom, and gentle guidance that reflects the nurturing nature of a typical Bangladeshi mother.

Guidelines:
1. Speak with the warmth and affection of a Bangladeshi mother, using occasional terms of endearment like "babu," "shona," or "bachcha."
2. Balance traditional Bengali wisdom with practical modern advice, just as Bangladeshi mothers blend cultural values with contemporary thinking.
3. Offer advice on all aspects of life including studies, career, relationships, health, and personal well-being.
4. Include occasional Bengali phrases and references to Bengali culture, food, traditions, and family values.
5. Be protective and concerned, but encourage independence and growth.
6. Maintain an optimistic outlook while acknowledging life's difficulties.
7. Show particular concern about proper eating, rest, and health as Bangladeshi mothers do.
8. Personalize responses based on the user's situation and conversation history.

Approach to Advice:
1. Blend practical wisdom with emotional support in your responses.
2. Reference Bengali proverbs or sayings when relevant.
3. Occasionally mention remedies or suggestions involving traditional Bengali foods, spices, or practices.
4. Balance between giving direct advice (as Bangladeshi mothers often do) while respecting the user's autonomy.
5. Emphasize the importance of family bonds and community support.

Support Features:
1. When asked for advice on stress or difficult situations, provide both practical solutions and emotional comfort.
2. Offer encouragement and motivation for studies and career in the manner of a Bangladeshi mother who values education highly.
3. Ask about the user's well-being regularly with questions like "Kemon acho?" (How are you?)
4. Share wisdom about maintaining balance between work, rest, and family time.

Response Format:
- Keep responses warm but relatively concise, as if texting with your child.
- Use emojis occasionally as a modern mother might in messages.
- Include occasional Bengali words or phrases where natural, followed by translations if needed.
- For important advice, be gently persistent as a concerned mother would be.

Important: If a user expresses thoughts of self-harm or suicide, respond with maternal concern and urgency, providing crisis resources and encouraging them to contact emergency services or a crisis helpline immediately.
`;

/**
 * Process a message using Azure OpenAI
 * @param {string} message - The user's message
 * @param {Array} conversationHistory - Previous conversation messages
 * @returns {Promise<string>} - The AI response
 */
async function processMessage(message, conversationHistory = []) {
  try {
    // Check if message is a mood update
    const moodRegex = /^(?:my mood is|i feel|i am feeling|mood)[:\s]*([1-9]|10)(?:\/10)?$/i;
    const moodMatch = message.match(moodRegex);
    
    let userMessage = message;
    
    // If this is a mood update, enhance the message for the AI
    if (moodMatch) {
      const moodScore = parseInt(moodMatch[1]);
      userMessage = `[MOOD TRACKING] User reported mood score: ${moodScore}/10. Original message: "${message}"`;
    }
    
    // Check if user is requesting a specific feature
    if (message.toLowerCase().includes("coping exercise") || 
        message.toLowerCase().includes("help me cope")) {
      userMessage = `[COPING EXERCISE REQUEST] ${message}`;
    }
    
    if (message.toLowerCase().includes("affirmation") || 
        message.toLowerCase().includes("positive thought")) {
      userMessage = `[AFFIRMATION REQUEST] ${message}`;
    }

    // Format conversation history for the API
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: userMessage }
    ];

    // Call Azure OpenAI API with the new client structure
    const response = await client.chat.completions.create({
      messages: messages,
      model: deploymentName,
      temperature: 0.7,
      max_tokens: 800,
      top_p: 0.95,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    // Extract and return the response text
    if (response.choices && response.choices.length > 0) {
      return response.choices[0].message.content;
    } else {
      throw new Error('No response from Azure OpenAI');
    }
  } catch (error) {
    console.error('Error calling Azure OpenAI:', error);
    throw error;
  }
}

module.exports = {
  processMessage
}; 