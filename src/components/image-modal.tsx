import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal = ({ isOpen, imageSrc, onClose, onNext, onPrev }: ImageModalProps) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
      <div className='relative'>
        <div onClick={onPrev} className="absolute top-[50%] left-2 cursor-pointer text-3xl">{'<'}</div>
        <div onClick={onNext} className="absolute top-[50%] right-2 cursor-pointer text-3xl">{'>'}</div>
        <button className='absolute top-2 right-2 text-white' onClick={onClose}>
          <X className='h-8 w-8' />
        </button>
        <img
          src={imageSrc}
          alt='Full screen view'
          className='max-h-[80vh] max-w-screen'
        />
      </div>
    </div>
  );
};

export default ImageModal;
