import { useState, useEffect, Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

export const Nav = ({ open, setOpen }) => {
  const [currMenu, setCurrMenu] = useState('');
  const location = useLocation();

  const MENU_DATA = [
    {
      menu_id: 1,
      title: 'Home',
      URL: '/',
    },
    {
      menu_id: 2,
      title: 'Equipment',
      URL: '/dashboard',
    },
  ];

  useEffect(() => {
    !open && setCurrMenu('');
  }, [open]);

  return (
    <ul className="p-4">
      {MENU_DATA.map((Menu, index) => {
        return (
          <Fragment key={index}>
            <li>
              <Link
                to={Menu.URL}
                className={`flex items-center relative hover:bg-blue-blue90 h-10 gap-x-2 rounded-sm cursor-pointer ${
                  !open && 'justify-center'
                }`}
                onClick={() =>
                  currMenu === index
                    ? setCurrMenu('')
                    : Menu.sub_categories === undefined ||
                      (setCurrMenu(index), setOpen(true))
                }
              >
                <img
                  src={Menu.iconURL}
                  className="w-5"
                  alt={`${Menu.title}_icon`}
                />

                <span
                  className={`origin-left w-full h-full leading-10 text-achromatic-bg_paper text-base ${
                    !open && 'hidden scale-0'
                  } ${location.pathname === Menu.URL && 'font-bold'}`}
                >
                  {Menu.title}
                </span>
                {Menu.sub_categories && (
                  <IoIosArrowDown
                    className={`${
                      currMenu === index
                        ? 'top-6 right-9 rotate-180'
                        : 'top-6 right-4'
                    } ${
                      !open && 'hidden'
                    } absolute text-achromatic-bg_paper text-xl right-2 top-3 duration-300`}
                  />
                )}
              </Link>
            </li>
            {Menu.sub_categories && (
              <ul
                className={`origin-top-left h-0 scale-0 duration-300 ${
                  currMenu === index && 'h-fit scale-100'
                }`}
                index={index}
              >
                {Menu.sub_categories.map(Sub => {
                  return (
                    <Link
                      to={
                        Sub.URL
                          ? `${Sub.URL}`
                          : `${location.pathname + location.search}`
                      }
                      key={Sub.menu_id}
                      className={`flex items-center relative hover:bg-blue-blue90 h-10 pl-7 gap-x-2 rounded-sm cursor-pointer ${
                        !open && 'justify-center'
                      }`}
                    >
                      <span
                        className={`origin-left w-full h-full leading-10 text-achromatic-bg_paper text-base ${
                          !open && 'hidden scale-0'
                        } ${location.pathname === Sub.URL && 'font-bold'}`}
                      >
                        {Sub.title}
                      </span>
                    </Link>
                  );
                })}
              </ul>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};
