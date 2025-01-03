import Link from "next/link";

export default function Error() {
  return (
    <div className="App flex items-center justify-center w-full min-h-[100vh]">
      <div className="circule w-[100px] h-[100px] bg-gray-500 rounded-full"></div>
      <h2 className="subtitle font-semibold m-5 text-3xl md:text-4xl">
        505 <span className="text-red-500">Page not found</span>
      </h2>

      <Link
        href={"/"}
        className="bg-gray-400 rounded-lg px-5 py-3 m-3 hover:scale-110 transition-all"
      >
        Home Page
      </Link>
    </div>
  );
}
