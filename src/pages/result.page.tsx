import { useNavigate } from 'react-router-dom';

export const ResultPage = () => {
  const navigate = useNavigate();

  const clickRedo = () => {
    navigate('/settings');
  };

  const clickDownload = () => {};

  return (
    <div className='max-w-[500px] w-svw min-h-svh flex flex-col p-5 justify-around mx-auto'>
      <div className='flex flex-col gap-5'>
        <img src='/images/placeholder.png' alt='' />
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
          >
            скачать <br /> портрет
          </button>
        </div>
      </div>
    </div>
  );
};
