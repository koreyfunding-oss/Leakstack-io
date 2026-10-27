import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-black text-electric mb-4">404</p>
      <h1 className="text-3xl font-black mb-2">Lost in the math.</h1>
      <p className="text-gray-400 mb-8">
        That page doesn&apos;t exist. The tools you&apos;re looking for are all on the homepage.
      </p>
      <Link
        to="/"
        className="btn-primary inline-flex items-center justify-center gap-2 max-w-xs mx-auto"
      >
        Back to the Tools
      </Link>
    </div>
  );
}
