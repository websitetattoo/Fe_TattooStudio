import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function ArtistCard() {
  return (
    <>
      <div>
        <CardContent className="p-2">
          <div className="relative w-full overflow-hidden">
            <Image
              src="/images/tattootImg.png"
              width={300}
              height={300}
              alt="Tattoo Image"
              className="h-full w-full object-cover grayscale transition-transform duration-500 ease-in-out hover:scale-110 hover:grayscale-0"
            />
          </div>
        </CardContent>
        <CardHeader className="text-center">
          <CardTitle className="text-white">Jessica Lauren</CardTitle>
          <CardDescription>Tattoo Artists</CardDescription>
        </CardHeader>
      </div>
    </>
  );
}
