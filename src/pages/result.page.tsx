import { pollGenerationStatus } from '@/stores/generation.api';
import { IGeneration, useGenerationStore } from '@/stores/generation.store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import spinner from '../assets/spinner.svg';
import { X, ZoomIn } from 'lucide-react';
import { generateImage } from '@/api/generate.api';
import { saveAs } from 'file-saver';
import { Checkbox } from '@/components/ui/checkbox';
import ImageModal from '@/components/image-modal';

export const ResultPage = () => {
    const navigate = useNavigate();
    const { generations, removeGeneration } = useGenerationStore();

    const images = generations.flatMap(x => [x.source, x.result]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<number>(0);

    const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            await pollGenerationStatus();
        }, 5000);

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

    // Handle checkbox change for selecting images
    const handleCheckboxChange = (id: string) => {
        setSelectedGenerations((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    const downloadImages = async () => {
        try {
            // Only download selected images
            const downloadPromises = generations
                .filter((gen) => {
                    return selectedGenerations.length !== 0
                        ? selectedGenerations.includes(gen.id)
                        : true;
                }) // Filter selected generations
                .map(async (gen) => {
                    if (!gen.result) return;
                    const response = await fetch(gen.result);
                    const blob = await response.blob();
                    saveAs(blob, `${gen.id}.png`);
                });

            // Execute all downloads simultaneously
            await Promise.all(downloadPromises);

            console.log('Selected images downloaded');
        } catch (error) {
            console.error('Error downloading images:', error);
        }
    };

    const openModal = (imageIndex: number) => {
        setCurrentImage(imageIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='max-w-[500px] w-svw min-h-svh p-5 mx-auto pb-24'>
                <div className='grid grid-cols-2'>
                    <button
                        onClick={clickRedo}
                        className='py-1 active:scale-95 text-left text-2xl'
                    >
                        {'<- назад'}
                    </button>
                    <div className='relative'>
                        <p className='text-right text-xl pr-5'>выбрать все</p>
                        <Checkbox
                            onCheckedChange={(state) => {
                                if (state) {
                                    setSelectedGenerations(() =>
                                        generations
                                            .filter((gen) => gen.result)
                                            .flatMap((gen) => gen.id)
                                    );
                                } else {
                                    setSelectedGenerations([]);
                                }
                            }}
                            className='absolute mr-5 -right-14'
                        />
                    </div>
                    {generations.map((x, index) => {
                        return (
                            <>
                                <div key={`${x.id}_source`} onClick={() => openModal(index * 2)} className='relative m-5'>
                                    {x.status === 'Failed' && (
                                        <img
                                            onClick={() => handleRegenerate(x)}
                                            className='absolute top-[50%] cursor-pointer translate-y-[-50%] -translate-x-[150%]'
                                            src={spinner}
                                        />
                                    )}
                                    <div
                                        onClick={() => openModal(index * 2)} // Handle deletion
                                        className='absolute right-2 cursor-pointer bottom-2 bg-[#D9D9D9] rounded-full p-1'
                                    >
                                        <ZoomIn className='text-[#383838] h-5 w-5' />
                                    </div>
                                    <div
                                        onClick={() => removeGeneration(x.id)} className='absolute right-2 cursor-pointer top-2 bg-[#8B0000] rounded-full p-2'
                                    >
                                        <X className='h-3 w-3' />
                                    </div>
                                    <img
                                        className='aspect-square object-cover'
                                        src={x.source}
                                        alt=''
                                    />
                                </div>
                                <div key={`${x.id}_result`} onClick={() => openModal(index * 2 + 1)} className='m-5 aspect-square'>
                                    <div className='relative bg-[#525252] h-full w-full flex justify-center items-center'>
                                        {x.status === 'Completed' ? (
                                            <div className='relative'>
                                                <div
                                                    onClick={() => openModal(index * 2 + 1)} // Handle deletion
                                                    className='absolute right-2 cursor-pointer bottom-2 bg-[#D9D9D9] rounded-full p-1'
                                                >
                                                    <ZoomIn className='text-[#383838] h-5 w-5' />
                                                </div>
                                                <Checkbox
                                                    checked={selectedGenerations.includes(x.id)}
                                                    onCheckedChange={() => handleCheckboxChange(x.id)}
                                                    className='absolute -right-14 top-[50%] -translate-y-[50%]'
                                                />
                                                <img
                                                    className='object-cover h-full w-full'
                                                    src={x.result}
                                                    alt=''
                                                />
                                            </div>
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
            <div className='fixed flex bottom-5 w-full'>
                <button
                    onClick={downloadImages}
                    className='px-8 py-4 text-lg bg-[#DD4B34] rounded-lg w-fit mx-auto active:scale-95'
                >
                    {selectedGenerations.length === 0
                        ? 'скачать все'
                        : `скачать выбранные (${selectedGenerations.length})`}
                </button>
            </div>
            <ImageModal
                isOpen={isModalOpen}
                imageSrc={images[currentImage] ?? ''}
                onClose={closeModal}
                onNext={() => setCurrentImage(current => current + 1)}
                onPrev={() => setCurrentImage(current => current - 1)}
            />
        </>
    );
};
