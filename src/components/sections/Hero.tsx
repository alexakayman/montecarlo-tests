import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Shield, TrendingUp } from "lucide-react";

interface HeroProps {
  onSectionChange: (section: string) => void;
}

function Hero({ onSectionChange }: HeroProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string
  ) => {
    e.preventDefault();
    onSectionChange(section);
  };

  return (
    <section className=" bg-white py-32">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-5xl xl:text-6xl/none">
                Protect your legacy
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Monte carlo simulations to optimize your philanthropic giving.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="#simulation"
                onClick={(e) => handleClick(e, "simulation")}
                className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              >
                Run Simulation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#guide"
                onClick={(e) => handleClick(e, "guide")}
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
              >
                User Guide
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium">Secure & Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium">Growth Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium">Data Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
