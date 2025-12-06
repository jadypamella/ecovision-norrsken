import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loading = ({ size = 'md', text, className }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      {text && <p className="text-muted-foreground text-sm animate-pulse">{text}</p>}
    </div>
  );
};

export const PageLoading = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loading size="lg" text="Loading..." />
  </div>
);
