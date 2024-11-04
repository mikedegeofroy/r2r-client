import { X, ZoomIn } from "lucide-react";

interface ImageBoxProps {
    onDelete?: () => void;
    onZoom?: () => void;
    onClick?: () => void;
    src: string;
    selected?: boolean;
}

export const ImageBox = ({ onDelete, onZoom, onClick, src, selected }: ImageBoxProps) => {
    return (
        <div className='relative'>
            {onZoom !== undefined &&
                <div
                    onClick={onZoom}
                    className='absolute right-2 cursor-pointer bottom-2 bg-[#D9D9D9] rounded-full p-1'
                >
                    <ZoomIn className='text-[#383838] h-5 w-5' />
                </div>
            }
            {onDelete !== undefined &&
                <div
                    onClick={onDelete}
                    className='absolute right-2 cursor-pointer top-2 bg-[#8B0000] rounded-full p-2'
                >
                    <X className='h-3 w-3' />
                </div>}
            <img
                onClick={onClick}
                key={src}
                src={src}
                alt=''
                className={`${selected != undefined && 'border-4'} cursor-pointer aspect-square object-cover ${selected ? 'border-red-500' : ''
                    }`}
            />
        </div>

    )
}
