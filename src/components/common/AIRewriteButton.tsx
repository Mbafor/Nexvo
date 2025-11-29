
import { rewriteWithAI } from '../../utils/aiRewrite';
// components/AIRewriteButton.tsx
import { useState } from 'react';
import { Wand2, Loader2, RefreshCw, RotateCcw } from 'lucide-react';

interface AIRewriteButtonProps {
  text: string; // The current text from the form
  onRewrite: (rewrittenText: string) => void; // Function to update the form
  context?: string;
  className?: string;
}

export default function AIRewriteButton({
  text,
  onRewrite,
  context = 'professional',
  className = '',
}: AIRewriteButtonProps) {
  
  // 'idle' = Show "Enhance"
  // 'loading' = Show "Enhancing..."
  // 'rewritten' = Show "Revert" and "Try Again"
  const [rewriteState, setRewriteState] = useState<'idle' | 'loading' | 'rewritten'>('idle');
  
  const [originalText, setOriginalText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Called the first time. Saves the original text and rewrites.
   */
  const handleInitialRewrite = async () => {
    if (!text.trim()) {
      setError('No text to rewrite');
      return;
    }
    
    console.log('🤖 AI Rewrite initiated:', { textLength: text.length, context });
    setOriginalText(text); // <-- Save the original text
    setRewriteState('loading');
    setError(null);

    try {
      const newRewrittenText = await rewriteWithAI(text, context);
      console.log('✅ AI Rewrite completed:', { 
        originalLength: text.length, 
        rewrittenLength: newRewrittenText.length,
        improved: newRewrittenText !== text
      });
      onRewrite(newRewrittenText); // <-- IMMEDIATELY update the form
      setRewriteState('rewritten'); // Show "Revert/Try Again" buttons
    } catch (err) {
      console.error('❌ AI Rewrite error:', err);
      setError(err instanceof Error ? err.message : 'Failed to rewrite');
      setRewriteState('idle'); // Go back to the start
    }
  };

  /**
   * Called by "Try Again". Uses the saved original text.
   */
  const handleTryAgain = async () => {
    if (!originalText) return; // Should never happen
    
    console.log('🔄 AI Rewrite - Try Again:', { textLength: originalText.length, context });
    setRewriteState('loading');
    setError(null);

    try {
      const newRewrittenText = await rewriteWithAI(originalText, context);
      console.log('✅ AI Rewrite - Try Again completed:', { 
        originalLength: originalText.length, 
        rewrittenLength: newRewrittenText.length 
      });
      onRewrite(newRewrittenText); // <-- IMMEDIATELY update the form
      setRewriteState('rewritten'); // Go back to "Revert/Try Again"
    } catch (err) {
      console.error('❌ AI Rewrite - Try Again error:', err);
      setError(err instanceof Error ? err.message : 'Failed to rewrite');
      setRewriteState('rewritten'); // Stay on "Revert/Try Again"
    }
  };

  /**
   * Called by "Revert". Restores the saved original text.
   */
  const handleRevert = () => {
    if (originalText !== null) {
      onRewrite(originalText); // <-- Revert to original
    }
    setRewriteState('idle'); // Go back to the start
    setOriginalText(null);
    setError(null);
  };

  // -------------------------------------------------------
  // RENDER: Loading State
  // -------------------------------------------------------
  if (rewriteState === 'loading') {
    return (
      <div className={`mt-2 flex gap-2 ${className}`}>
        <button
          type="button"
          disabled
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md"
        >
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Enhancing...
        </button>
      </div>
    );
  }

  // -------------------------------------------------------
  // RENDER: Rewritten State (Show Revert/Try Again)
  // -------------------------------------------------------
  if (rewriteState === 'rewritten') {
    return (
      <div className={`mt-2 flex flex-wrap gap-2 ${className}`}>
        {/* Revert Button */}
        <button
          type="button"
          onClick={handleRevert}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          title="Revert to your original text"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Revert
        </button>
        
        {/* Try Again Button */}
        <button
          type="button"
          onClick={handleTryAgain}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
          title="Get another AI suggestion"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try Again
        </button>

        {error && (
           <span className="ml-2 text-xs text-red-500">{error}</span>
        )}
      </div>
    );
  }

  // -------------------------------------------------------
  // RENDER: Default State (Show "Enhance")
  // -------------------------------------------------------
  return (
    <div className={`mt-2 ${className}`}>
      <button
        type="button"
        onClick={handleInitialRewrite}
        disabled={!text.trim()}
        className={`
          group flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-indigo-700 
          bg-indigo-50 hover:bg-indigo-100 rounded-md transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <Wand2 className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
        Enhance with AI
      </button>

      {error && (
         <span className="ml-2 text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}
