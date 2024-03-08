import {
  BubbleMenu,
  EditorContent,
  ReactNodeViewRenderer,
  useEditor,
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
import Highlight from "@tiptap/extension-highlight";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import { useEditorContent } from "@/store/useEditorContent";
import { useDebouncedCallback } from "use-debounce";

const lowlight = createLowlight();

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("elixir", elixir);

export const Editor = ({
  isPostPublished,
  autoSave,
}: {
  isPostPublished: boolean;
  autoSave: (content: string) => void;
}) => {
  const extensions = [
    StarterKit,
    CodeBlockLowlight.extend({
      addNodeView() {
        return ReactNodeViewRenderer(CodeBlock);
      },
    }).configure({ lowlight }),
    BlockQuote,
    Highlight,
    Code,
    Link.configure({
      openOnClick: false,
      autolink: true,
      linkOnPaste: true,
    }),
  ];

  const { setContent } = useEditorContent();

  const debouncedAutoSave = useDebouncedCallback((content: string) => {
    setContent(editor?.getHTML()!);
    autoSave(content);
  }, 1000);

  const editor = useEditor({
    extensions,
    content: "<p>Hey, babe!</p>",
    onUpdate: () => !isPostPublished && debouncedAutoSave(editor?.getHTML()!),
  });

  if (!editor) {
    return <div className="">Loading editor...</div>;
  }

  return (
    <div className="mt-10">
      <>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        <BubbleMenu editor={editor!}>
          {editor.isActive("link") ? (
            // <LinkSelectMenu editor={editor} />
            <div className=""></div>
          ) : editor.isActive("image") ? (
            // <ImageSelectMenu editor={editor} />
            <div className=""></div>
          ) : (
            <TextSelectMenu editor={editor} />
          )}
        </BubbleMenu>
      </>
    </div>
  );
};
