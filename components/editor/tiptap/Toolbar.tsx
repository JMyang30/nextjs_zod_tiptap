'use client';

import type { Editor } from '@tiptap/react';
import LucideIcon from '@/components/icons/LucideIcon';

import { Toggle } from '@/components/ui/toggle';

import useCustomToolbar from './custom/useTiptapCustomToolbar';

function Toolbar({ editor }: { editor: Editor }) {
	const { addImage, addInputImage, setYoutube } = useCustomToolbar({ editor });

	if (!editor) return null;

	return (
		<div className="flex items-center">
			<Toggle
				pressed={editor.isActive('heading')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			>
				<LucideIcon name="Heading1" className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('bold')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
			>
				<LucideIcon name="Bold" size={10} className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('strikethrough')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleStrike().run()}
			>
				<LucideIcon name="Strikethrough" className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('italic')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
			>
				<LucideIcon name="Italic" className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('bulletList')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
			>
				<LucideIcon name="List" className="w-4 h-4" />
			</Toggle>
			<Toggle
				pressed={editor.isActive('orderedList')}
				size="sm"
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<LucideIcon name="ListOrdered" className="w-4 h-4" />
			</Toggle>
			<Toggle pressed={editor.isActive('youtube')} size="sm" onPressedChange={() => setYoutube()}>
				<LucideIcon name="Youtube" className="w-4 h-4" />
			</Toggle>
			<Toggle pressed={editor.isActive('image')} size="sm" onPressedChange={() => addImage()}>
				<LucideIcon name="Image" className="w-4 h-4" />
			</Toggle>
			<span className="inline-flex items-center justify-center w-6 ">
				<input
					type="color"
					className="w-full bg-white"
					onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
						editor.chain().focus().setColor(event.target.value).run()
					}
					data-testid="setColor"
					value={editor?.getAttributes('textStyle').color as string}
				/>
			</span>
			<span className="inline-flex items-center justify-center w-6 ">
				<input id="imgFile" className="hidden" type="file" onChange={(e) => addInputImage(e)} />
				<label htmlFor="imgFile">
					<LucideIcon name="File" className="w-4 h-4" />
				</label>
			</span>
		</div>
	);
}

export default Toolbar;
