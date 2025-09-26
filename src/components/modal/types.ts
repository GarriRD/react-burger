import { ReactNode } from "react";

export type ModalProps = {
  modalSwitcher: () => void;
  children: ReactNode;
}