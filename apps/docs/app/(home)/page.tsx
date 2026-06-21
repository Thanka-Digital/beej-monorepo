import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">Welcome To BEEJ</h1>
      <p>
        You can see the{" "}
        <Link href="/docs" className="font-medium underline">
          docs
        </Link>{" "}
        by going to this link.
      </p>
    </div>
  );
}
