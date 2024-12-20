import { uploadFile } from '@/api/upload.api';
import { useGenerationStore } from '@/stores/generation.store';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const inputUpdateAvatarPhoto = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { addSource } = useGenerationStore();

  const handleImageChange = async () => {
    const files = inputUpdateAvatarPhoto.current?.files;

    if (!files) return;
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await uploadFile(formData);
      addSource(res.data.url);
      navigate('/settings');
    }
  };

  return (
    <div className='max-w-[500px] min-h-svh space-y-5 w-svw flex flex-col justify-around mx-auto pb-10'>
      <h1 className='text-3xl font-medium text-center'>ФОТОАТЕЛЬЕ</h1>
      <div className='flex gap-8 flex-col'>
        <div className='mx-auto'>
          <img src='/images/example.png' alt='' />
        </div>
        <div className='w-[60%] mx-auto text-primary font-medium'>
          Для лучшего портретного сходства фото должно быть:
          <ul className='list-disc pl-5 pt-5'>
            <li>спокойное выражение лица. Не улыбайся и не хмурься</li>
            <li>с ровным качественным освещением без головных уборов</li>
            <li>
              четкое, не размытое, лицо полностью входит в кадр видно не только
              лицо, но и шею с плечами
            </li>
            <li>на фото должен присутствовать 1 человек</li>
          </ul>
        </div>
        <button
          onClick={() => {
            inputUpdateAvatarPhoto.current?.click();
          }}
          className='px-5 py-4 bg-secondary rounded-lg w-fit mx-auto active:scale-95'
        >
          загрузить <br /> фотографию
        </button>
        <input
          className='hidden'
          type='file'
          multiple
          ref={inputUpdateAvatarPhoto}
          onChange={handleImageChange}
        />
      </div>
      <div className='mx-auto'>
        <img src='/images/logo.png' alt='' />
      </div>
    </div>
  );
};
