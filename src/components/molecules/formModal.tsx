import Image from "next/image";
import { FC } from "react";

type ModalProps = {
  header: string;
  body: React.ReactNode;
  show: boolean;
  onCloseButtonClick: () => any;
};

const FormModal: FC<ModalProps> = ({
  show,
  header,
  body,
  onCloseButtonClick,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="modal fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-black/50"
      onClick={onCloseButtonClick}
    >
      <div
        className="modal-content bg-white p-4 pb-6 rounded-lg w-max min-w-[20%] max-h-[90%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header relative flex">
          <p className="font-montserrat font-medium text-xl">{header}</p>
          <Image
            alt="close"
            src="http://localhost:3000/close.svg"
            width="36"
            height="36"
            className="absolute top-0 -right-2 cursor-pointer"
            onClick={onCloseButtonClick}
          />
        </div>
        <div className="modal-body font-montserrat text-md">{body}</div>
      </div>
    </div>
  );
};

export default FormModal;
