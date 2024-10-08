import { getStatus } from '@/api/status.api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<string>('pending');
  const [url, setUrl] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const pollStatus = async () => {
      setCount((count) => count + 1);
      if (id) {
        try {
          const response = await getStatus(id);
          setStatus(response.data.status);

          if (response.data.status !== 'InProgress' && response.data.status !== 'InQueue') {
            setUrl(response.data.url);
            clearInterval(intervalId); // Stop polling once URL is received
          }
        } catch (error) {
          console.error('Error fetching status:', error);
        }
      }
    };

    // Polling interval
    pollStatus();
    const intervalId = setInterval(pollStatus, 5000); // Check every 5 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [id]);

  const clickRedo = () => {
    navigate(-1);
  };

  const clickDownload = () => {
    if (url) {
      window.location.href = url; // Download the file if URL is available
    }
  };

  return (
    <div className='max-w-[500px] w-svw min-h-svh flex flex-col p-5 justify-around mx-auto'>
      <div className='flex flex-col gap-5'>
        {url && <img src={url} alt='' />}
        <div className='text-center'>
          {status === 'InQueue' && (
            <p>In queue, please wait... ({count})</p>
          )}
          {status === 'InProgress' && (
            <p>Processing, please wait... ({count})</p>
          )}
          {status === 'Failed' && (
            <p>Something went wrong!</p>
          )}
        </div>
        {status === 'Completed' && (
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
              disabled={!url} // Disable download button if URL is not ready
            >
              скачать <br /> портрет
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
