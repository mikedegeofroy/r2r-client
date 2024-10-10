import { SERVER_API } from '@/lib/constants';
import { useGenerationStore } from '@/stores/generation.store';
import axios from 'axios';

interface GenerateImageResponse {
  id: string;
}

export const generateImage = async (
  url: string,
  color: string,
  backgroundColor: string,
  agression: string,
  strength: string
) => {
  try {
    // Call the API to generate an image
    const response = await axios.post<GenerateImageResponse>(
      `${SERVER_API}/avatar/generate`,
      {
        url,
        color,
        backgroundColor,
        agression,
        strength,
      }
    );

    // After successful API call, add the new generation to the store
    const generationId = response.data.id;

    // Add the generation to the zustand store with initial status "InQueue"
    useGenerationStore.getState().addGeneration({
      id: generationId,
      source: url,
      status: 'InQueue', // or 'InProgress' based on your flow
      parameters: { // Storing the parameters used in the generation process
        url,
        color,
        backgroundColor,
        agression,
        strength,
      },
    });

    return response;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
