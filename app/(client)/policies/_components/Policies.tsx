interface PolicyItem {
  title: string;
  subtitle: string;
  content: string;
  isImportant: boolean;
  isSubTitle: boolean;
}

export default function Policies({ obj }: { obj: PolicyItem }) {
  const { title, subtitle, content, isImportant, isSubTitle } = obj;
  const contentLines = content.split("\n").filter((line) => line.trim() !== "");
  return (
    <>
      <div className="w-full pb-14">
        <h2 className=" mb-2 text-left text-2xl font-bold text-white md:text-left md:text-3xl lg:text-left lg:text-4xl ">
          {isImportant ? (
            <span className="mb-2 flex pr-4 text-center text-2xl font-bold text-tattoo-highlight md:inline-flex md:text-left md:text-3xl lg:text-left lg:text-4xl">
              IMPORTANT!
            </span>
          ) : (
            ""
          )}
          {title}
        </h2>
        {subtitle !== "No value" && (
          <h3 className="text-left text-xl text-tattoo-gray md:text-left md:text-2xl lg:text-left lg:text-2xl ">
            {subtitle}
          </h3>
        )}
        {contentLines && (
          <ul className={!isSubTitle ? "h-auto" : "list-disc pl-6 lg:pl-8"}>
            {contentLines.map((line: string, index: number) => (
              <li
                className="mb-1 text-left text-base text-tattoo-gray md:text-xl lg:text-xl"
                key={index}
                dangerouslySetInnerHTML={{ __html: line }}
              ></li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
