import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ImgArtists() {
  return (
    <>
      <div>
        <CardContent className="p-2">
          <div className="w-full relative overflow-hidden">
            <img
              src="/images/tattootImg.png"
              alt="Tattoo Image"
              className="w-full h-full object-cover grayscale transition-transform duration-500 ease-in-out hover:grayscale-0 hover:scale-110"
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
