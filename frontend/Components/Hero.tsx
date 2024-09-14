"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { SecondaryButton } from "./Buttons/SecondaryButton";
import { Feature } from "./Feature";

export const Hero = () => {
  const router = useRouter()

  return (
    <div>
      <div className="flex justify-center">
        <div className="text-5xl font-semibold text-center pt-8 max-w-xl">
          Automate as fast you can type
        </div>
      </div>

      <div className="flex justify-center">
        <div className="text-xl font-normal text-center pt-8 max-w-2xl">
          AI gives you automation superpoers, and Zapier puts them to work.
          Parsing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </div>
      </div>

      <div className="flex justify-center pt-4">
            <div className="flex">
                <PrimaryButton onClick={() => {
                    router.push("/signup")
                }} size="big">Get Started free</PrimaryButton>
                <div className="pl-4">
                    <SecondaryButton  onClick={() => {}} size="big">Contact Sales</SecondaryButton>
                </div>
            </div>
        </div>

      <div className="flex pt-4">
        <Feature title={"Free Forever"} subtitle={"for core feature"}></Feature>
        <Feature title={"More apps"} subtitle={" than any other platform"}></Feature>
        <Feature title={"Cutting Edge"} subtitle={" AI features"}></Feature>
      </div>

        

    </div>
  );
};
