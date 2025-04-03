'use client';

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ 
        __html: html
          .replace(/&nbsp;/g, ' ')
          .replace(/<p>/g, '<p class="mb-4">')
          .replace(/<h3/g, '<h3 class="text-xl font-semibold mb-2"')
          .replace(/<ul>/g, '<ul class="list-disc pl-5 mb-4">')
          .replace(/<li>/g, '<li class="mb-2">')
          .replace(/<em>/g, '<em class="italic">')
          .replace(/<strong>/g, '<strong class="font-semibold">')
      }} 
    />
  );
} 