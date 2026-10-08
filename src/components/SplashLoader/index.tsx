import Lottie from "lottie-react";
import LoaderAsset from "../../assets/loader.json";
const SplashLoader = () => {
  return (
    <>
      <div className="w-screen h-screen bg-[#ff5b00]  flex justify-center items-center">
        <Lottie animationData={LoaderAsset} loop={true} className="w-52" />
      </div>
    </>
  );
};
export default SplashLoader;
