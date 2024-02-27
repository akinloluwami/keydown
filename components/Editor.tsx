import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";

export const Editor = () => {
  const extensions = [StarterKit];

  return (
    <div className="">
      <>
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          content={"<p>Start here!</p>"}
          onUpdate={({ editor }) => {
            console.log(editor.getHTML());
          }}
        >
          <></>
        </EditorProvider>
      </>
    </div>
  );
};
