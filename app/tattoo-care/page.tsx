"use client";

export default function index() {

  const arrWeekList = [
    {
      id: 1,
      title: "Day 1",
      description: [
        "Keep your bandage on for as long as your artists instructs you to. Only touch the tattoo very gently.",
        "Wear loose clothing that won't rub on the tattoo.",
        "Wash your hands thoroughly, and gently clean your tattoo.",
        "Use your hands -- avoid sponges or loofahs that might rub your skin too harshly. Use hypoallergenic, unscented soap Don't let the tap water run directly onto your new tattoo; use your hands to gently scoop water onto the area. Let the tattoo air dry; don't rub it with a towel.",
        "After washing, gently pat the tattoo with a paper towel, and then let it air dry for up to one hour.",
        "Apply a thin layer of anti-bacterial ointment 3-4 times per day for the first 3-5 days",
        "Other than washing the tattoo, do not get it wet (no swimming!)",
        "Some redness, swelling, and discomfort is normal.",
        "Consult a doctor if you experience the following symptoms: Excessive drainage/ Excessive bleeding/ Excessive pain/ Excessive swelling/ Skin that is hot to touch/ A temperature of higher than 101 degrees F.",
      ],
    },
    {
      id: 2,
      title: "Week One",
      description: [
        "Wash your tattoo, following the instructions above, at least daily, more if you are in a hot or dirty environment.",
        "Scabs will form on the tattoo, and it may be itchy or dry.",
        "Resist the temptation to scratch it or pick the scabs. Let your skin heal naturally.",
        "Wash your hands before touching the tattoo.",
        "Moisturize the tattoo using fragrance-free lotion, as needed.",
        "Sun and prolonged time in water can damage your tattoo's appearance, so cover your tattoo for the first 4 weeks to keep it out of direct sunlight.",
        "Avoid swimming or soaking in a bathtub for the first few weeks.",
        "In the first week, minor swelling and redness, as well as itching, are normal.",
      ],
    },
    {
      id: 3,
      title: "Week Two",
      description: [
        "Continue applying moisturizer.",
        "Wash your hands before touching the tattoo.",
        "Protect your tattoo from the sun and from prolonged water exposure.",
      ],
    },
    {
      id: 4,
      title: "Week Four",
      description: [
        "Once your tattoo has healed, it is alright to expose it to the sun.  Be sure to apply sunscreen, as the skin may still be tender. ",
        "Continue to moisturize regularly to keep your tattoo looking its best.",
      ],
    },
  ];

  return (
    <>
      <div className="w-9/12 m-auto py-24">
        <div>
          <h1 className=" mb-8 text-center text-3xl font-bold text-tattoo-highlight md:text-4xl lg:text-4xl">
            TATTOO CARE
          </h1>
        </div>

        <div>
          {arrWeekList.map((item, index) => (
            <div className="pb-14 w-full" key={index}>
              <h2 className = "font-bold text-white lg:text-4xl md:text-3xl text-2xl mb-2 text-center lg:text-left md:text-left ">{item.title}</h2>
              <ul className="list-disc pl-8">
                {item.description.map((line, index) => (
                  <li className="text-tattoo-gray lg:text-xl md:text-xl text-base text-left" key={index}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
