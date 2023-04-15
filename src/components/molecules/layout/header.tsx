import {
  accountApi,
  useGetUserProfileQuery,
  useLogoutUserMutation,
} from "@/services/Account/accountApi";
import { useGetAllGroupsQuery } from "@/services/Groups/groupApi";
import {
  useGetTeachingCoursesQuery,
  useGetUserCourcesQuery,
} from "@/services/courcesApi";
import Link from "next/link";
import { FC } from "react";
import { useDispatch } from "react-redux";

const Header: FC = () => {
  const dispatch = useDispatch();
  const groups = useGetAllGroupsQuery().data;
  const cources = useGetUserCourcesQuery().data;
  const teachingCources = useGetTeachingCoursesQuery().data;
  const profile = useGetUserProfileQuery().data;
  const [logoutUser] = useLogoutUserMutation();

  const handleExitButton = () => {
    logoutUser();
    dispatch(accountApi.util.resetApiState());
  };

  return (
    <header className="bg-blue-500 p-2">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <ul className="flex items-center pl-0">
          <Link className="nav__link text-xl text-white" href="/">
            Кампусные курсы
          </Link>
          {!!groups?.length && (
            <Link className="nav__link text-sm ml-4 text-white" href="/groups">
              Группы курсов
            </Link>
          )}
          {!!cources?.length && (
            <Link
              href="/cources/my"
              className="nav__link text-sm ml-4 text-white"
            >
              Мои курсы
            </Link>
          )}
          {!!teachingCources?.length && (
            <Link
              className="nav__link text-sm ml-4 text-white"
              href="/cources/teaching"
            >
              Преподаваемые курсы
            </Link>
          )}
        </ul>
        <div className="flex">
          {profile ? (
            <>
              <p className="text-sm text-white font-montserrat">
                {profile.email}
              </p>
              <button
                onClick={handleExitButton}
                className="bg-transparent border-none text-white 
                          font-montserrat ml-4 text-sm cursor-pointer"
              >
                Выход
              </button>
            </>
          ) : (
            <>
              <Link
                className="nav__link text-sm text-white"
                href="/registration"
              >
                Регистрация
              </Link>
              <Link className="nav__link text-sm ml-4 text-white" href="/login">
                Вход
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
