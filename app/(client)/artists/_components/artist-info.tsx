//Libaries
import { useState } from "react";
//Components
import { InstagramIcon } from "@/components/forms/icons";
//Types
import { PropsArtist } from "@/app/types/type";
import { stripHtmlTags } from "@/lib/utils";

interface SocialProps {
  icon: any;
  label: string;
  value: string;
}

export default function ArtistInfo({
  employeeObj,
}: {
  employeeObj: PropsArtist | null;
}) {
  const [social] = useState<SocialProps>({
    icon: InstagramIcon,
    label: "Instagram",
    value: "Florida Kings Tattoo",
  });

  if (employeeObj && Object.keys(employeeObj).length > 0) {
    const stripHtmlDescription = stripHtmlTags(employeeObj?.description || "");

    return (
      <>
        <div>
          <div>
            <span className="block text-center text-2xl font-bold uppercase text-white md:text-3xl lg:inline lg:text-right lg:text-3xl">
              {employeeObj.name}
            </span>
            <span
              style={{ height: "1px" }}
              className="mx-4 mb-2 hidden w-14 bg-white lg:inline-block"
            ></span>
            <span className="block text-center text-lg font-bold capitalize text-tattoo-highlight md:text-2xl lg:inline lg:text-right lg:text-3xl">
              {employeeObj.header}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-center text-base text-tattoo-gray md:text-lg lg:text-justify lg:text-lg">
              {stripHtmlDescription}
            </p>
          </div>
          <div className="w-ful mt-4 md:mt-8 lg:mt-8 lg:flex">
            <div>
              <div className="flex items-center justify-center md:flex lg:flex">
                <span className="text-tattoo-gray ">
                  {social && <social.icon className="w-8" />}
                </span>
                <div>
                  <span className="ml-3 text-tattoo-gray  md:ml-3 lg:ml-3 lg:text-lg">
                    {employeeObj.link}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
