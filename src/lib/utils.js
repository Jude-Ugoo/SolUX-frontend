import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const readStream = async (
  request,
  setHtml,
  setPrompt,
  setPreviousPrompt,
  setIsLoading,
  setHasAsked,
  prompt,
  contentResponse,
  lastRenderTime,
  onScrollToBottom,
) => {
  let localContentResponse = contentResponse;
  let localLastRenderTime = lastRenderTime;
  const decoder = new TextDecoder("utf-8");
  const reader = request.body.getReader();
  const read = async () => {
    const { done, value } = await reader.read();
    if (done) {
      toast.success("AI responded successfully");
      setPrompt("");
      setPreviousPrompt(prompt);
      setIsLoading(false);
      setHasAsked(true);
      const finalDoc = localContentResponse.match(
        /<!DOCTYPE html>[\s\S]*<\/html>/
      )?.[0];
      if (finalDoc) {
        setHtml(prev => Array.isArray(prev) ? [...prev, finalDoc] : [finalDoc]);
      }
      return;
    }
    const chunk = decoder.decode(value, { stream: true });
    localContentResponse += chunk;
    const newHtml = localContentResponse.match(/<!DOCTYPE html>[\s\S]*/)?.[0];
    if (newHtml) {
      let partialDoc = newHtml;
      if (!partialDoc.includes("</html>")) {
        partialDoc += "\n</html>";
      }
      const now = Date.now();
      if (now - localLastRenderTime > 300) {
        setHtml(partialDoc);
        localLastRenderTime = now;
      }
      if (partialDoc.length > 200) {
        onScrollToBottom();
      }
    }
    read();
  };
  read();
}; 