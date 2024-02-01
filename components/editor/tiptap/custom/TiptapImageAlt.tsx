import { NodeViewProps } from '@tiptap/react';

// tiptap 첨부한 이미지에 사용자가 img alt 직접 설정 기능
function TiptapImageAlt(props: NodeViewProps) {
	const { alt } = props.node.attrs;

	const { updateAttributes } = props;

	const onEditAlt = () => {
		const newAlt = prompt('이미지를 설명을 입력해주세요:', (alt as string) || '');
		updateAttributes({ alt: newAlt });
	};

	return (
		<span className="absolute px-2 bg-white bg-opacity-50 bottom-3 left-3">
			{alt ? (
				<span className="mr-1 text-lg font-bold ">✔</span>
			) : (
				<span className="mr-1 text-lg font-bold text-red-600">!</span>
			)}
			{alt ? (
				<span className="text">
					"{alt}"
					<button className="ml-2 underline cursor-pointer" type="button" onClick={onEditAlt}>
						Edit
					</button>
				</span>
			) : (
				<span className="text">
					이미지를 설명해주세요
					<button className="ml-2 underline cursor-pointer" type="button" onClick={onEditAlt}>
						Edit
					</button>
				</span>
			)}
		</span>
	);
}

export default TiptapImageAlt;
