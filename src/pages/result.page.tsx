import { pollGenerationStatus } from '@/stores/generation.api';
import { useGenerationStore } from '@/stores/generation.store';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { generations } = useGenerationStore();
  const [count, setCount] = useState(0);

  const currentGeneration = generations.find((gen) => gen.id === id);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      setCount((prev) => prev + 1);
      await pollGenerationStatus();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const clickRedo = () => {
    navigate(-1);
  };

  const clickDownload = () => {
    if (currentGeneration?.status === 'Completed' && currentGeneration.result) {
      window.location.href = currentGeneration.result;
    }
  };

  return (
    <div className='max-w-[500px] w-svw min-h-svh flex flex-col p-5 justify-around mx-auto'>
      <div className='flex flex-col gap-5'>
        {currentGeneration?.result && (
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
        )}
      </div>
    </div>
  );
};
