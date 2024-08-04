//Libaries
import Image from "next/image";
import { Image as ImageAnt } from "antd";
//Components
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//Types
import { PropsArtist } from "@/app/types/type";

export default function ArtistCard({
  imgObj,
  disabled,
}: {
  imgObj: PropsArtist;
  disabled?: boolean;
}) {
  return (
    <>
      <div>
        <CardContent className="p-2">
          <div className="relative w-full overflow-hidden">
            {disabled ? (
              <Image
                src={imgObj.avatar ? imgObj.avatar : imgObj.url}
                width={300}
                height={300}
                alt="Tattoo Image"
                className="h-[400px] h-full w-full object-cover grayscale transition-transform duration-500 ease-in-out hover:scale-110 hover:grayscale-0"
              />
            ) : (
              <ImageAnt
                src={imgObj.avatar ? imgObj.avatar : imgObj.url}
                width={300}
                height={300}
                alt="Tattoo Image"
                className="h-[400px] h-full w-full object-cover grayscale transition-transform duration-500 ease-in-out hover:scale-110 hover:grayscale-0"
              />
            )}
          </div>
        </CardContent>
        {disabled && (
          <CardHeader className="text-center md:p-0">
            <CardTitle className="text-2xl text-white md:text-base lg:text-2xl">
              {imgObj.name}
            </CardTitle>
            <CardDescription
              style={{ marginTop: "0px" }}
              className="block text-base md:text-sm lg:text-base"
            >
              {imgObj.header}
            </CardDescription>
          </CardHeader>
        )}
      </div>
    </>
  );
}
