import { generateImage } from '@/api/generate.api';
import { uploadFile } from '@/api/upload.api';
import { Checkbox } from '@/components/ui/checkbox';
import { ColorSelector } from '@/components/ui/color-selector';
import { Slider } from '@/components/ui/slider';
import { hexToColor, sliderToAgression, sliderToBodyType } from '@/lib/utils';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const SettingsPage = () => {
  const inputUpdateAvatarPhoto = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { url } = useParams<{ url: string }>();
  const photoUrl = `https://r2r-comfyui.s3.amazonaws.com/users/${url}`;

  const [adidasColor, setAdidasColor] = useState<string>('#FF6A52');
  const [backgroundColor, setBackgroundColor] = useState<string>('#FF6A52');
  const [strength, setStrength] = useState<string>('average');

  const [agression, setAgression] = useState<number>(0.75);

  const onBack = () => {
    navigate('/');
  };

  const onGenerate = async () => {
    const res = await generateImage(
      photoUrl,
      hexToColor(adidasColor),
      backgroundColor,
      agression,
      strength
    );
    if (res.data) {
      navigate(`/result/${res.data.id}`);
    }
  };

  const handleImageChange = async () => {
    const files = inputUpdateAvatarPhoto.current?.files;

    if (files) {
      const formData = new FormData();
      formData.append('file', files[0]);

      const res = await uploadFile(formData);
      if (res.data) navigate(`/settings/${res.data.url}`);
    }
  };

  return (
    <div className='max-w-[500px] w-svw min-h-svh flex flex-col p-5 justify-around mx-auto'>
      <p onClick={onBack} className='text-3xl cursor-pointer'>
        {'<- назад'}
      </p>
      <div className='mx-auto relative mt-2 mb-10'>
        <img src={photoUrl} alt='' />
        <button
          onClick={() => {
            inputUpdateAvatarPhoto.current?.click();
          }}
          className='absolute -bottom-5 -right-10 px-5 py-2 bg-[#4F89E1] rounded-lg w-fit mx-auto active:scale-95 text-left'
        >
          заменить <br /> фотографию
        </button>
        <input
          className='hidden'
          type='file'
          multiple
          ref={inputUpdateAvatarPhoto}
          onChange={handleImageChange}
        />
      </div>
      <div className='grid grid-cols-2 gap-5'>
        <div className='text-[#B1B1B1] text-2xl font-medium text-muted-foreground'>
          <p>Параметры генерации портрета</p>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 py-2'>
            <Checkbox />
            <p className='text-lg'>высокое качество</p>
          </div>
          <div className='flex gap-2 py-2'>
            <Checkbox />
            <p className='text-lg'>интерфейс игры [+]</p>
          </div>
        </div>
        <div>
          <p className='text-[#B1B1B1] pb-4'>цвет адидаса</p>
          <ColorSelector
            random
            onColorChange={(color) => {
              setAdidasColor(color); // Update state with selected color
            }}
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
        </div>
        <div>
          <p className='text-[#B1B1B1] pb-4'>цвет фона</p>
          <ColorSelector
            transparent
            random
            onColorChange={(color) => {
              setBackgroundColor(color); // Update state with selected background color
            }}
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
        </div>
        <div>
          <p className='text-[#B1B1B1]'>качек / дрыщь</p>
          <Slider
            onValueChange={(value) => {
              setStrength(sliderToBodyType(value[0]));
            }}
            max={100}
            min={0}
            defaultValue={[50]}
          />
        </div>
        <div>
          <p className='text-[#B1B1B1]'>уровень агрессии</p>
          <Slider
            onValueChange={(value) => {
              setAgression(sliderToAgression(value[0]));
            }}
            max={100}
            min={0}
            defaultValue={[50]}
          />
        </div>
      </div>
      <button
        onClick={onGenerate}
        className='px-8 py-4 mt-5 text-lg bg-secondary rounded-lg w-fit mx-auto active:scale-95'
      >
        генерировать портрет
      </button>
    </div>
  );
};
