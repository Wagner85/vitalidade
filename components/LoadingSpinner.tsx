
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 border-4 border-emerald-500 border-dashed rounded-full animate-spin"></div>
      <h2 className="mt-6 text-xl font-semibold text-slate-700">Criando seu plano...</h2>
      <p className="mt-2 text-slate-500">Nossa IA está preparando um plano exclusivo e seguro para você. Isso pode levar alguns segundos.</p>
    </div>
  );
};

export default LoadingSpinner;
