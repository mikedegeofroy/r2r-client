import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IGenerationStore {
  generations: IGeneration[];
  addGeneration: (generation: IGeneration) => void;
  updateGenerationStatus: (id: string, status: IGeneration['status']) => void;
  completeGeneration: (id: string, result: string) => void;
  clearGenerations: () => void; // New function to clear the store
}

interface IGeneration {
  id: string;
  source: string;
  status: 'Failed' | 'InQueue' | 'InProgress' | 'Completed';
  result?: string;
}

export const useGenerationStore = create<IGenerationStore>()(
  persist(
    (set) => ({
      generations: [],

      // Add a new generation
      addGeneration: (generation: IGeneration) => {
        set((state) => ({
          generations: [...state.generations, generation],
        }));
      },

      // Update the status of a generation by its ID
      updateGenerationStatus: (id: string, status: IGeneration['status']) => {
        set((state) => ({
          generations: state.generations.map((gen) =>
            gen.id === id ? { ...gen, status } : gen
          ),
        }));
      },

      // Complete a generation by its ID and store the result
      completeGeneration: (id: string, result: string) => {
        set((state) => ({
          generations: state.generations.map((gen) =>
            gen.id === id ? { ...gen, status: 'Completed', result } : gen
          ),
        }));
      },

      // Clear all generations
      clearGenerations: () => {
        set(() => ({
          generations: [], // Reset generations to an empty array
        }));
      },
    }),
    {
      name: 'generation-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
