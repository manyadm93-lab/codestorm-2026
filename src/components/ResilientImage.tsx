import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-slate-100 to-violet-50 p-6 text-center dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950 ${className}`}
      >
        <ImageOff className="mb-2 h-7 w-7 text-blue-700/60 dark:text-blue-400/70" aria-hidden="true" />
        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
          {fallbackTitle || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
