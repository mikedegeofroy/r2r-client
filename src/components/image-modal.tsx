import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

const ImageModal = ({ isOpen, imageSrc, onClose }: ImageModalProps) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
      <div className='relative'>
        <button className='absolute top-2 right-2 text-white' onClick={onClose}>
          <X className='h-8 w-8' />
        </button>
        <img
          src={imageSrc}
          alt='Full screen view'
          className='max-h-screen max-w-screen'
        />
      </div>
    </div>
  );
};

export default ImageModal;
