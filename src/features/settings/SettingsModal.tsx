import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

type SettingsModalProps = Omit<ModalProps, "children">;

export const SettingsModal = (props: SettingsModalProps) => {
  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent></ModalContent>
    </Modal>
  );
};
