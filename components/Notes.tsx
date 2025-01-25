'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { v4 as uuidv4 } from 'uuid';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline as UnderlineIcon,
  Quote,
  Undo,
  Redo,
  Code,
} from 'lucide-react';

const Toolbar = ({ editor, content }: { editor: Editor | null; content: string }) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
      gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive('bold')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400'
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive('italic')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400'
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive('underline')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400'
          }
        >
          <UnderlineIcon className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive('strike')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400'
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive('heading', { level: 2 })
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400'
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive('bulletList')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400'
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive('orderedList')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400'
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive('blockquote')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400'
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive('code')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400'
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive('undo')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg'
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive('redo')
              ? 'bg-sky-700 text-white p-2 rounded-lg'
              : 'text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg'
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          'flex flex-col px-20 py-20 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-24 mt-10">
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} className='' />
    </div>
  );
};



const Todo = () => {
  const [content, setContent] = useState<string>('');
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      id: uuidv4(),
      content: content,
    };
    console.log(data);
    const existingDataString = localStorage.getItem('myData');
    const existingData = existingDataString ? JSON.parse(existingDataString) : [];
    const updatedData = [...existingData, data];
    localStorage.setItem('myData', JSON.stringify(updatedData));
    setContent('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full grid place-items-center mx-auto pt-10 mb-10"
    >
      <Tiptap content={content} onChange={(newContent: string) => handleContentChange(newContent)} />
    </form>
  );
};

export default Todo;
