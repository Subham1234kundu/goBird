"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { CodeBlock } from '@tiptap/extension-code-block';
import { useEffect, useState, useRef } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
}

export default function RichTextEditor({
    content,
    onChange,
    placeholder = "Begin writing here...",
    disabled = false,
    maxLength = 8000
}: RichTextEditorProps) {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    // const [imageFile, setImageFile] = useState<File | null>(null); // Removed unused
    const [imagePreview, setImagePreview] = useState<string>('');
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5],
                },
                codeBlock: false,
            }),
            Placeholder.configure({
                placeholder,
            }),
            TextStyle,
            Color,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                },
            }),
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'bg-gray-100 rounded p-2 font-mono text-sm',
                },
            }),
        ],
        content,
        editable: !disabled,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    useEffect(() => {
        if (editor) {
            editor.setEditable(!disabled);
        }
    }, [disabled, editor]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!editor) {
        return null;
    }

    const currentLength = editor.getText().length;

    const colors = [
        '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
        '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB'
    ];

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            // setImageFile(file); // Removed unused
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addImage = () => {
        if (imagePreview) {
            editor.chain().focus().setImage({ src: imagePreview }).run();
            // setImageFile(null); // Removed unused
            setImagePreview('');
            setShowImageDialog(false);
        }
    };

    const setLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className="border border-[#3B82F6] rounded-lg overflow-hidden h-[calc(100vh-120px)] flex flex-col relative">
            {/* Toolbar */}
            <div className="bg-[#F9FAFB] border-b border-[#E4E4E4] px-4 py-2 flex items-center gap-2 flex-wrap">
                {/* Undo/Redo */}
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo() || disabled}
                    className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                    title="Undo"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 8h10M8 3l-5 5 5 5" />
                    </svg>
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo() || disabled}
                    className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                    title="Redo"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M13 8H3M8 3l5 5-5 5" />
                    </svg>
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                {/* Text Color */}
                <div className="relative" ref={colorPickerRef}>
                    <button
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        disabled={disabled}
                        className="p-1.5 hover:bg-gray-200 rounded flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                        title="Text Color"
                    >
                        <div className="w-4 h-4 rounded-sm border border-gray-300" style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000000' }}></div>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M6 8L3 5h6l-3 3z" />
                        </svg>
                    </button>
                    {showColorPicker && (
                        <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg z-50 grid grid-cols-5 gap-1">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => {
                                        editor.chain().focus().setColor(color).run();
                                        setShowColorPicker(false);
                                    }}
                                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                                    style={{ backgroundColor: color }}
                                    type="button"
                                    title={color}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                {/* Bold, Italic, Strikethrough */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={disabled}
                    className={`p-1.5 hover:bg-gray-200 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('bold') ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Bold"
                >
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={disabled}
                    className={`p-1.5 hover:bg-gray-200 rounded italic disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('italic') ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Italic"
                >
                    I
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={disabled}
                    className={`p-1.5 hover:bg-gray-200 rounded line-through disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('strike') ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Strikethrough"
                >
                    S
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                {/* Headings */}
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    disabled={disabled}
                    className={`px-2 py-1 hover:bg-gray-200 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Heading 1"
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    disabled={disabled}
                    className={`px-2 py-1 hover:bg-gray-200 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Heading 2"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    disabled={disabled}
                    className={`px-2 py-1 hover:bg-gray-200 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Heading 3"
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    disabled={disabled}
                    className={`px-2 py-1 hover:bg-gray-200 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 4 }) ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Heading 4"
                >
                    H4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    disabled={disabled}
                    className={`px-2 py-1 hover:bg-gray-200 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('heading', { level: 5 }) ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Heading 5"
                >
                    H5
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                {/* Lists */}
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    disabled={disabled}
                    className={`p-1.5 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('bulletList') ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Bullet List"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="3" cy="4" r="1" />
                        <circle cx="3" cy="8" r="1" />
                        <circle cx="3" cy="12" r="1" />
                        <path d="M6 3.5h8v1H6v-1zm0 4h8v1H6v-1zm0 4h8v1H6v-1z" />
                    </svg>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    disabled={disabled}
                    className={`p-1.5 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('orderedList') ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Numbered List"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M2 3.5h2v1H2v-1zm0 4h2v1H2v-1zm0 4h2v1H2v-1zM6 3.5h8v1H6v-1zm0 4h8v1H6v-1zm0 4h8v1H6v-1z" />
                    </svg>
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                {/* Link, Code Block, Image */}
                <button
                    onClick={setLink}
                    disabled={disabled}
                    className={`p-1.5 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('link') ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Add Link"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M7 9l2-2m-4 0l1-1a2 2 0 012.828 0l1 1m-1 1l-1 1a2 2 0 01-2.828 0l-1-1" />
                    </svg>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    disabled={disabled}
                    className={`p-1.5 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed ${editor.isActive('codeBlock') ? 'bg-gray-300' : ''
                        }`}
                    type="button"
                    title="Code Block"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 11l-3-3 3-3m6 6l3-3-3-3" stroke="currentColor" fill="none" strokeWidth="1.5" />
                    </svg>
                </button>
                <button
                    onClick={() => setShowImageDialog(true)}
                    disabled={disabled}
                    className="p-1.5 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                    title="Add Image"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="3" width="12" height="10" rx="1" />
                        <circle cx="5.5" cy="6.5" r="1" />
                        <path d="M2 11l3-3 2 2 4-4 3 3" />
                    </svg>
                </button>

            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-6 relative">
                <EditorContent
                    editor={editor}
                    className="prose prose-sm max-w-none focus:outline-none"
                />
                <div className="absolute bottom-4 right-8 text-xs text-[#9CA3AF]">
                    {currentLength}/{maxLength}
                </div>
            </div>

            {/* Image Dialog */}
            {showImageDialog && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Insert Image</h3>

                        {/* File Upload Area */}
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 cursor-pointer hover:border-[#FE4B00] transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                            {imagePreview ? (
                                <div className="relative w-full h-32">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-contain rounded"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowImageDialog(false);
                                    // setImageFile(null); // Removed unused
                                    setImagePreview('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addImage}
                                disabled={!imagePreview}
                                className="px-4 py-2 bg-[#FE4B00] text-white rounded hover:bg-[#E54300] disabled:opacity-50 disabled:cursor-not-allowed"
                                type="button"
                            >
                                Insert
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .ProseMirror {
                    min-height: 100%;
                    outline: none;
                }

                .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #9CA3AF;
                    pointer-events: none;
                    height: 0;
                }

                .ProseMirror h1 {
                    font-size: 2em;
                    font-weight: bold;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                .ProseMirror h2 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                .ProseMirror h3 {
                    font-size: 1.25em;
                    font-weight: bold;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                .ProseMirror h4 {
                    font-size: 1.1em;
                    font-weight: bold;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                .ProseMirror h5 {
                    font-size: 1em;
                    font-weight: bold;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }

                .ProseMirror ul,
                .ProseMirror ol {
                    padding-left: 1.5em;
                    margin: 0.5em 0;
                }

                .ProseMirror p {
                    margin: 0.5em 0;
                }

                .ProseMirror strong {
                    font-weight: bold;
                }

                .ProseMirror em {
                    font-style: italic;
                }

                .ProseMirror s {
                    text-decoration: line-through;
                }

                .ProseMirror a {
                    color: #2563eb;
                    text-decoration: underline;
                    cursor: pointer;
                }

                .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.25rem;
                    margin: 0.5em 0;
                }

                .ProseMirror pre {
                    background: #f3f4f6;
                    border-radius: 0.25rem;
                    padding: 0.5rem;
                    font-family: 'Courier New', monospace;
                    font-size: 0.875rem;
                    overflow-x: auto;
                }

                .ProseMirror code {
                    background: #f3f4f6;
                    border-radius: 0.25rem;
                    padding: 0.125rem 0.25rem;
                    font-family: 'Courier New', monospace;
                    font-size: 0.875rem;
                }
            `}</style>
        </div>
    );
}
