import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <Link href={'/auth'}>
        <span className="text-blue-500 hover:text-blue-700">Log In</span>
      </Link> to Get Started
    </div>
  );
}
