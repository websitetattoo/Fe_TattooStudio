"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { RoundSpinner } from "../ui/spinner";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      {loading ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="flex items-center justify-center align-middle">
            <RoundSpinner className="h-16 w-full align-middle " size="xl" />
          </div>
        </Modal>
      ) : (
        <Modal
          title="Are you sure?"
          description="This action cannot be undone."
          isOpen={isOpen}
          onClose={onClose}
        >
          <div className="flex w-full items-center justify-end space-x-2  pt-6">
            <Button disabled={loading} variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="destructive"
              onClick={onConfirm}
            >
              Continue
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
