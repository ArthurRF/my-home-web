import { Button, Modal as RSModal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

type Props = {
  showModal: boolean;
  title?: string;
  toggleModal: () => void;
  children: JSX.Element;
};

export default function Modal({
  showModal,
  toggleModal,
  children,
  title = 'Hummm',
}: Props) {
  return (
    <RSModal isOpen={showModal} toggle={toggleModal}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </RSModal>
  )
}