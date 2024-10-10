import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IGenerationStore {
  generations: IGeneration[];
  sources: string[]; // Global array of sources
  addGeneration: (generation: IGeneration) => void;
  updateGenerationStatus: (id: string, status: IGeneration['status']) => void;
  completeGeneration: (id: string, result: string) => void;
  removeGeneration: (id: string) => void; // Remove a generation by ID
  addSource: (source: string) => void; // Add a global source
  removeSource: (source: string) => void; // Remove a global source
  clearGenerations: () => void; // Clear all generations
}

export interface IGeneration {
  id: string;
  source: string; // Individual generation source
  status: 'Failed' | 'InQueue' | 'InProgress' | 'Completed';
  result?: string;
  parameters: {
    url: string;
    color: string;
    backgroundColor: string;
    agression: string;
    strength: string;
  };
}

export const useGenerationStore = create<IGenerationStore>()(
  persist(
    (set) => ({
      generations: [],
      sources: [], // Initialize the global sources array

      // Add a new generation with parameters
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

      // Remove a generation by its ID
      removeGeneration: (id: string) => {
        set((state) => ({
          generations: state.generations.filter((gen) => gen.id !== id),
        }));
      },

      // Add a global source
      addSource: (source: string) => {
        set((state) => ({
          sources: [...state.sources, source],
        }));
      },

      // Remove a global source
      removeSource: (source: string) => {
        set((state) => ({
          sources: state.sources.filter((s) => s !== source),
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
