import { FC, useMemo, useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import { useAppDispatch } from "../../../../redux/store";
import { changeTheme } from "../../../../redux/features/themeSlice";
import { ThemeClass, ThemeColor } from "../../../../redux/features/themeSlice";
import { capitalizeFirstLetter } from "../../../../utils/capitalize";
import "./styles.scss";

const ThemeToggle: FC = () => {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const themeOptions = useMemo(() => {
    const options = [];

    const colorToClass = {
      [ThemeColor.Red]: ThemeClass.Red,
      [ThemeColor.Green]: ThemeClass.Green,
      [ThemeColor.Blue]: ThemeClass.Blue,
    };

    for (const color of Object.values(ThemeColor)) {
      options.push({
        color,
        className: colorToClass[color],
      });
    }
    return options;
  }, []);

  const handleThemeChange = (option: any) => {
    setIsActive(!isActive);
    dispatch(
      changeTheme({
        color: option.color,
        className: option.className,
      })
    );
  };

  return (
    <div className="theme-toggle">
      <button
        onClick={() => setIsActive(!isActive)}
        className={
          isActive ? "theme-toggle__button--active" : "theme-toggle__button"
        }
      >
        {capitalizeFirstLetter(theme.color)}
      </button>
      {isActive ? (
        <ul className="theme-toggle__list">
          {themeOptions.map((option) =>
            option.color !== theme.color ? (
              <li key={option.color} className="theme-toggle__list-item">
                <a
                  onClick={() => handleThemeChange(option)}
                  className="theme-toggle__link"
                >
                  {capitalizeFirstLetter(option.color)}
                </a>
              </li>
            ) : null
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default ThemeToggle;
