'use client';

import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface BaseModalProps {
    isOpen?: boolean;
    onClose: () => void;
    title?: string;
    subTitle?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'; 
    footer?: ReactNode;
}

export default function BaseModal({ 
    isOpen = true, 
    onClose, 
    title, 
    subTitle, 
    children, 
    size = 'full', 
    footer
}: BaseModalProps) {
    
    // Lock scroll body agar background tidak gerak
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        '2xl': 'max-w-7xl',
        // [FIX UKURAN]: Lebar 95%, Tinggi Maks 90vh (Ada sisa atas bawah), Margin Auto
        'full': 'w-[95%] max-w-[1600px] h-[90vh]', 
    };

    return (
        /* WRAPPER UTAMA: Fixed Center */
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
        >
            {/* BACKDROP: Gelap + Blur */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>

            {/* KONTEN MODAL */}
            <div className={`
                relative bg-white 
                ${sizeClasses[size]} 
                rounded-xl shadow-2xl flex flex-col 
                overflow-hidden animate-in zoom-in-95 duration-200
                border border-gray-200
            `}>
                
                {/* HEADER (Sticky) */}
                {title && (
                    <div className="bg-[#990000] text-white px-6 py-4 flex justify-between items-center shrink-0 z-10">
                        <div>
                            <h2 className="text-xl font-bold">{title}</h2>
                            {subTitle && <p className="text-xs text-red-100 mt-1">{subTitle}</p>}
                        </div>
                        <button 
                            onClick={onClose} 
                            className="hover:bg-white/20 p-2 rounded-full transition-colors focus:outline-none"
                            title="Tutup Modal"
                            aria-label="Tutup Modal"
                        >
                            <X size={24}/>
                        </button>
                    </div>
                )}

                {/* BODY (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 custom-scrollbar relative">
                    {children}
                </div>

                {/* FOOTER (Sticky) */}
                {footer && (
                    <div className="bg-white border-t p-4 flex justify-end gap-3 shrink-0 z-10">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}