import { useCurrentEditor } from "@tiptap/react";
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

export const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

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
      name: "Quote",
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
    <div className="flex items-center gap-x-5 p-3 border border-dashed border-that-grey rounded-lg mb-5">
      {tools.map((tool) => (
        <button
          key={tool.name}
          className={`w-8 h-8 text-xl ${editor.isActive(
            tool.name.toLowerCase() && "border border-dashed border-that-grey"
          )}`}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};
