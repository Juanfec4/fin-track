import { FC } from "react";
import "./styles.scss";

interface HeadingLinkProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  linkText: string;
  titleText: string;
  handleClick: () => void;
}

const HeadingLink: FC<HeadingLinkProps> = ({
  tag,
  handleClick,
  linkText,
  titleText,
}) => {
  const HeadingTag = tag || "h1";
  return (
    <HeadingTag className="link-heading">
      <span className="link-heading__text">{titleText}</span>
      <span className="link-heading__separator">|</span>
      <a onClick={handleClick} className="link-heading__link">
        {linkText}
      </a>
    </HeadingTag>
  );
};

export default HeadingLink;
