import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <ImSpinner2 className="w-12 h-12 text-pink animate-spin mb-4 text-4xl" />
      <p className="text-pink text-lg font-semibold">Loading...</p>
    </div>
  );
}