import ImageModal from "@/components/image-modal";
import { ImageBox } from "@/components/ui/image-box"
import { useState } from "react";

const images = [
    'https://r2r-comfyui.s3.amazonaws.com/users/6614c03b-2819-4b34-80d2-38289ae9ea6c.jpeg',
    'https://r2r-comfyui.s3.amazonaws.com/users/6614c03b-2819-4b34-80d2-38289ae9ea6c.jpeg',
    'https://r2r-comfyui.s3.amazonaws.com/users/6614c03b-2819-4b34-80d2-38289ae9ea6c.jpeg',
    'https://r2r-comfyui.s3.amazonaws.com/users/6614c03b-2819-4b34-80d2-38289ae9ea6c.jpeg',
    'https://r2r-comfyui.s3.amazonaws.com/users/6614c03b-2819-4b34-80d2-38289ae9ea6c.jpeg',
    'https://r2r-comfyui.s3.amazonaws.com/users/6614c03b-2819-4b34-80d2-38289ae9ea6c.jpeg'
]

export const GalleryPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const openModal = (imageIndex: number) => {
        setCurrentImage(imageIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='grid grid-cols-3 max-w-[500px] w-svw p-5 gap-5  mx-auto pb-24'>
                {images.map((image, index) => <ImageBox onClick={() => openModal(index)} src={image} />)}
            </div>
            <ImageModal
                isOpen={isModalOpen}
                imageSrc={images[currentImage]}
                onClose={closeModal}
                onNext={() => setCurrentImage(current => current + 1)}
                onPrev={() => setCurrentImage(current => current - 1)} />
        </>
    )
}
