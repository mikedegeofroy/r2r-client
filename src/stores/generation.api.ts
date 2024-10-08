import { getStatus } from '@/api/status.api';
import { useGenerationStore } from './generation.store';

export const pollGenerationStatus = async () => {
  const { generations, updateGenerationStatus, completeGeneration } =
    useGenerationStore.getState();

  // Filter generations that are not yet completed or failed
  const incompleteGenerations = generations.filter(
    (gen) => gen.status === 'InQueue' || gen.status === 'InProgress'
  );

  // Loop through each incomplete generation and check its status
  for (const gen of incompleteGenerations) {
    try {
      const response = await getStatus(gen.id);

      if (response.data.status === 'Completed') {
        // Update the store with the completed status and result
        completeGeneration(gen.id, response.data.url || ''); // Assuming URL is the result
      } else {
        // Otherwise, just update the status
        updateGenerationStatus(gen.id, response.data.status);
      }
    } catch (error) {
      console.error(
        `Error fetching status for generation ID ${gen.id}:`,
        error
      );
    }
  }
};
