import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";


type ArtistCardProps = {
  url: string;
};

export default function ArtistCard({url}:ArtistCardProps) {
  
  return (
    <>
      <div>
        <CardContent className="p-2">
          <div className="relative w-full overflow-hidden">
            <Image
              src={url}
              width={300}
              height={300}
              alt="Tattoo Image"
              className="h-full w-full object-cover grayscale transition-transform duration-500 ease-in-out hover:scale-110 hover:grayscale-0"
            />
          </div>
        </CardContent>
        <CardHeader className="text-center md:p-0">
          <CardTitle className="text-white lg:text-2xl md:text-base text-2xl">Jessica Lauren</CardTitle>
          <CardDescription style={{ marginTop: "0px" }} className="text-base lg:text-base md:text-sm block">Tattoo Artists</CardDescription>
        </CardHeader>
      </div>
    </>
  );
}




