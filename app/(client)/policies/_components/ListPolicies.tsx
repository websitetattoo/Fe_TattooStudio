interface PolicyItem {
  id?: number;
  title: string;
  subtitle?: string;
  description: string[];
  isImportant?: boolean;
  className: boolean;
}

export default function ListPolicies({ obj }: { obj: PolicyItem }) {
  const { title, subtitle, description, isImportant, className } = obj;
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
        <h3 className="text-left text-xl text-tattoo-gray md:text-left md:text-2xl lg:text-left lg:text-2xl ">
          {subtitle}
        </h3>
        {Array.isArray(description) && description.length > 0 && (
          <ul className={className ? "h-auto" : "list-disc pl-6 lg:pl-8"}>
            {description.map((line: string, index: number) => (
              <li
                className="mb-1 text-left text-base text-tattoo-gray md:text-xl lg:text-xl"
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
