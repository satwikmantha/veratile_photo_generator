
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error('No image was generated. The response may have been blocked.');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    // Provide a more user-friendly error message
    if (error instanceof Error && error.message.includes('blocked')) {
        throw new Error('Image generation failed because the prompt was blocked for safety reasons. Please try a different prompt.');
    }
    throw new Error('Failed to generate image. Please try again later.');
  }
}
