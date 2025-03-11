// src/components/atomic/feedback/ConfirmDialog.tsx
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogProps,
} from "@chakra-ui/react";
import { useRef, ReactNode } from "react";

interface ConfirmDialogProps
  extends Omit<AlertDialogProps, "leastDestructiveRef"> {
  title: string;
  message: ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColorScheme?: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  confirmButtonColorScheme = "red",
  onConfirm,
  isOpen,
  onClose,
  isLoading = false,
  ...rest
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null!);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      {...rest}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} disabled={isLoading}>
              {cancelButtonText}
            </Button>
            <Button
              colorScheme={confirmButtonColorScheme}
              onClick={() => {
                onConfirm();
                if (!isLoading) onClose();
              }}
              ml={3}
              isLoading={isLoading}
            >
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDialog;
