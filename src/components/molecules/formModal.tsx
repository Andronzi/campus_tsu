import { FC } from "react";
import Button from "../atoms/button";

type ModalProps = {
  header: string;
  body: React.ReactNode;
  show: boolean;
  onCloseButtonClick: () => any;
};

const Modal: FC<ModalProps> = ({ show, header, body, onCloseButtonClick }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="modal fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-black/50"
      onClick={onCloseButtonClick}
    >
      <div
        className="modal-content bg-white p-4 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header font-montserrat font-medium text-xl">
          {header}
        </div>
        <div className="modal-body font-montserrat text-md">{body}</div>
        <div className="modal-footer flex justify-end">
          <Button
            className="bg-slate-400	text-white max-w-max"
            value="Отмена"
            onClick={onCloseButtonClick}
          />
          <Button className="text-white max-w-max ml-4" value="Отправить" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
