import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import Map from "../components/Map";
const search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuest } = router.query;

  const formatedStartDate = startDate
    ? format(new Date(startDate), "MM/dd/yyyy")
    : "";
  const formatedEndDate = endDate
    ? format(new Date(endDate), "MM/dd/yyyy")
    : "";

  const range = `${formatedStartDate} - ${formatedEndDate}`;
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numberOfGuest} guest`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300 + Stay-{range} -for {numberOfGuest} number of guest
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stay in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Cancellation Flexibility</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <div className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg pr-4 transition duration-200 ease-out first:border-t">
                  <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                    <Image src={img} layout="fill" objectFit="cover" className='rounded-2xl' />
                  </div>
                  <div className="flex flex-col flex-grow pl-5">
                    <div className="flex justify-between">
                      <p>{location}</p>
                      <HeartIcon className="h-7 cursor-pointer" />
                    </div>
                    <h4 className="text-xl">{title}</h4>
                    <div className="border-b w-10 pt-2" />
                    <p className="pt-2 text-sm text-gray-500 flex-grow">
                      {description}
                    </p>
                    <div className='flex justify-between items-end pt-5'>
                      <p className="flex items-center">
                        <StarIcon className="h-5 text-red-400" />
                        {star}
                      </p>
                      <div>
                        <p className='text-lg lg:text-2xl font-semibold pb-2'>{price}</p>
                        <p className='text-right font-extralight'>{total}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />

    </div>
  );
};

export default search;

export async function getStaticProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
console.log(searchResults);
  return {
    props: {
      searchResults,
    },
  };
}
