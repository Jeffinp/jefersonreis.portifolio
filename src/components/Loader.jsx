import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-white dark:bg-slate-900">
            <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-b-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                    <img
                        src="/favicon.ico"
                        alt="Logo"
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            </div>
            <p className="mt-8 text-lg text-gray-700 dark:text-gray-200 font-medium">Carregando o portfólio...</p>
        </div>
    );
};

export default Loader; 