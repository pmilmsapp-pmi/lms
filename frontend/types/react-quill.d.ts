declare module 'react-quill' {
    import React from 'react';
    interface ReactQuillProps {
        theme?: string;
        modules?: any;
        formats?: string[];
        value?: string;
        onChange?: (content: string, delta: any, source: any, editor: any) => void;
        placeholder?: string;
        className?: string;
        [key: string]: any;
    }
    export default class ReactQuill extends React.Component<ReactQuillProps> {}
}