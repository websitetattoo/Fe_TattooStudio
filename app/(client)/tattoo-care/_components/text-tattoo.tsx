type TextTattooProps = {
  id: number;
  title: string;
  description: string[];
};

export default function TextTattoo({ textObj }: { textObj: TextTattooProps }) {
  return (
    <>
      <div className="w-full pb-14">
        <h2 className="mb-2 text-center text-2xl font-bold text-white md:text-left md:text-3xl lg:text-left lg:text-4xl ">
          {textObj.title}
        </h2>
        {Array.isArray(textObj.description) &&
          textObj.description.length > 0 && (
            <ul className="list-disc pl-8">
              {textObj.description.map((line: string, index: number) => (
                <li
                  className="text-left text-base text-tattoo-gray md:text-xl lg:text-xl"
                  key={index}
                >
                  {line}
                </li>
              ))}
            </ul>
          )}
      </div>
    </>
  );
}
