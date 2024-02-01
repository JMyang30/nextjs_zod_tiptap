import { NodeViewWrapper, type NodeViewProps, ReactNodeViewRenderer } from '@tiptap/react';

import Image from '@tiptap/extension-image';

import { useRef, useState } from 'react';

import TiptapImageAlt from './TiptapImageAlt';
import TiptapImageResize from './TiptapImageResize';

function TiptapCustomImage(props: NodeViewProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [editing, setEditing] = useState(false);

	return (
		<NodeViewWrapper
			ref={containerRef}
			as="div"
			draggable
			data-drag-handle
			onClick={() => setEditing(true)}
			onBlur={() => setEditing(false)}
			style={{
				overflow: 'hidden',
				position: 'relative',
				display: 'inline-block',
				// lineheight 0 해제시 레이아웃 오류 왜인지는 모름
				lineHeight: '0px',
			}}
		>
			<TiptapImageAlt {...props} />
			<TiptapImageResize {...props} editing={editing} setEditing={setEditing} containerRef={containerRef} />
		</NodeViewWrapper>
	);
}

export default Image.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			width: { renderHTML: ({ width }: { width: string }) => ({ width }) },
			height: { renderHTML: ({ height }: { height: string }) => ({ height }) },
		};
	},
	addNodeView() {
		return ReactNodeViewRenderer(TiptapCustomImage);
	},
}).configure({ inline: true });
