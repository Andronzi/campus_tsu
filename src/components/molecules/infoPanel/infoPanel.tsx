import { FC, ReactNode, useState } from "react";

type Props = {
  [key: string]: string | ReactNode;
};

const InfoPanel: FC<Array<Props>> = (props) => {
  const propsArray = Object.values(props);
  // get the first header name
  const [header, setHeader] = useState(Object.keys(propsArray[0])[0]);
  return (
    <>
      <ul className="flex mb-0 mt-4 pl-0">
        {propsArray.map((headerObj, index) => {
          const key = Object.keys(headerObj)[0];
          let notificationsCount = "";
          if (key === "Уведомления") {
            const length =
              Object.values(headerObj)[0].props?.children[1]?.props
                ?.notifications?.length;

            length > 3
              ? (notificationsCount = "3+")
              : (notificationsCount = length);
          }

          return (
            <li
              className={`relative w-full flex p-4 border-solid border border-slate-300 cursor-pointer ${
                key === header && "bg-slate-100	"
              } first:rounded-tl-md last:rounded-tr-md`}
              key={index}
              onClick={() => setHeader(key)}
            >
              <p
                after-dynamic-value={notificationsCount}
                className={`grow text-center ${
                  key === header && "font-semibold text-gray-600"
                } ${
                  key == "Уведомления" &&
                  `after:content-[attr(after-dynamic-value)] after:font-bold after:absolute after:top-2 after:ml-0.5 after:w-6 after:h-6 after:leading-6 after:text-xs after:rounded-full after:text-center after:bg-red-400 after:text-white`
                }`}
              >
                {key}
              </p>
            </li>
          );
        })}
      </ul>
      <div>
        {propsArray.map((headerObj) => {
          const key = Object.keys(headerObj)[0];

          if (key === header) {
            if (typeof Object.values(headerObj)[0] === "string") {
              return (
                <div
                  key={1}
                  className="p-4 border-solid border border-slate-300 rounded-b-md"
                  dangerouslySetInnerHTML={{
                    __html: Object.values(headerObj)[0]?.toString() || "", // need to change problem with string
                  }}
                ></div>
              );
            } else {
              return <div key={1}>{Object.values(headerObj)[0]}</div>;
            }
          }
        })}
      </div>
    </>
  );
};

export default InfoPanel;
