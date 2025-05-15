import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
// import { saveChat } from '@/app/tools/chat-store';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});


export async function POST(req) {
  let { messages, userId } = await req.json();
  console.log('Server: Received messages for DeepSeek API:', messages);
  if (messages.length <= 2) {
    messages.push({ role: 'system', content: "You are an expert UI developer. Generate a complete HTML page based on the user's prompt. Return only the HTML code." });
  }

  try {
    // const model = openrouter.chat('meta-llama/llama-3.1-405b-instruct')
    // const model = openrouter.chat('deepseek/deepseek-prover-v2:free')
    const model = openrouter.chat('google/gemini-2.5-pro-preview')
    // const model = deepseek('deepseek-chat'); // This could potentially throw if model init fails

    const { text } = await generateText({
      model: model,
      messages,
    });
    // await saveChat({
    //   userId,
    //   createdAt: new Date(),
    //   message: messages[messages.length - 1],
    //   output: text
    // });
    console.log('text>>>>', text);
    console.log('output messages>>>>', messages);
    return new Response(JSON.stringify({messages: [{
      role: 'assistant',
      content: text
    }]}), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error('Server: Error in POST /api/generate-ai (outer catch block):', e);
    // Return a proper error response to the client
    return new Response(JSON.stringify({ error: 'Failed to initiate request with DeepSeek.', details: e instanceof Error ? e.message : String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}