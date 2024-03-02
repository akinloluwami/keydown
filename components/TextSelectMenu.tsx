import { useCallback } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdLink,
  MdOutlineStrikethroughS,
} from "react-icons/md";
import { FaCode, FaHighlighter } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const TextSelectMenu = ({ editor }: any) => {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const tools = [
    {
      text: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      icon: <MdFormatBold />,
    },
    {
      text: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      icon: <MdFormatItalic />,
    },
    {
      text: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      icon: <MdOutlineStrikethroughS />,
    },
    {
      text: "Link",
      action: setLink,
      icon: <MdLink />,
    },
    {
      text: "Highlight",
      action: () => editor.chain().focus().toggleHighlight().run(),
      icon: <FaHighlighter />,
    },
    {
      text: "Inline code",
      action: () => editor.chain().focus().toggleCode().run(),
      icon: <FaCode />,
    },
  ];

  return (
    <div>
      {tools.map((tool, i) => (
        <Tippy content={tool?.text} key={i}>
          <button onClick={tool.action}>{tool.icon}</button>
        </Tippy>
      ))}
    </div>
  );
};

export default TextSelectMenu;
