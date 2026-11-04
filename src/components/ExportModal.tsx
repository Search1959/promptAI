import React, { useState } from 'react';
import { X, FileText, Code, FileCode, Printer, Check, Copy, Link } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptText: string;
  categoryName: string;
  targetAi: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  promptText,
  categoryName,
  targetAi
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportTxt = () => {
    const filename = `prompt_${categoryName.toLowerCase().replace(/[\s/]+/g, '_')}.txt`;
    downloadFile(filename, promptText, 'text/plain');
  };

  const handleExportMd = () => {
    const filename = `prompt_${categoryName.toLowerCase().replace(/[\s/]+/g, '_')}.md`;
    downloadFile(filename, promptText, 'text/markdown');
  };

  const handleExportJson = () => {
    const filename = `prompt_${categoryName.toLowerCase().replace(/[\s/]+/g, '_')}.json`;
    const payload = JSON.stringify(
      {
        category: categoryName,
        targetAi,
        createdAt: new Date().toISOString(),
        prompt: promptText
      },
      null,
      2
    );
    downloadFile(filename, payload, 'application/json');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Prompt - ${categoryName}</title>
            <style>
              body { font-family: -apple-system, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
              h1 { font-size: 20px; border-bottom: 2px solid #eee; padding-bottom: 8px; }
              pre { background: #f8f9fa; padding: 20px; border-radius: 8px; white-space: pre-wrap; font-family: monospace; font-size: 13px; }
              .meta { color: #666; font-size: 12px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <h1>PromptArchitect Deliverable</h1>
            <div class="meta">Category: ${categoryName} · Target: ${targetAi} · Date: ${new Date().toLocaleDateString()}</div>
            <pre>${promptText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1422] shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Export Prompt Deliverable
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={handleExportTxt}
            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-indigo-400 text-left transition-all flex flex-col gap-1.5 cursor-pointer group"
          >
            <FileText className="w-4 h-4 text-slate-500 group-hover:text-indigo-500 transition-colors" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Plain Text (.txt)
            </span>
            <span className="text-[10px] text-slate-400">
              Clean universally readable text
            </span>
          </button>

          <button
            onClick={handleExportMd}
            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-indigo-400 text-left transition-all flex flex-col gap-1.5 cursor-pointer group"
          >
            <FileCode className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Markdown (.md)
            </span>
            <span className="text-[10px] text-slate-400">
              Formatted with sections & tags
            </span>
          </button>

          <button
            onClick={handleExportJson}
            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-indigo-400 text-left transition-all flex flex-col gap-1.5 cursor-pointer group"
          >
            <Code className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Structured JSON (.json)
            </span>
            <span className="text-[10px] text-slate-400">
              API-ready metadata payload
            </span>
          </button>

          <button
            onClick={handlePrint}
            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-indigo-400 text-left transition-all flex flex-col gap-1.5 cursor-pointer group"
          >
            <Printer className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Print / Save PDF
            </span>
            <span className="text-[10px] text-slate-400">
              Clean printable layout
            </span>
          </button>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={handleCopyShareLink}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Applet Share Link'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
