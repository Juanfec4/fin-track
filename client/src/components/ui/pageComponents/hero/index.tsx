import { FC } from "react";
import "./styles.scss";
import Lottie from "lottie-react";
import financePersonRed from "../../../../assets/animations/finance-person-red.json";
import financePersonGreen from "../../../../assets/animations/finance-person-green.json";
import financePersonBlue from "../../../../assets/animations/finance-person-blue.json";
import SecondaryButton from "../../buttons/secondaryButton";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../hooks/useTheme";

const Hero: FC = () => {
  const navigator = useNavigate();
  const theme = useTheme();
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__call-to-action">
          <h1 className="hero__title">Start improving your couple finances.</h1>
          <p className="hero__text">
            We are what we track. Fin Track helps you manage your money with
            ease. Create budgets, and measure your progress in a collaborative
            manner.
          </p>
          <SecondaryButton
            text="Get Started"
            handleClick={() => navigator("/web-app")}
          />
        </div>
        <Lottie
          animationData={
            theme.color === "blue"
              ? financePersonBlue
              : theme.color === "green"
              ? financePersonGreen
              : theme.color === "red"
              ? financePersonRed
              : null
          }
          className="hero__image-container"
        />
      </div>
    </section>
  );
};
export default Hero;
