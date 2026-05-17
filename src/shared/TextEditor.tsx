// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";

// function ProductEditor({ value, onChange }:{{ value:string, onChange:(value:string)=>void }}) {
// 	const editor = useEditor({
// 		extensions: [StarterKit, Link, Image],
// 		content: value,
// 		onUpdate: ({ editor }) => {
// 			onChange(editor.getHTML());
// 		},
// 	});

// 	if (!editor) return null;

// 	return (
// 		<div>
// 			<div>
// 				<button onClick={() => editor.chain().focus().toggleBold().run()}>
// 					Bold
// 				</button>

// 				<button onClick={() => editor.chain().focus().toggleItalic().run()}>
// 					Italic
// 				</button>

// 				<button onClick={() => editor.chain().focus().toggleBulletList().run()}>
// 					List
// 				</button>
// 			</div>

// 			<EditorContent editor={editor} />
// 		</div>
// 	);
// }

// export default ProductEditor;
