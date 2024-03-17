import Image from "next/image";

export default function index() {
  const newsContent = {
    id: 1,
    title: "Revolutionary Tattoo Technology Unveiled",
    image: "/images/news-2-lc.jpg",
    description: `
    In a groundbreaking development for the tattoo industry, a team of scientists has revealed a revolutionary new technology that promises to change the way people think about body art.
    Dubbed "Dynamic Ink," this innovative tattoo ink is not only visually stunning but also responsive to various stimuli, such as changes in temperature, heart rate, or even emotions.
    The team behind Dynamic Ink, led by Dr. Lily Chen, a biochemist specializing in nanotechnology, explained that the ink contains microscopic particles that can alter their color and pattern in real-time. This means that a tattoo adorned with Dynamic Ink could morph and shift, creating mesmerizing effects that evolve with the wearer's experiences.
    "We're essentially merging art with science," said Dr. Chen during the unveiling ceremony. "Dynamic Ink opens up a whole new realm of possibilities for self-expression through tattoos. Your body art can now reflect not just who you are at a single moment, but the dynamic, ever-changing nature of human existence."
    The applications of Dynamic Ink are vast, ranging from purely aesthetic purposes to practical uses in healthcare and security. For example, doctors could use tattoos inked with Dynamic Ink to monitor a patient's vital signs in real-time, while security personnel could employ them for covert identification purposes.
    Excitement for Dynamic Ink is already running high among tattoo enthusiasts, with many expressing eagerness to get their hands on the transformative ink. However, Dr. Chen emphasized that further research and testing are needed to ensure the ink's safety and reliability before it becomes widely available to the public.
    "We're still in the early stages of development, but the potential is truly limitless," Dr. Chen added. "Dynamic Ink represents a bold new frontier in tattooing, and we can't wait to see how artists and individuals alike will embrace this next evolution in body art."F
        `,
    date: new Date(),
  };

  const descriptionLines = newsContent.description
    .split("\n")
    .filter((line) => line.trim() !== "");

  const formattedDate = newsContent.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {newsContent && (
        <div>
          <div className="w-full justify-center">
            <h3 className="py-4 text-center text-lg text-tattoo-highlight lg:py-8">
              Florida Kings Magazine
            </h3>
            <h1 className="m-auto w-4/5 text-center text-lg font-medium text-white lg:w-full lg:text-3xl">
              {newsContent.title}
            </h1>
            <h3 className="mt-2 text-center text-sm text-tattoo-gray lg:mt-3 lg:text-lg">
              {formattedDate}
            </h3>
            <div className="m-auto mt-8">
              <Image
                src={newsContent.image}
                width={400}
                height={300}
                alt="News Tattoo Image"
                className="m-auto w-11/12 md:h-[600px] md:object-cover lg:w-4/5 lg:object-cover"
              />
            </div>
            <div className="m-auto mt-12 w-11/12 text-white lg:w-4/5">
              <ul>
                {descriptionLines.map((line, index) => (
                  <li
                    key={index}
                    className="pb-8 text-left text-sm md:text-xl lg:text-justify lg:text-xl"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
