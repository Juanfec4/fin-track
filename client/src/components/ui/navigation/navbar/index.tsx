import { FC } from "react";
import PrimaryButton from "../../buttons/primaryButton";
import { NavLink, useNavigate } from "react-router-dom";
import "./styles.scss";
import ThemeToggle from "../../buttons/themeToggle";

type link = { target: string; text: string };

interface NavbarProps {
  links: link[];
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const navigator = useNavigate();
  return (
    <nav className="nav">
      <div className="nav__menu-container">
        <ul className="nav__menu-list">
          {links.map((linkElement: link, index: number) => {
            return (
              <li key={index} className="nav__menu-item">
                <NavLink
                  to={linkElement.target}
                  className={({ isActive }) =>
                    `nav__menu-link${isActive ? "--active" : ""}`
                  }
                >
                  {linkElement.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="nav__action-container">
        <PrimaryButton
          text="Login"
          handleClick={() => navigator("/auth/login")}
        />
        <ThemeToggle />
      </div>
    </nav>
  );
};
export default Navbar;
