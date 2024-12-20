import { generateImage } from '@/api/generate.api';
import { uploadFile } from '@/api/upload.api';
import ImageModal from '@/components/image-modal';
import { Checkbox } from '@/components/ui/checkbox';
import { ColorSelector } from '@/components/ui/color-selector';
import { Slider } from '@/components/ui/slider';
import { hexToColor, sliderToAgression, sliderToBodyType } from '@/lib/utils';
import { useGenerationStore } from '@/stores/generation.store';
import { X, ZoomIn } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SettingsPage = () => {
    const inputUpdateAvatarPhoto = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { sources, addSource, removeSource } = useGenerationStore();

    const [selectedSources, setSelectedSources] = useState<string[]>([]); // State for selected sources
    const [adidasColor, setAdidasColor] = useState<string>('#FF6A52');
    const [backgroundColor, setBackgroundColor] = useState<string>('#FF6A52');
    const [strength, setStrength] = useState<string>('average');
    const [agression, setAgression] = useState<number>(0.75);

    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal open/close
    const [currentImage, setCurrentImage] = useState(0); // Manage current image for modal

    const openModal = (imageIndex: number) => {
        setCurrentImage(imageIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onBack = () => {
        navigate('/');
    };

    const onGenerate = async () => {
        for (const source of sources.length !== 1 ? selectedSources : sources) {
            await generateImage(
                `https://r2r-comfyui.s3.amazonaws.com/users/${source}`,
                hexToColor(adidasColor),
                backgroundColor,
                agression.toFixed(0),
                strength
            );
        }
        navigate('/result');
    };

    const handleImageChange = async () => {
        const files = inputUpdateAvatarPhoto.current?.files;

        if (files) {
            const formData = new FormData();
            formData.append('file', files[0]);

            const res = await uploadFile(formData);
            removeSource(sources[0]);
            addSource(res.data.url);
        }
    };

    const toggleSourceSelection = (source: string) => {
        setSelectedSources((prev) =>
            prev.includes(source)
                ? prev.filter((item) => item !== source)
                : [...prev, source]
        );
    };

    return (
        <>
            <div className='max-w-[500px] w-svw min-h-svh p-5 space-y-5 mx-auto pb-24'>
                <p onClick={onBack} className='text-2xl cursor-pointer w-fit'>
                    {'<- назад'}
                </p>
                {sources.length === 1 && (
                    <div className='max-w-[75%] mx-auto relative mt-2 mb-10'>
                        <img
                            className='w-full mx-auto'
                            src={`https://r2r-comfyui.s3.amazonaws.com/users/${sources[0]}`}
                            alt=''
                        />
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
                            ref={inputUpdateAvatarPhoto}
                            onChange={handleImageChange}
                        />
                    </div>
                )}
                <div className='grid grid-cols-2 gap-5'>
                    <div className='text-[#B1B1B1] text-2xl font-medium text-muted-foreground'>
                        <p>Параметры генерации портрета</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 py-2'>
                            <Checkbox />
                            <p className='text-lg'>upscale</p>
                        </div>
                        <div className='flex gap-2 py-2'>
                            <Checkbox />
                            <p className='text-lg'>интерфейс поверх</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-[#B1B1B1] pb-4'>цвет адидаса</p>
                        <ColorSelector
                            random
                            onColorChange={(color) => {
                                setAdidasColor(color);
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
                            random
                            transparent
                            onColorChange={(color) => {
                                setBackgroundColor(color);
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
                        <p className='text-[#B1B1B1]'>дрыщь / качек</p>
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
                <div className='h-full grid grid-cols-3 gap-2'>
                    {sources.length > 1 &&
                        sources.map((source, index) => (
                            <div className='relative'>
                                <div
                                    onClick={() =>
                                        openModal(
                                           index 
                                        )
                                    } // Handle deletion
                                    className='absolute right-2 cursor-pointer bottom-2 bg-[#D9D9D9] rounded-full p-1'
                                >
                                    <ZoomIn className='text-[#383838] h-5 w-5' />
                                </div>
                                <div
                                    onClick={() => {
                                        removeSource(source);
                                    }}
                                    className='absolute right-2 cursor-pointer top-2 bg-[#8B0000] rounded-full p-2'
                                >
                                    <X className='h-3 w-3' />
                                </div>
                                <img
                                    key={source}
                                    src={`https://r2r-comfyui.s3.amazonaws.com/users/${source}`}
                                    alt=''
                                    onClick={() => toggleSourceSelection(source)}
                                    className={`border-4 cursor-pointer aspect-square object-cover ${selectedSources.includes(source) ? 'border-red-500' : ''
                                        }`}
                                />
                            </div>
                        ))}
                </div>
            </div>
            <div className='fixed flex bottom-5 w-full'>
                <button
                    onClick={onGenerate}
                    className='px-8 py-4 text-lg bg-[#DD4B34] rounded-lg w-fit mx-auto active:scale-95'
                >
                    генерировать портрет
                </button>
            </div>
            <ImageModal
                isOpen={isModalOpen}
                imageSrc={`https://r2r-comfyui.s3.amazonaws.com/users/${sources[currentImage]}`}
                onClose={closeModal}
                onNext={() => setCurrentImage(current => current + 1)}
                onPrev={() => setCurrentImage(current => current - 1)} />
        </>
    );
};
