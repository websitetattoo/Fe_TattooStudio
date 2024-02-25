type textTattooProps = {
  obj: any;
};

export default function TextTattoo({ obj }: textTattooProps) {
  return (
    <>
      <div className="w-full pb-14">
        <h2 className="mb-2 text-center text-2xl font-bold text-white md:text-left md:text-3xl lg:text-left lg:text-4xl ">
          {obj.title}
        </h2>
        {Array.isArray(obj.description) && obj.description.length > 0 && (
          <ul className="list-disc pl-8">
            {obj.description.map((line: string, index: number) => (
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
