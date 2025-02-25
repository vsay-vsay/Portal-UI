import { FeaturesSection } from "~/components/molecule/emp/dashboard/overview/feature";
import { WobbleCardOverview } from "~/components/molecule/emp/dashboard/overview/heading";
import { ProductHelp } from "~/components/molecule/emp/dashboard/overview/producthelp";
import { empDashboardHeadingImage } from "~/image";

const HeadinCardData = {
  title: "Signup for blazing-fast cutting-edge state of the art Gippity AI wrapper today!",
  description: "With over 100,000 mothly active bot users, Gippity AI is the most popular AI platform for developers.",
  image: empDashboardHeadingImage,
};

const OverviewComponent = () => {
  return (
    <>
    <div className="pb-3">
      <h1 className="text-gray-800 dark:text-gray-200">Welcome to <span className="font-bold text-blue-500">VSAY HR Portal! ,</span> let's make today productive.</h1>
    </div>
      <WobbleCardOverview data={HeadinCardData} />
      <FeaturesSection />
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Packed with Support
        </h4>
        <ProductHelp />
    </>
  );
};

export default OverviewComponent;
