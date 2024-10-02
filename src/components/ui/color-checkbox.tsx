import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ColorCheckboxProps {
  color: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

const ColorCheckbox = ({
  color,
  checked,
  onCheckedChange,
  className,
}: ColorCheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        `peer h-8 w-8 shrink-0 rounded-lg data-[state=checked]:border-[3px] border-primary-foreground/20 data-[state=checked]:border-primary-foreground shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
        className,
        color === 'transparent' && 'border'
      )}
      style={{ backgroundColor: color }}
    >
      {color === 'transparent' && (
        <div className={cn('flex items-center justify-center text-current')}>
          <X strokeWidth={4} strokeLinecap='square' className='h-3 w-3' />
        </div>
      )}
    </CheckboxPrimitive.Root>
  );
};
ColorCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { ColorCheckbox };
