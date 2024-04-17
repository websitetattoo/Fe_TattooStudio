import React from "react";

type TextTattooProps = {
  title: string;
  content: string;
};

export default function TextTattoo({ textObj }: { textObj: TextTattooProps }) {
  // Chia mô tả thành một mảng các dòng
  // const contentLines = textObj.content
  //   .split(" \n")
  //   .filter((line) => line.trim() !== "");

  return (
    <>
      <div className="w-full pb-14">
        <h2 className="mb-2 text-center text-2xl font-bold text-white md:text-left md:text-3xl lg:text-left lg:text-4xl ">
          {textObj?.title}
        </h2>
        {/* <ul className="list-disc pl-8">
          {contentLines.map((line: string, index: number) => (
            <li
              key={index}
              className="text-left text-base text-tattoo-gray md:text-xl lg:text-xl"
              dangerouslySetInnerHTML={{ __html: line }}
            ></li>
          ))}
        </ul> */}
        <div
          className="ul_StyleCSS pl-8 text-left text-base text-tattoo-gray md:text-xl lg:text-xl"
          dangerouslySetInnerHTML={{ __html: textObj?.content }}
        />
      </div>
    </>
  );
}
