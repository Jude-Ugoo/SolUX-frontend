import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});


export async function POST(req) {
  const { prompt } = await req.json();
  console.log('Server: Received prompt for DeepSeek API:', prompt);

  try {
    // const model = openrouter.chat('meta-llama/llama-3.1-405b-instruct')
    // const model = openrouter.chat('deepseek/deepseek-prover-v2:free')
    const model = deepseek('deepseek-chat'); // This could potentially throw if model init fails

    const { text } = await generateText({
      model: model,
      system:
      `You are an expert UI developer. Generate a complete HTML page based on the user's prompt. Return only the HTML code.`,
      prompt,
    });
    console.log('text?????', text);
    return new Response(JSON.stringify({ text }));
  } catch (e) {
    console.error('Server: Error in POST /api/deepseek (outer catch block):', e);
    // Return a proper error response to the client
    return new Response(JSON.stringify({ error: 'Failed to initiate request with DeepSeek.', details: e instanceof Error ? e.message : String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}