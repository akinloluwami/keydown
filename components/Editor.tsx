import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";

export const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });

  return (
    <div className="">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="p-3 border border-dashed border-that-grey rounded-lg"
      />
    </div>
  );
};
