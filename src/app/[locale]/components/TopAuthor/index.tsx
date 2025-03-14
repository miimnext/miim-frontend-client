import React from "react";

const TopAuthor = () => {
  const topics = [
    {
      id: 1,
      title: "wajue ji1",
    },
    {
      id: 2,
      title: "wajue ji2",
    },
    {
      id: 3,
      title: "wajue ji3",
    },
    {
      id: 4,
      title: "wajue ji3",
    },
    {
      id: 5,
      title: "wajue ji3",
    },
  ];

  return (
    <div className="w-full   rounded-lg shadow-md mt-4 ">
      <h2 className="text-xl font-bold p-2 pb-0">TopAuthor </h2>
      <ul className="list-none px-2">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="p-2 rounded-lg shadow-sm cursor-pointer hover:text-blue-600"
          >
            <span className="text-md font-semibold">{topic.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAuthor;
