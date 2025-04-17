import { getFeaturedCars } from "@/actions/home";
import CarCard from "@/components/CarCard";
import HomeSearch from "@/components/HomeSearch";
import { Button } from "@/components/ui/button";
import { bodyTypes, carMakes } from "@/lib/data";
import { SignedOut } from "@clerk/nextjs";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const featuredCars = await getFeaturedCars()
  return (
    <div className="pt-20 flex flex-col">
      {/* HERO SECTION */}
      <section className="relative py-16 md:py-28 dotted-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
              Find your Dream Car with Vehiql AI
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Advanced AI Car Search and test Drive from thousands of Vehicles.
            </p>
          </div>

          <HomeSearch />
        </div>
      </section>

      {/* FEATURED CARS SECTION */}
      <section className="py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <Button variant={"ghost"} className={"flex items-center"} asChild>
              <Link href={"/cars"}>
                View All <ChevronRight className="ml-1 h-4 w-4" />{" "}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => {
              return <CarCard key={car.id} car={car} />;
            })}
          </div>
        </div>
      </section>

      {/* BROWSE BY MAKE SECTION */}
      <section className="py-2 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse By Company</h2>
            <Button variant={"ghost"} className={"flex items-center"} asChild>
              <Link href={"/cars"}>
                View All <ChevronRight className="ml-1 h-4 w-4" />{" "}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {carMakes.map((make) => {
              return (
                <Link
                  className="bg-white rounded-lg shadow p-4 text-center hover:sadow-md transition cursor-pointer"
                  key={make.name}
                  href={`/cars?make=${make.name}`}
                >
                  <div className="h-16 w-auto mx-auto mb-2 relative">
                    <Image
                      style={{ objectFit: "contain" }}
                      src={make.image}
                      alt={make.name}
                      fill
                    />
                  </div>
                  <h3 className="font-medium">{make.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE OUR PLATFORM SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-2">
          <h2 className="text-2xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of verified vehicles from trusted dealerships and
                private sellers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of verified vehicles from trusted dealerships and
                private sellers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of verified vehicles from trusted dealerships and
                private sellers.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* BROWSE BY BODY TYPE */}
      <section className="py-2 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse By Company</h2>
            <Button variant={"ghost"} className={"flex items-center"} asChild>
              <Link href={"/cars"}>
                View All <ChevronRight className="ml-1 h-4 w-4" />{" "}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => {
              return (
                <Link
                  className="relative group cursor-pointer"
                  key={type.name}
                  href={`/cars?bodyType=${type.name}`}
                >
                  <div className="overflow-hidden rounded-lg flex justify-end h-28 mb-4 relative">
                    <Image
                      style={{ objectFit: "contain" }}
                      src={type.image}
                      fill
                      alt={type.name}
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                    <h3 className="text-white text-xl font-bold pl-4 pb-2">{type.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* READY TO FIND DREAM CAR SECTION */}
      <section className="py-16 dotted-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect vehicle through our platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant={'secondary'} size={'lg'}>
              <Link href={'/cars'}>View All Cars</Link>
            </Button>

            <SignedOut>
              <Button size={"lg"} asChild>
                <Link href={'/sign-up'}>Sign Up ow</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
