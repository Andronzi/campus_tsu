import {
  useGetUserProfileQuery,
  useLogoutUserMutation,
} from "@/services/Account/accountApi";
import {
  useGetTeachingCoursesQuery,
  useGetUserCourcesQuery,
} from "@/services/Course/courcesApi";
import { useGetAllGroupsQuery } from "@/services/Groups/groupApi";
import Link from "next/link";
import { FC } from "react";
import { toast } from "react-hot-toast";

const Header: FC = () => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") || "";
  }
  const groups = useGetAllGroupsQuery(token).data;
  const cources = useGetUserCourcesQuery(token).data;
  const teachingCources = useGetTeachingCoursesQuery(token).data;
  const profile = useGetUserProfileQuery(token).data;
  const [logoutUser] = useLogoutUserMutation();

  const handleExitButton = async () => {
    try {
      await logoutUser().unwrap();
      toast.success("Вы успешно вышли из системы");
    } catch (err) {
      toast.error("Не удалось выйти из системы");
    }
  };

  return (
    <header className="bg-blue-500 p-2">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <ul className="flex items-center pl-0">
          <Link className="nav__link text-xl text-white" href="/">
            Кампусные курсы
          </Link>
          {!!groups?.length && token && (
            <Link className="nav__link text-sm ml-4 text-white" href="/groups">
              Группы курсов
            </Link>
          )}
          {!!cources?.length && token && (
            <Link
              href="/courses/my"
              className="nav__link text-sm ml-4 text-white"
            >
              Мои курсы
            </Link>
          )}
          {!!teachingCources?.length && token && (
            <Link
              className="nav__link text-sm ml-4 text-white"
              href="/courses/teaching"
            >
              Преподаваемые курсы
            </Link>
          )}
        </ul>
        <div className="flex">
          {profile && token ? (
            <>
              <Link
                className="nav__link text-sm ml-4 text-white"
                href="/profile"
              >
                <p className="text-sm text-white font-montserrat cursor-pointer">
                  {profile.email}
                </p>
              </Link>
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
