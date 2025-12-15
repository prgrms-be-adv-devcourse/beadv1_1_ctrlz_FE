import React from 'react'

type Props = {
  children: React.ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
}

const Modal = ({children, closeModal, isModalOpen = false}: Props) => {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {isModalOpen && (
        <div
          //약간 더 투명하게
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#2E2B2F]/80"
          onClick={closeModal}
        >
          <div onClick={handleContentClick} className="w-full max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal
