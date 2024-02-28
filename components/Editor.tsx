import {
  BubbleMenu,
  EditorProvider,
  ReactNodeViewRenderer,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import elixir from "highlight.js/lib/languages/elixir";
import CodeBlock from "./CodeBlock";
import BlockQuote from "@tiptap/extension-blockquote";
import TextSelectMenu from "./TextSelectMenu";

const lowlight = createLowlight();

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("elixir", elixir);

export const Editor = () => {
  const extensions = [
    StarterKit,
    CodeBlockLowlight.extend({
      addNodeView() {
        return ReactNodeViewRenderer(CodeBlock);
      },
    }).configure({ lowlight }),
    BlockQuote,
  ];

  const { editor } = useCurrentEditor();

  return (
    <div className="mt-10">
      <>
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          content={"<p>Start here!</p>"}
          onUpdate={({ editor }) => {
            console.log(editor.getHTML());
          }}
        >
          <BubbleMenu>
            {editor?.isActive("text") && <TextSelectMenu />}
          </BubbleMenu>
        </EditorProvider>
      </>
    </div>
  );
};
