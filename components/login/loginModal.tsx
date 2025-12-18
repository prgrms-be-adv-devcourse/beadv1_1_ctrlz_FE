"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const LoginModal = ({ isOpen, onClose, onSuccess }: Props) => {
  // ESC key close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="mb-6 text-xl font-semibold text-center">
          로그인
        </h2>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <Link
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/google`}
            onClick={onSuccess}
          >
            <Button 
              className="w-full"
            >
              구글로 로그인
          </Button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
