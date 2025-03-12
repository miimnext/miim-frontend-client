import React from "react";
import {
  FaBold,
  FaItalic,
  FaHeading,
  FaLink,
  FaImage,
  FaCode,
  FaList,
  FaQuoteRight,
} from "react-icons/fa"; // Importing icons from react-icons

type MarkdownToolbarProps = {
  insertText: (before: string, after: string, moveToNewLine?: boolean) => void;
};

const MarkdownToolbar = ({ insertText }: MarkdownToolbarProps) => {
  const toolbarButtons = [
    {
      label: <FaBold />,
      action: () => insertText("**", "**"),
      tooltip: "Bold",
    },
    {
      label: <FaItalic />,
      action: () => insertText("*", "*"),
      tooltip: "Italic",
    },
    {
      label: <FaHeading />,
      action: () => insertText("# ", " "),
      tooltip: "Heading 1",
    },
    {
      label: <FaLink />,
      action: () => insertText("[链接文字](", ")"),
      tooltip: "Link",
    },
    {
      label: <FaImage />,
      action: () => insertText("![图片描述](", ")"),
      tooltip: "Image",
    },
    {
      label: <FaCode />,
      action: () => insertText("```\n", "\n```"),
      tooltip: "Code Block",
    },
    { label: <FaList />, action: () => insertText("- ", " "), tooltip: "List" },
    {
      label: <FaQuoteRight />,
      action: () => insertText("> ", " "),
      tooltip: "Quote",
    },
  ];

  return (
    <div className="flex justify-around items-center  p-2 bg-gray-200  shadow-md">
      {toolbarButtons.map((button, index) => (
        <button
          key={index}
          className="relative group p-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-200 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          onClick={button.action}
          aria-label={button.tooltip}
        >
          {button.label}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 dark:text-gray-300">
            {button.tooltip}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MarkdownToolbar;
