import { FC } from "react";
import "./styles.scss";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: any;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="feature-card">
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
      {icon}
    </div>
  );
};

export default FeatureCard;
