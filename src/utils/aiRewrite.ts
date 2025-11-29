// utils/aiRewrite.ts
import axios from "axios";

export async function rewriteWithAI(
  text: string,
  context: string = "general"
): Promise<string> {
  if (!text || !text.trim()) throw new Error("No text provided to rewrite");

  try {
    const res = await axios.post("/api/rewrite", { text, context });

    if (!res.data?.rewritten) {
      throw new Error("No rewritten text returned from server");
    }

    return res.data.rewritten;

  } catch (err: any) {
    console.error("❌ Rewrite request failed:", err.message || err);
    throw new Error(err.response?.data?.error || err.message || "Failed to rewrite text");
  }
}
