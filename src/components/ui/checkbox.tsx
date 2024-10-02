import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-8 w-8 shrink-0 rounded-sm border data-[state=checked]:border-[3px] border-primary-foreground/20 data-[state=checked]:border-primary-foreground shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <X strokeWidth={4} strokeLinecap='square' className='h-3 w-3' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
