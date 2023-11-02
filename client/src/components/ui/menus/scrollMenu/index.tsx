import { FC, MouseEvent, useState } from "react";
import ScrollIntoView from "react-scroll-into-view";
import "./styles.scss";
type scrollLink = {
  target: string;
  text: string;
};
interface ScrollMenuProps {
  links: scrollLink[];
  title: string;
}
const ScrollMenu: FC<ScrollMenuProps> = ({ links, title }) => {
  const [active, setActive] = useState(links[0].target);

  return (
    <div className="scroll-menu">
      <h3 className="scroll-menu__title">{title}</h3>
      <ul className="scroll-menu__list">
        {links.map((link: scrollLink, index: number) => {
          return (
            <li className="scroll-menu__list-item" key={index}>
              <ScrollIntoView selector={"#" + link.target}>
                <a
                  className={
                    active === link.target
                      ? "scroll-menu__link--active"
                      : "scroll-menu__link"
                  }
                  onClick={() => setActive(link.target)}
                >
                  {active === link.target ? "- " + link.text + " -" : link.text}
                </a>
              </ScrollIntoView>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScrollMenu;
