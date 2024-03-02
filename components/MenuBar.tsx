import { BiCodeBlock } from "react-icons/bi";
import { BsCode, BsImage } from "react-icons/bs";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdOutlineTextFields,
  MdStrikethroughS,
} from "react-icons/md";
import { TbDivide } from "react-icons/tb";
import type { Editor } from "@tiptap/react";
import Tippy from "@tippyjs/react";

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const tools = [
    {
      name: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      icon: <MdFormatBold />,
    },
    {
      name: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      icon: <MdFormatItalic />,
    },
    {
      name: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      icon: <MdStrikethroughS />,
    },
    {
      name: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      icon: <BsCode />,
    },
    {
      name: "Text",
      action: () => editor.chain().focus().setParagraph().run(),
      icon: <MdOutlineTextFields />,
    },
    {
      name: "Image",
      action: () => {},
      icon: <BsImage />,
    },
    {
      name: "Bullet list",
      action: () => editor.chain().focus().toggleBulletList().run(),
      icon: <MdFormatListBulleted />,
    },
    {
      name: "Numbered list",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      icon: <MdFormatListNumbered />,
    },
    {
      name: "Code block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      icon: <BiCodeBlock />,
    },
    {
      name: "BlockQuote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      icon: <MdFormatQuote />,
    },
    {
      name: "Divider",
      action: () => editor.chain().focus().setHorizontalRule().run(),
      icon: <TbDivide />,
    },
  ];

  return (
    <div className="flex items-center gap-x-5 p-3 border border-dashed border-that-grey mb-5 sticky top-0 bg-black z-10">
      {tools.map((tool) => (
        <Tippy key={tool.name} content={tool.name} delay={1000}>
          <button
            className={`w-8 h-8 text-xl flex items-center justify-center ${
              editor.isActive(
                tool.name.includes(" ")
                  ? tool.name
                      .split(" ")
                      .map((word, index) =>
                        index === 0
                          ? word.toLowerCase()
                          : word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                      )
                      .join("")
                  : tool.name.toLowerCase()
              )
                ? "border border-dashed border-that-grey"
                : ""
            }`}
            onClick={tool.action}
          >
            {tool.icon}
          </button>
        </Tippy>
      ))}
    </div>
  );
};
