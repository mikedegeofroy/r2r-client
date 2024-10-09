import { pollGenerationStatus } from '@/stores/generation.api';
import { useGenerationStore } from '@/stores/generation.store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import spinner from '../assets/spinner.svg';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { generations } = useGenerationStore();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await pollGenerationStatus();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const clickRedo = () => {
    navigate(-1);
  };

  // const clickDownload = () => {
  // if (currentGeneration?.status === 'Completed' && currentGeneration.result) {
  //   window.location.href = currentGeneration.result;
  // }
  // };

  return (
    <div className='max-w-[500px] w-svw min-h-svh p-5 mx-auto'>
      <div className='grid grid-cols-2 gap-10'>
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
              <img className='aspect-square object-cover' src={x.source} alt='' />
              <div className='bg-[#525252] aspect-square h-full w-full flex justify-center items-center'>
                {x.status === 'Completed' ? (
                  <img className='object-cover h-full w-full' src={x.result} alt='' />
                ) : x.status === 'Failed' ? (
                  <>error</>
                ) : (
                  <img className='animate-reverse-spin' src={spinner} />
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
