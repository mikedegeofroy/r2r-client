import { useState } from 'react';
import { ColorCheckbox } from './color-checkbox';

interface ColorSelectorProps {
  colors: string[];
  defaultColor?: number;
  random?: boolean;
  transparent?: boolean;
}

export const ColorSelector = ({
  colors,
  defaultColor = 0,
  random = false,
  transparent = false,
}: ColorSelectorProps) => {
  const colorList = [...colors];

  if (transparent) {
    colorList.splice(4, 0, 'transparent');
  } else {
    colorList.splice(4, 0, '');
  }

  const getRandomColorIndex = () => {
    const validColors = colorList.filter((color) => color !== '');
    const randomIndex = Math.floor(Math.random() * validColors.length);
    return validColors[randomIndex];
  };

  const [selectedColor, setSelectedColor] = useState<string | null>(
    random ? getRandomColorIndex() : colorList[defaultColor] ?? null
  );

  const handleCheckboxChange = (color: string) => {
    setSelectedColor((prev) => (prev === color ? null : color));
  };

  return (
    <div className='grid grid-cols-5 gap-2'>
      {colorList.map((color, index) =>
        color ? (
          <ColorCheckbox
            key={index}
            color={color}
            checked={selectedColor === color}
            onCheckedChange={() => handleCheckboxChange(color)}
          />
        ) : (
          <div key={index} className='w-8 h-8' />
        )
      )}
    </div>
  );
};
