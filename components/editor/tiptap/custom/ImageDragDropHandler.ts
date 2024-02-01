import type { EditorView } from '@tiptap/pm/view';
import type { Slice } from '@tiptap/pm/model';

// 이미지 서버 업로드, 업로드된 파일 리턴
const uploadImage = async (file: File): Promise<string> => {
	try {
		// 이미지를 서버에 업로드하고, 업로드된 이미지의 URL을 반환
		const response = await Promise.resolve(
			'https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004',
		);
		return response;
	} catch (error) {
		console.error('이미지 업로드 실패', error);
		throw error;
	}
};

// 파일 타입, 이미지 사이즈 체크
const isValidImage = (file: File): boolean => {
	const filesize: number = file.size / (1024 * 1024); // 이미지 사이즈(MB)

	return (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') && filesize < 10;
};

// tiptap 에디터 이미지 삽입
const handleImageDrop = (view: EditorView, event: DragEvent, response: string, file: File) => {
	const image = new Image();

	// 이미지 미리보기 기능 추가 필요

	image.src = response;
	image.onload = () => {
		const { schema } = view.state;
		const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
		const node = schema.nodes.image.create({ src: response });
		const transaction = view.state.tr.insert(coordinates!.pos, node);
		view.dispatch(transaction);
	};
};

// input type file 첨부된 이미지 tiptap 에디터 삽입
const inputTypeFileAttach = (): boolean | void => {};

// 이미지 파일 에디터에 드래그 드랍 지원
// Promise<boolean> 리턴값 사용시 type 오류
const dragAndDropImage = (view: EditorView, event: DragEvent, slice: Slice, moved: boolean): boolean | void => {
	if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
		const file: File = event.dataTransfer.files[0];

		if (isValidImage(file)) {
			uploadImage(file)
				.then((response) => {
					// 이미지 로딩 및 삽입
					// response = 이미지 db 수신 url
					handleImageDrop(view, event, response, file);
				})
				.catch((error) => {
					alert('이미지 업로드 중 오류가 발생했습니다.');
					console.error(error);
				});
		} else {
			alert('jpg 또는 png 형식의 이미지 중 크기가 10MB 이하인 이미지만 업로드 가능합니다.');
		}
		return true; // 핸들링
	}

	return false; // 기본 동작 사용
};

export { dragAndDropImage, uploadImage, isValidImage, inputTypeFileAttach };
