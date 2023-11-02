import { FC } from "react";
import "./styles.scss";
import Hero from "../../components/ui/pageComponents/hero";
import WaveDivider from "../../components/ui/dividers/waveDivider";
import FeatureGallery from "../../components/ui/galleries/featureGallery";

import { IconChartInfographic } from "@tabler/icons-react";
import { IconRulerMeasure } from "@tabler/icons-react";
import { IconPencilPlus } from "@tabler/icons-react";
import CallToActionCard from "../../components/ui/cards/callToActionCard";
import { useNavigate } from "react-router-dom";

const features = [
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
    description: "Create your own custom budgets.",
    icon: (
      <IconPencilPlus
        width={40}
        height={40}
        className="feature-card__icon"
        color="grey"
      />
    ),
  },
];

const LandingPage: FC = () => {
  const navigator = useNavigate();
  return (
    <>
      <Hero />
      <WaveDivider />
      <section className="feature-section">
        <h2 className="section-title">ALL IN ONE PLACE</h2>
        <FeatureGallery features={features} />
      </section>
      <section className="cta-section">
        <CallToActionCard
          title="Start now"
          text="Create an account with us and start your journey to financial wellbeing."
          image={undefined}
          buttonText="Register"
          handleClick={() => navigator("/auth/register")}
        />
      </section>
    </>
  );
};

export default LandingPage;
