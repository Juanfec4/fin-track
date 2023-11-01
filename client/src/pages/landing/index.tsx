import { FC } from "react";
import "./styles.scss";
import Hero from "../../components/ui/header/hero";
import WaveDivider from "../../components/ui/dividers/waveDivider";

const LandingPage: FC = () => {
  return (
    <>
      <Hero />
      <WaveDivider />
    </>
  );
};

export default LandingPage;
