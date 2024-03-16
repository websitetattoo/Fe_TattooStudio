"use client";
import HighlightText from "@/components/highlight-text";
import PageTitle from "@/components/page-title";
import ListPolicies from "./_components/ListPolicies";

export default function index() {
  const artPolicyTitle =
    "At Florida Kings Tattoo, We try to keep our polices simple so the focus can remain on the art. However, we do need  to have policies in place to ensure fair treatment for all customers.";
  const artPoliciesList = [
    {
      id: 1,
      title: "Age Restriction",
      description: `
    Florida Kings Tattoo often have a policy of not tattooing anyone under a certain age, typically 18 or 16 with parental consent. 
    This is to comply with legal requirements and ensure responsible decision-making.
    `,
      className: true,
    },
    {
      id: 2,
      title: "Health and Safety",
      description: `
    Florida Kings Tattoo have strict policies to ensure the health and safety of both artists and clients. 
    This include maintaining a clean and sterile environment, following proper sterilization and infection control procedures, using disposable and single-use equipment, and adhering to local health department regulations.
    `,
      className: true,
    },
    {
      id: 3,
      title: "Consent and Identification",
      description: `
    Florida Kings tattoo require clients to provide valid identification to prove your age and consent. 
    This is to ensure compliance with legal requirements and protect both the client and the artist.
    `,
      className: true,
    },
    {
      id: 4,
      title: "Billing Practices",
      subtitle:
        "Minimum cost differs per artist. Rates will vary depending on the artist, size, design, and etc. ",
      description: `
    In the consultation process, you will receive a quote.
    This is subject to change based on the final design and size chosen. 
    A non-refundable deposit is required to secure your appointment, and is taken out of the total cost of your tattoo.
    Remaining balance is to be paid at the end of the session in the studio. Major changes to the design will change the price quoted in the beginning of the inquiry.
    `,
      className: false,
    },
    {
      id: 5,
      isImportant: true,
      title: "Rescheduling Policy",
      description: `
    All reschedules require a minimum of 72 hours notice in order for the deposit to be applied to a future appointment. 
    Any reschedules/cancellations within 72 hours before the appointment time will forfeit the total deposit. 
    A new non-refundable deposit will be required if you wish to book another appointment. 
    If an appointment is rescheduled more than two times or deemed as no-show, your deposit will be forfeited. 
    By submitting a deposit, you are hereby agreeing to this policy and will be held to this agreement should such an event occur.
    `,
      className: false,
    },
  ];

  return (
    <div className="bg-tattoo-color-bg">
      <div className="w-full py-12 lg:m-auto lg:w-9/12">
        <div className="pb-16 md:pb-8 lg:pb-20">
          <PageTitle>
            <HighlightText className="font-bold">POLICIES</HighlightText>
          </PageTitle>
        </div>
        <div className="px-12 md:px-0">
          <div className="pb-16 md:flex md:items-center md:justify-center">
            <div className="text-center text-xl text-white md:w-9/12 md:pb-8 lg:w-full lg:text-2xl">
              {artPolicyTitle}
            </div>
          </div>

          <div className="text-left md:m-auto md:w-9/12 md:py-12 lg:w-full">
            {artPoliciesList?.map((item, index) => (
              <ListPolicies key={index} obj={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
