import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

type link = { target: string; text: string; icon: any };

interface SidebarProps {
  links: link[];
}
const Sidebar: FC<SidebarProps> = ({ links }) => {
  return (
    <nav className="side-nav">
      <div className="side-nav__menu-container">
        <ul className="side-nav__menu-list">
          {links.map((linkElement: link, index: number) => {
            return (
              <li key={index} className="side-nav__menu-item">
                <NavLink
                  to={linkElement.target}
                  className={({ isActive }) =>
                    `side-nav__menu-link${isActive ? "--active" : ""}`
                  }
                >
                  <linkElement.icon />
                  <span className="side-nav__link-text">
                    {linkElement.text}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
