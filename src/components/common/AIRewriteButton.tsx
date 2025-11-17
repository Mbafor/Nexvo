import { useState } from 'react';
import { Wand2, Loader, RotateCcw, Repeat2, Check, X } from 'lucide-react';
import { rewriteWithAI } from '../../utils/aiRewrite';

interface AIRewriteButtonProps {
  text: string;
  onRewrite: (rewrittenText: string) => void;
  context?: string;
  className?: string;
}

export default function AIRewriteButton({
  text,
  onRewrite,
  context = 'professional',
  className = '',
}: AIRewriteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalText, setOriginalText] = useState<string | null>(null);
  const [rewrittenText, setRewrittenText] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleRewrite = async () => {
    if (!text.trim()) {
      setError('No text to rewrite');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newRewrittenText = await rewriteWithAI(text, context);
      setOriginalText(text);
      setRewrittenText(newRewrittenText);
      setShowPreview(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to rewrite text';
      setError(errorMessage);
      console.error('AI Rewrite Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    if (rewrittenText) {
      onRewrite(rewrittenText);
      setShowPreview(false);
      setRewrittenText(null);
      setOriginalText(null);
    }
  };

  const handleRevert = () => {
    setShowPreview(false);
    setRewrittenText(null);
    setOriginalText(null);
    setError(null);
  };

  const handleRewriteAgain = async () => {
    if (!rewrittenText) return;

    setIsLoading(true);
    setError(null);

    try {
      const newRewrittenText = await rewriteWithAI(rewrittenText, context);
      setRewrittenText(newRewrittenText);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to rewrite text';
      setError(errorMessage);
      console.error('AI Rewrite Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Preview mode: show original + rewritten with action buttons
  if (showPreview && rewrittenText) {
    return (
      <div className="space-y-3 border border-blue-200 rounded-lg p-4 bg-blue-50">
        <div>
          <p className="text-xs font-semibold text-slate-700 mb-2">Original:</p>
          <div className="text-sm text-slate-700 p-3 bg-white rounded border border-slate-200 whitespace-pre-wrap">
            {originalText}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-blue-700 mb-2"> Rewritten:</p>
          <div className="text-sm text-slate-700 p-3 bg-white rounded border border-blue-300 whitespace-pre-wrap">
            {rewrittenText}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleAccept}
            disabled={isLoading}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors text-sm"
            title="Accept and use this rewritten text"
          >
            <Check className="h-4 w-4" />
            <span>Accept</span>
          </button>

          <button
            type="button"
            onClick={handleRewriteAgain}
            disabled={isLoading}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors text-sm"
            title="Rewrite the text again"
          >
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Rewriting...</span>
              </>
            ) : (
              <>
                <Repeat2 className="h-4 w-4" />
                <span>Rewrite Again</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRevert}
            disabled={isLoading}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors text-sm"
            title="Discard rewritten text and restore original"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Revert</span>
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded flex items-center gap-2">
            <X className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>
    );
  }

  // Default mode: show primary rewrite button
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleRewrite}
        disabled={isLoading || !text.trim()}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors ${className}`}
        title="Rewrite text with AI"
      >
        {isLoading ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            <span>Rewriting...</span>
          </>
        ) : (
          <>
            <Wand2 className="h-4 w-4" />
            <span> Rewrite with AI</span>
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded flex items-center gap-2">
          <X className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}
