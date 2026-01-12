// 'use client';

// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css'; // Import style default Quill

// // Import ReactQuill secara dynamic agar tidak error saat SSR
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// interface RichEditorProps {
//     value: string;
//     onChange: (value: string) => void;
//     placeholder?: string;
// }

// export default function RichEditor({ value, onChange, placeholder }: RichEditorProps) {
    
//     // Konfigurasi Toolbar (Menu-menu di atas editor)
//     const modules = {
//         toolbar: [
//             [{ 'header': [1, 2, 3, false] }],
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//             [{ 'color': [] }, { 'background': [] }],
//             [{ 'align': [] }],
//             ['link', 'image'],
//             ['clean'] // Tombol hapus format
//         ],
//     };

//     const formats = [
//         'header',
//         'bold', 'italic', 'underline', 'strike', 'blockquote',
//         'list', 'bullet', 'indent',
//         'link', 'image', 'color', 'background', 'align'
//     ];

//     return (
//         <div className="bg-white">
//             <style jsx global>{`
//                 .ql-container {
//                     min-height: 300px;
//                     font-size: 16px;
//                     border-bottom-left-radius: 0.5rem;
//                     border-bottom-right-radius: 0.5rem;
//                 }
//                 .ql-toolbar {
//                     border-top-left-radius: 0.5rem;
//                     border-top-right-radius: 0.5rem;
//                     background-color: #f9fafb;
//                 }
//                 .ql-editor {
//                     min-height: 300px;
//                 }
//             `}</style>
//             <ReactQuill 
//                 theme="snow"
//                 value={value}
//                 onChange={onChange}
//                 modules={modules}
//                 formats={formats}
//                 placeholder={placeholder || 'Tulis sesuatu...'}
//                 className="rounded-lg"
//             />
//         </div>
//     );
// }
'use client';

import dynamic from 'next/dynamic';
// Import CSS bawaan Quill (Wajib)
import 'react-quill/dist/quill.snow.css';

// Import Dynamic untuk menghindari error SSR Next.js
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichEditor({ value, onChange, placeholder }: RichEditorProps) {
    
    // 1. Konfigurasi Toolbar
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            // [FIX] Tambahkan 'video' di sini bersama link dan image
            ['link', 'image', 'video'], 
            ['clean']
        ],
    };

    // 2. Konfigurasi Format yang diizinkan
    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 
        'link', 'image', 'video', // [FIX] Tambahkan 'video' agar tidak hilang saat disimpan
        'color', 'background', 'align'
    ];

    return (
        <div className="bg-white">
             {/* Custom CSS untuk tinggi editor & Responsif Video */}
            <style jsx global>{`
                .ql-container { 
                    min-height: 300px; 
                    font-size: 16px; 
                    border-bottom-left-radius: 0.5rem; 
                    border-bottom-right-radius: 0.5rem; 
                }
                .ql-toolbar { 
                    border-top-left-radius: 0.5rem; 
                    border-top-right-radius: 0.5rem; 
                    background-color: #f9fafb; 
                }
                /* [FIX] CSS agar Video Responsif & Tidak Kekecilan */
                .ql-editor iframe.ql-video {
                    display: block;
                    margin: 10px auto;
                    width: 100%;
                    max-width: 100%;
                    height: 400px; /* Tinggi default video */
                    border-radius: 8px;
                }
                /* Di Mobile, kurangi tingginya */
                @media (max-width: 640px) {
                    .ql-editor iframe.ql-video {
                        height: 250px;
                    }
                }
            `}</style>

            <ReactQuill 
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder || 'Tulis sesuatu...'}
                className="rounded-lg"
            />
        </div>
    );
}