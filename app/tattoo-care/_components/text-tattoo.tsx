type textTattooProps = {
  obj: any;
  className: any;
};

export default function TextTattoo({ obj, className }: textTattooProps) {
  return (
    <>
      <div className="w-full pb-14">
        <h2 className=" mb-2 text-left text-2xl font-bold text-white md:text-left md:text-3xl lg:text-left lg:text-4xl ">
          {obj.isImportant ?
            <span className="flex pr-4 mb-2 text-center text-2xl font-bold text-tattoo-highlight md:inline-flex md:text-left md:text-3xl lg:text-left lg:text-4xl"
            >IMPORTANT!
            </span>
            : ''}
          {obj.title}
        </h2>
        <h3 className="text-left text-xl text-tattoo-gray md:text-left md:text-2xl lg:text-left lg:text-2xl ">
          {obj.subtitle}
        </h3>
        {Array.isArray(obj.description) && obj.description.length > 0 && (
          <ul className={className ? "text-2xl h-auto" : "list-disc pl-8"}>
            {obj.description.map((line: string, index: number) => (
              <li
                className="text-left text-base text-tattoo-gray md:text-xl lg:text-xl mb-1"
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
