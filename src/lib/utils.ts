import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToColor(hex: string) {
  if (hex.length < 3 && hex.length > 7) {
    return 'black';
  }

  const colors = [
    ['#FF6A52', 'light orange'],
    ['#4F89E1', 'light blue'],
    ['#4DA763', 'light green'],
    ['#FFC36F', 'light yellow'],
    ['#862819', 'red'],
    ['#143362', 'blue'],
    ['#194023', 'green'],
    ['#A56B19', 'dark orange'],
  ];

  if (hex[0] !== '#') {
    hex = `#${hex}`;
  }

  const color = colors.find(
    ([colorHex]) => colorHex.toLowerCase() === hex.toLowerCase()
  );

  return color ? color[1] : 'black';
}
