import { FC } from "react";
import FeatureCard from "../../cards/featureCard";
import "./styles.scss";

type feature = {
  title: string;
  description: string;
  icon: any;
};

interface FeatureGalleryProps {
  features: feature[];
}

const FeatureGallery: FC<FeatureGalleryProps> = ({ features }) => {
  return (
    <div className="feature-gallery">
      <div className="feature-gallery__content">
        {features.map((featureCard: feature, index: number) => {
          return (
            <FeatureCard
              key={index}
              title={featureCard.title}
              description={featureCard.description}
              icon={featureCard.icon}
            />
          );
        })}
      </div>
    </div>
  );
};
export default FeatureGallery;
