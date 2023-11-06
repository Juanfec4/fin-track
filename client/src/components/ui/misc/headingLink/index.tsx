import { FC } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

interface HeadingLinkProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  target: string;
  linkText: string;
  titleText: string;
}

const HeadingLink: FC<HeadingLinkProps> = ({
  tag,
  target,
  linkText,
  titleText,
}) => {
  const HeadingTag = tag || "h1";
  return (
    <HeadingTag className="link-heading">
      <span className="link-heading__text">{titleText}</span>
      <span className="link-heading__separator">|</span>
      <Link to={target} className="link-heading__link">
        {linkText}
      </Link>
    </HeadingTag>
  );
};

export default HeadingLink;
