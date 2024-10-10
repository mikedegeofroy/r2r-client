import { pollGenerationStatus } from '@/stores/generation.api';
import { IGeneration, useGenerationStore } from '@/stores/generation.store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import spinner from '../assets/spinner.svg';
import { X } from 'lucide-react';
import { generateImage } from '@/api/generate.api';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { generations, removeGeneration } = useGenerationStore(); // Access removeGeneration to handle deletion

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await pollGenerationStatus();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const clickRedo = () => {
    navigate(-1);
  };

  const handleRegenerate = async (generation: IGeneration) => {
    try {
      await generateImage(
        generation.parameters.url,
        generation.parameters.color,
        generation.parameters.backgroundColor,
        generation.parameters.agression,
        generation.parameters.strength
      );

      removeGeneration(generation.id);
    } catch (error) {
      console.error('Error during regeneration:', error);
    }
  };

  return (
    <div className='max-w-[500px] w-svw min-h-svh p-5 mx-auto'>
      <div className='grid grid-cols-2 gap-5'>
        <button
          onClick={clickRedo}
          className='py-1 active:scale-95 text-left text-2xl'
        >
          {'<- назад'}
        </button>
        <div></div>
        {generations.map((x) => {
          return (
            <>
              <div key={`${x.id}_source`} className='relative m-5'>
                {x.status === 'Failed' && (
                  <img
                    onClick={() => handleRegenerate(x)}
                    className='absolute top-[50%] cursor-pointer translate-y-[-50%] -translate-x-[150%]'
                    src={spinner}
                  />
                )}
                <div
                  onClick={() => removeGeneration(x.id)} // Handle deletion
                  className='absolute right-2 cursor-pointer top-2 bg-[#8B0000] rounded-full p-1'
                >
                  <X className='h-3 w-3' />
                </div>
                <img
                  className='aspect-square object-cover'
                  src={x.source}
                  alt=''
                />
              </div>
              <div key={`${x.id}_result`} className='m-5 aspect-square'>
                <div className='bg-[#525252] h-full w-full flex justify-center items-center'>
                  {x.status === 'Completed' ? (
                    <img
                      className='object-cover h-full w-full'
                      src={x.result}
                      alt=''
                    />
                  ) : x.status === 'Failed' ? (
                    <>
                      <p>Error occurred.</p>
                    </>
                  ) : x.status === 'InProgress' ? (
                    <img className='animate-reverse-spin' src={spinner} />
                  ) : (
                    <>In Queue</>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
