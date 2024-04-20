import React from "react";

type TextTattooProps = {
  title: string;
  content: string;
};

export default function TextTattoo({ textObj }: { textObj: TextTattooProps }) {
  return (
    <>
      <div className="w-full pb-14">
        <h2 className="mb-2 text-center text-2xl font-bold text-white md:text-left md:text-3xl lg:text-left lg:text-4xl ">
          {textObj?.title}
        </h2>

        <div
          className="ul_StyleCSS pl-8 text-left text-base text-tattoo-gray md:text-xl lg:text-xl"
          dangerouslySetInnerHTML={{ __html: textObj?.content }}
        />
      </div>
    </>
  );
}
