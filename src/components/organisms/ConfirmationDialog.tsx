import { ReactNode, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  body: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDangerous?: boolean;
}

/**
 * ConfirmationDialog component for confirming user actions
 * Used for delete, submit, cancel, and other important actions
 */
const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  body,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  isDangerous = false,
}: ConfirmationDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null!);

  const handleConfirm = () => {
    onConfirm();
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
              {cancelText}
            </Button>
            <Button
              colorScheme={isDangerous ? "red" : "blue"}
              onClick={handleConfirm}
              ml={3}
              isLoading={isLoading}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
