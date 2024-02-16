'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Youtube from '@tiptap/extension-youtube';
import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
// import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';

import { useState } from 'react';
import CustomImage from './custom/TiptapCustomImage';

import Toolbar from './Toolbar';

import { dragAndDropImage } from './custom/ImageDragDropHandler';

export interface TiptapEditor extends Editor {
	storage: {
		characterCount: {
			characters: () => number;
		};
	};
}

type Props = {
	description: string;
	onChange: (text: string) => void;
};

const limit = 300;

function Tiptap({ description, onChange }: Props) {
	const [editable, setEditable] = useState(false);

	const Texteditor = useEditor({
		extensions: [
			StarterKit.configure(),
			Youtube.configure({
				inline: false,
				allowFullscreen: false,
			}),
			CharacterCount.configure({ limit }),
			CustomImage,
			Color,
			TextStyle,
			// Text,
		],
		editable: !editable,
		content: description,
		editorProps: {
			attributes: {
				class: 'rounded-md border w-full min-h-[250px] border-input p-3 max-h-[300px] overflow-y-scroll',
			},
			handleDrop: (v, e, s, m) => {
				dragAndDropImage(v, e, s, m, setEditable);
			}, // tiptap 이미지 drag and drop 기능 추가
			handlePaste: () => {},
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
	}) as TiptapEditor;

	// Texteditor?.setEditable(!editable);

	return (
		<>
			<Toolbar editor={Texteditor} />
			<article className="prose ">
				<EditorContent readOnly editor={Texteditor} />
				<br />
				{`${Texteditor?.storage.characterCount.characters()}/${limit}`}
			</article>
		</>
	);
}

export default Tiptap;
