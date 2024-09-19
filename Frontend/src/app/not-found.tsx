"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-white">
      <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => router.back()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Go Back
          </Button>
          <Link href="/" passHref>
            <Button variant="outline">Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
