import { FC } from "react";
import "./styles.scss";
import Hero from "../../components/ui/header/hero";
import WaveDivider from "../../components/ui/dividers/waveDivider";
import FeatureGallery from "../../components/ui/galleries/featureGallery";

import { IconChartInfographic } from "@tabler/icons-react";
import { IconRulerMeasure } from "@tabler/icons-react";
import { IconPencilPlus } from "@tabler/icons-react";

const LandingPage: FC = () => {
  return (
    <>
      <Hero />
      <WaveDivider />
      <FeatureGallery
        features={[
          {
            title: "Track",
            description: "Keep a record of transactions.",
            icon: (
              <IconChartInfographic
                width={40}
                height={40}
                className="feature-card__icon"
                color="grey"
              />
            ),
          },
          {
            title: "Measure",
            description: "Visualize your progress over time.",
            icon: (
              <IconRulerMeasure
                width={40}
                height={40}
                className="feature-card__icon"
                color="grey"
              />
            ),
          },
          {
            title: "Customize",
            description: "Create your own custom plans.",
            icon: (
              <IconPencilPlus
                width={40}
                height={40}
                className="feature-card__icon"
                color="grey"
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default LandingPage;
