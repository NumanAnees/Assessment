import Link from "next/link";
import { AppLogo, FacebookIcon, GithubIcon, TwitterIcon } from "@/assets/svgs";

export default function Component() {
  return (
    <div className="bg-black">
      <div className="container mx-auto py-12 sm:px-6 lg:py-12">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex gap-2 items-center cursor-pointer">
              <AppLogo size="32px" />
              <span className="text-white font-semibold text-[18px] ">
                Jobs Manager
              </span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-white hover:text-gray-300"
                prefetch={false}
              >
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-gray-300"
                prefetch={false}
              >
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-gray-300"
                prefetch={false}
              >
                <span className="sr-only">GitHub</span>
                <GithubIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="text-sm leading-5 font-semibold text-white tracking-wider uppercase">
                  Products
                </h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Cool stuff
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Random feature
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Team feature
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Stuff for developers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Calo
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Top Dish
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h4 className="text-sm leading-5 font-semibold text-white tracking-wider uppercase">
                  Legal
                </h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Privacy policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Terms of service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="text-sm leading-5 font-semibold text-white tracking-wider uppercase">
                  Resources
                </h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Tutorials
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h4 className="text-sm leading-5 font-semibold text-white tracking-wider uppercase">
                  Company
                </h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base leading-6 text-gray-300 "
                      prefetch={false}
                    >
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-between mt-12 border-t border-gray-200 pt-8">
          <p className=" text-gray-300 xl:text-center">
            &copy; 2024 Jobs Manager Inc
          </p>
          <p className=" text-gray-300 xl:text-center">All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
