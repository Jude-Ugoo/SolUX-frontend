import { InferenceClient } from '@huggingface/inference';

const client = new InferenceClient(process.env.HUGGINGFACE_API_TOKEN);
const MODEL_ID = "deepseek-ai/DeepSeek-V3-0324";
// const MODEL_ID = "deepseek-chat";

export async function POST(req) {
  let { prompt, userId, provider, previousPrompt, html, ...rest } = await req.json();

  try {
    const selectedProvider = { id: provider, max_tokens: 2048 }; // Adjust as needed
    const chatCompletion = client.chatCompletionStream({
      model: MODEL_ID,
      provider: selectedProvider.id,
      messages: [
        {
          role: "system",
          content: `ONLY USE HTML, CSS AND JAVASCRIPT. If you want to use ICON make sure to import the library first. Try to create the best UI possible by using only HTML, CSS and JAVASCRIPT. Use as much as you can TailwindCSS for the CSS, if you can't do something with TailwindCSS, then use custom CSS (make sure to import <script src=\"https://cdn.tailwindcss.com\"></script> in the head). Also, try to ellaborate as much as you can, to create something unique. ALWAYS GIVE THE RESPONSE INTO A SINGLE HTML FILE`,
        },
        ...(previousPrompt
          ? [
              {
                role: "user",
                content: previousPrompt,
              },
            ]
          : []),
        ...(html
          ? [
              {
                role: "assistant",
                content: `The current code is: ${html}.`,
              },
            ]
          : []),
        {
          role: "user",
          content: prompt,
        },
      ],
      ...(selectedProvider.id !== "sambanova"
        ? {
            max_tokens: selectedProvider.max_tokens,
          }
        : {}),
    });

    let completeResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await chatCompletion.next();
            if (done) break;
            const chunk = value.choices[0]?.delta?.content;
            if (chunk) {
              let outputChunk = chunk;
              if (selectedProvider.id === "sambanova") {
                if (chunk.includes("</html>")) {
                  outputChunk = chunk.replace(/<\/html>[\s\S]*/, "</html>");
                }
              }
              completeResponse += outputChunk;
              controller.enqueue(new TextEncoder().encode(outputChunk));
              if (outputChunk.includes("</html>")) break;
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });

  } catch (error) {
    console.log('error', error);
    if (error.message.includes("exceeded your monthly included credits")) {
      return new Response(JSON.stringify({
        ok: false,
        openProModal: true,
        message: error.message,
      }), {
        status: 402,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({
      ok: false,
      message: error.message || "An error occurred while processing your request.",
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
