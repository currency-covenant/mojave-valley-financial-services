import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <>
      <div
        className={
          "w-full h-full bg-[#E09D00] flex flex-col lg:flex-row justify-center items-center gap-8 p-14"
        }
      >
        <div className="flex flex-col text-center lg:text-left justify-center lg:justify-start items center max-w-3xl gap-4 w-full lg:w-3/4">
          <h4 className={"font-dmSerifDisplay text-5xl"}>Get Started Today!</h4>
          <p className={"font-dmSerifDisplay text-xl"}>
            Tax season can be overwhelming, but with our dedicated team, it
            doesn’t have to be. We offer hassle-free, efficient tax services
            designed to meet your needs.
          </p>
        </div>
        <Button
          variant="blank"
          className="bg-black text-white text-xl p-9 w-full lg:w-1/4"
        >
          Contact Us Now
        </Button>
      </div>
    </>
  );
}
