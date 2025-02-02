import React, { forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const QuillEditor = forwardRef<ReactQuill, QuillEditorProps>(
  ({ value, onChange, className }, ref) => {
    const modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean']
      ]
    };

    return (
      <div className={className}>
        <ReactQuill
          ref={ref}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          preserveWhitespace
        />
      </div>
    );
  }
);

QuillEditor.displayName = 'QuillEditor';