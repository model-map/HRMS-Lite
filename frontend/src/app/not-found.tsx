import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        <h2 className="mb-6 text-5xl font-semibold">Whoops!</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">Something went wrong</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          The page you&apos;re looking for isn&apos;t found, we suggest you back
          to home.
        </p>
        <Button asChild size="lg" className="rounded-lg text-base">
          <Link href="/">Back to home page</Link>
        </Button>
      </div>

      {/* Right Section: Illustration */}
      <div className="relative h-screen w-full overflow-hidden bg-black max-lg:hidden">
        <Image
          src="/404.png"
          fill
          alt="404 illustration"
          className="object-contain"
        />
      </div>
    </div>
  );
};
export default NotFound;
