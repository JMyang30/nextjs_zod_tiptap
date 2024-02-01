'use client';

import { Bold, Strikethrough, Italic, List, ListOrdered, Heading1, Youtube, Image as ImageIcon } from 'lucide-react';

import type { Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { Toggle } from '@/components/ui/toggle';

type Props = {
	editor: Editor | null;
};
function Toolbar({ editor }: Props) {
	// youtube 영상 업로드 기능
	const setYoutube = useCallback(() => {
		const url = prompt('enter your youtube url');

		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor?.chain().focus().extendMarkRange('youtube').clearContent().run();
			return;
		}

		editor?.commands.setYoutubeVideo({
			src: url,
			width: 320,
			height: 240,
		});
	}, [editor]);

	if (!editor) {
		return null;
	}

	const addImage = () => {
		const url = window.prompt('URL');

		if (url) {
			editor?.chain().focus().setImage({ src: url }).run();
		}
	};

	return (
		<div>
			<Toggle
				pressed={editor.isActive('heading')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			>
				<Heading1 className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('bold')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('strikethrough')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('italic')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('bulletList')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
			>
				<List className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('orderedList')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ListOrdered className="w-4 h-4" />
			</Toggle>
			<Toggle pressed={editor.isActive('youtube')} size="sm" onPressedChange={() => setYoutube()}>
				<Youtube className="w-4 h-4" />
			</Toggle>
			<Toggle pressed={editor.isActive('image')} size="sm" onPressedChange={() => addImage()}>
				<ImageIcon className="w-4 h-4" />
				{/* <input type="file" className="hidden" id="upload" onChange={handleChange} /> */}
			</Toggle>
		</div>
	);
}

export default Toolbar;
