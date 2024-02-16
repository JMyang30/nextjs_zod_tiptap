import type { Editor } from '@tiptap/react';
import { useCallback } from 'react';
import { isValidImage } from './ImageDragDropHandler';

const useCustomToolbar = ({ editor }: { editor: Editor }) => {
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

	const addImage = useCallback(() => {
		const url = window.prompt('URL');

		if (url) {
			editor?.chain().focus().setImage({ src: url }).run();
		}
	}, [editor]);

	const addInputImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e?.currentTarget.files?.[0] as File;

			const validImage = isValidImage(file);
			if (validImage) {
				const url = URL.createObjectURL(file);

				editor?.chain().focus().setImage({ src: url }).run();
			}
		},
		[editor],
	);

	return { setYoutube, addImage, addInputImage };
};

export default useCustomToolbar;
