import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface BulletPointTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  className?: string;
}

export default function BulletPointTextarea({
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  className = "",
}: BulletPointTextareaProps) {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-add bullet points on new lines
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = value.substring(0, cursorPosition);
      const textAfterCursor = value.substring(cursorPosition);
      
      // Check if we're already in a bullet point line
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      
      let newText = '';
      if (currentLine.trim().startsWith('•') || currentLine.trim().startsWith('-')) {
        // If current line is empty bullet, remove it instead of adding new one
        if (currentLine.trim() === '•' || currentLine.trim() === '-') {
          const textWithoutLastLine = lines.slice(0, -1).join('\n');
          newText = textWithoutLastLine + '\n' + textAfterCursor;
          onChange(newText);
          
          // Set cursor position after the line break
          setTimeout(() => {
            if (textarea) {
              const newPosition = textWithoutLastLine.length + 1;
              textarea.setSelectionRange(newPosition, newPosition);
            }
          }, 0);
        } else {
          // Add new bullet point
          newText = textBeforeCursor + '\n• ' + textAfterCursor;
          onChange(newText);
          
          // Set cursor position after the bullet
          setTimeout(() => {
            if (textarea) {
              const newPosition = cursorPosition + 3; // +3 for '\n• '
              textarea.setSelectionRange(newPosition, newPosition);
            }
          }, 0);
        }
      } else {
        // Add bullet point if this is the start or if previous line doesn't have bullet
        const shouldAddBullet = textBeforeCursor.trim() === '' || 
                               !lines[lines.length - 2]?.trim().startsWith('•');
        
        if (shouldAddBullet) {
          newText = textBeforeCursor + '\n• ' + textAfterCursor;
          onChange(newText);
          
          setTimeout(() => {
            if (textarea) {
              const newPosition = cursorPosition + 3;
              textarea.setSelectionRange(newPosition, newPosition);
            }
          }, 0);
        } else {
          newText = textBeforeCursor + '\n' + textAfterCursor;
          onChange(newText);
          
          setTimeout(() => {
            if (textarea) {
              const newPosition = cursorPosition + 1;
              textarea.setSelectionRange(newPosition, newPosition);
            }
          }, 0);
        }
      }
    }
  };

  // Add initial bullet point if textarea is empty and gets focus
  const handleFocus = () => {
    if (value.trim() === '') {
      onChange('• ');
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(2, 2);
        }
      }, 0);
    }
  };

  // Format existing text to have bullet points
  const formatWithBullets = (text: string) => {
    if (!text.trim()) return text;
    
    const lines = text.split('\n');
    return lines.map(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('•') && !trimmed.startsWith('-')) {
        return '• ' + trimmed;
      }
      return line;
    }).join('\n');
  };

  // Auto-format on blur if content exists
  const handleBlur = () => {
    if (value.trim() && !value.includes('•')) {
      onChange(formatWithBullets(value));
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={rows}
        className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-vertical ${className}`}
        placeholder={placeholder || t("common.bulletPointPlaceholder")}
      />
      <p className="text-xs text-slate-500">
        {t("common.bulletPointTip")}
      </p>
    </div>
  );
}