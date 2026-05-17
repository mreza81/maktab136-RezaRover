"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

type Props = {
	value: string;
	onChange: (value: string) => void;
};

function ProductEditor({ value, onChange }: Props) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({ openOnClick: false }),
			Image,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	if (!editor) return null;

	// 👉 handler برای افزودن لینک
	const setLink = () => {
		const prevUrl = editor.getAttributes("link").href;
		const url = window.prompt("لینک مورد نظر را وارد کنید:", prevUrl);

		if (url === null) return;
		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}
		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};

	// 👉 handler برای افزودن عکس
	const addImage = () => {
		const url = window.prompt("آدرس تصویر را وارد کنید:");
		if (url) editor.chain().focus().setImage({ src: url }).run();
	};

	return (
		<div className="bg-[#1b263b] rounded-md p-3 border border-gray-700 space-y-3 text-sm">
			{/* 🧰 Toolbar */}
			<div className="flex flex-wrap gap-2 border-b border-gray-600 pb-2 mb-2">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className="btn-editor"
				>
					<b>B</b>
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className="btn-editor italic"
				>
					I
				</button>
				<button
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className="btn-editor underline"
				>
					U
				</button>

				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className="btn-editor"
				>
					H1
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className="btn-editor"
				>
					H2
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className="btn-editor"
				>
					H3
				</button>

				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className="btn-editor"
				>
					• List
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className="btn-editor"
				>
					1. List
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className="btn-editor"
				>
					❝ Quote
				</button>

				<button onClick={setLink} className="btn-editor">
					🔗 Link
				</button>
				<button onClick={addImage} className="btn-editor">
					🖼 Image
				</button>

				<button
					onClick={() => editor.chain().focus().undo().run()}
					className="btn-editor"
				>
					↶ Undo
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					className="btn-editor"
				>
					↷ Redo
				</button>
			</div>

			{/* ✍️ Editor Area */}
			<EditorContent
				editor={editor}
				className="min-h-37.5 p-3 bg-[#0d1b2a] rounded-md prose prose-invert focus:outline-none"
			/>

			<style jsx>{`
				.btn-editor {
					background: #2f3c55;
					color: #fff;
					padding: 5px 10px;
					border-radius: 6px;
					cursor: pointer;
					transition: background 0.2s;
				}
				.btn-editor:hover {
					background: #3f5376;
				}
			`}</style>
		</div>
	);
}

export default ProductEditor;
