import React from "react";

type TextTattooProps = {
  id: number;
  title: string;
  description: string;
};

export default function TextTattoo({ textObj }: { textObj: TextTattooProps }) {
  // Chia mô tả thành một mảng các dòng
  const descriptionLines = textObj.description
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <>
      <div className="w-full pb-14">
        <h2 className="mb-2 text-center text-2xl font-bold text-white md:text-left md:text-3xl lg:text-left lg:text-4xl ">
          {textObj.title}
        </h2>
        <ul className="list-disc pl-8">
          {descriptionLines.map((line, index) => (
            <li
              key={index}
              className="text-left text-base text-tattoo-gray md:text-xl lg:text-xl"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
