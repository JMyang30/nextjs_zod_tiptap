'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Youtube from '@tiptap/extension-youtube';
import CharacterCount from '@tiptap/extension-character-count';

import CustomImage from './custom/TiptapCustomImage';

import Toolbar from './Toolbar';

import { dragAndDropImage } from './custom/ImageDragDropHandler';

type Props = {
	description: string;
	onChange: (text: string) => void;
};

const limit = 300;

function Tiptap({ description, onChange }: Props) {
	const Texteditor = useEditor({
		extensions: [
			StarterKit.configure(),
			Youtube.configure({
				inline: false,
				allowFullscreen: false,
			}),
			CharacterCount.configure({ limit }),
			CustomImage,
		],
		content: description,
		editorProps: {
			attributes: {
				class: 'rounded-md border min-h-[150px] border-input p-3',
			},
			handleDrop: dragAndDropImage, // tiptap 이미지 drag and drop 기능 추가
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
	});

	return (
		<>
			<Toolbar editor={Texteditor} />
			<article className="prose">
				<EditorContent editor={Texteditor} />
				<br />

				{`${Texteditor?.storage.characterCount.characters()}/${limit}`}
			</article>
		</>
	);
}

export default Tiptap;
