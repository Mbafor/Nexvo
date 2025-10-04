// src/components/CVUpload.tsx
import { Upload, X } from "lucide-react";
import { useState } from "react";

// PDF.js import (worker via CDN)
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.12.313/pdf.worker.min.js";

interface CVUploadProps {
  onFileUpload: (file: File) => Promise<void>;
}

export default function CVUpload({ onFileUpload }: CVUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) await processFile(files[0]);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) await processFile(files[0]);
  };

  const processFile = async (file: File) => {
    setError(null);

    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|txt|doc|docx)$/i)) {
      setError("Please upload a PDF, DOCX, DOC, or TXT file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    try {
      await onFileUpload(file);
    } catch (err) {
      setError("Failed to process file. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
    setFileName(null);
    setError(null);
  };

  return (
    <div className="w-full mb-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl transition-all ${
          isDragging
            ? "border-[#1E3A8A] bg-[#DDE7FF]"
            : "border-[#D1D5DB] bg-white hover:border-[#3B82F6]"
        }`}
      >
        <input
          type="file"
          id="cv-upload"
          className="hidden"
          accept=".pdf,.txt,.doc,.docx"
          onChange={handleFileSelect}
          disabled={isProcessing}
        />

        <label htmlFor="cv-upload" className="flex flex-col items-center cursor-pointer p-8">
          <Upload
            className={`h-12 w-12 mb-4 transition-colors ${
              isDragging ? "text-[#1E3A8A]" : "text-[#3B82F6]"
            }`}
          />
          <p className="text-[#1E3A8A] font-semibold mb-2 text-center">
            {isProcessing ? "Processing your CV..." : "Upload your existing CV"}
          </p>
          <p className="text-sm text-gray-600 text-center mb-2">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-gray-500 text-center">
            Supported formats: PDF, DOCX, DOC, TXT (max 10MB)
          </p>
        </label>
      </div>

      {fileName && !error && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
          <p className="text-sm text-green-700">Uploaded: {fileName}</p>
          <button onClick={clearFile} className="text-green-600 hover:text-green-800">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <p className="text-sm text-red-600">{error}</p>
          <button onClick={clearFile} className="text-red-600 hover:text-red-800">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-[#1E3A8A]">
            Analyzing your CV and extracting information...
          </p>
        </div>
      )}
    </div>
  );
}
