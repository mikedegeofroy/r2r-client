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
    <div className='w-svw min-h-svh p-5 mx-auto'>
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
              <img src={x.source} alt='' />
              <div className='bg-[#525252] h-full w-full flex justify-center items-center'>
                {x.result ? (
                  <img className='h-full w-full' src={x.result} alt='' />
                ) : (
                  <img className='animate-reverse-spin' src={spinner} />
                )}
              </div>
            </>
          );
        })}
        {/* {currentGeneration?.result && (
          <img src={currentGeneration?.result} alt='' />
        )}
        <div className='text-center'>
          {currentGeneration?.status === 'InQueue' && (
            <p>In queue, please wait... ({count})</p>
          )}
          {currentGeneration?.status === 'InProgress' && (
            <p>Processing, please wait... ({count})</p>
          )}
          {currentGeneration?.status === 'Failed' && (
            <p>Something went wrong!</p>
          )}
        </div>
        {currentGeneration?.status === 'Completed' && (
          <div className='flex gap-5 justify-center'>
            <button
              onClick={clickRedo}
              className='w-[35%] py-1 bg-destructive rounded-lg text-center active:scale-95'
            >
              переделать
            </button>
            <button
              onClick={clickDownload}
              className='w-[35%] py-1 bg-secondary rounded-lg text-center active:scale-95'
              disabled={!currentGeneration?.result} // Disable download button if URL is not ready
            >
              скачать <br /> портрет
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};
