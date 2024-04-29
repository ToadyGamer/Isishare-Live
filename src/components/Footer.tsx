import Image from "next/image";
export default function Footer() {
  return (
    <footer className="flex justify-center px-4 text-gray-800 bg-white dark:text-white">
      <div className="container px-6 py-6">
        <hr className="h-px bg-gray-200 border-none my-7 dark:bg-gray-700" />

        <div className="flex flex-col items-center justify-between md:flex-row">
          <a href="#">
            <Image
              className="w-auto h-14"
              src="/isishare.png"
              width={300}
              height={100}
              alt=""
            />
          </a>

          <div className="flex mt-4 md:m-0">
            <div className="-mx-4">
              <a
                href="#"
                className="px-4 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-500 hover:text-black hover:underline"
              >
                About
              </a>
              <a
                href="#"
                className="px-4 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-500 hover:text-black hover:underline"
              >
                Blog
              </a>
              <a
                href="#"
                className="px-4 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-500 hover:text-black hover:underline"
              >
                News
              </a>
              <a
                href="#"
                className="px-4 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-500 hover:text-black hover:underline"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
