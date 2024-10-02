import { Checkbox } from '@/components/ui/checkbox';
import { ColorSelector } from '@/components/ui/color-selector';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';

export const SettingsPage = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate('/');
  };

  const onGenerate = () => {
    navigate('/result');
  };

  return (
    <div className='max-w-[500px] w-svw min-h-svh flex flex-col p-5 justify-around mx-auto'>
      <p onClick={onBack} className='text-3xl cursor-pointer'>
        {'<- назад'}
      </p>
      <div className='mx-auto relative mt-2 mb-10'>
        <img src='/images/placeholder.png' alt='' />
        <button className='absolute -bottom-5 -right-10 px-5 py-2 bg-[#4F89E1] rounded-lg w-fit mx-auto active:scale-95 text-left'>
          заменить <br /> фотографию
        </button>
      </div>
      <div className='grid grid-cols-2 gap-5'>
        <div className='text-2xl font-medium text-muted-foreground'>
          <p>Параметры генерации портрета</p>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex gap-2 py-2'>
            <Checkbox />
            <p className='text-lg'>высокое качество</p>
          </div>
        </div>
        <ColorSelector
          random
          colors={[
            '#FF6A52',
            '#4F89E1',
            '#4DA763',
            '#FFC36F',
            '#862819',
            '#143362',
            '#194023',
            '#A56B19',
          ]}
        />
        <ColorSelector
          transparent
          random
          colors={[
            '#FF6A52',
            '#4F89E1',
            '#4DA763',
            '#FFC36F',
            '#862819',
            '#143362',
            '#194023',
            '#A56B19',
          ]}
        />
        <div>
          <p>Качек / Дрыщь</p>
          <Slider max={100} min={0} defaultValue={[50]} />
        </div>
        <div>
          <p>Уровень Агрессии</p>
          <Slider max={100} min={0} defaultValue={[50]} />
        </div>
      </div>
      <button
        onClick={onGenerate}
        className='px-8 py-4 text-lg bg-secondary rounded-lg w-fit mx-auto active:scale-95'
      >
        генерировать портрет
      </button>
    </div>
  );
};
