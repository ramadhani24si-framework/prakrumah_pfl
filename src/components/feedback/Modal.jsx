import { useEffect } from "react";
import Button from "../basic/Button";

export default function Modal({ isOpen, onClose, title, children, onConfirm }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
        {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
        <div className="mb-6">{children}</div>
        <div className="flex gap-3">
          <Button type="outline" onClick={onClose}>Batal</Button>
          {onConfirm && <Button type="primary" onClick={onConfirm}>Konfirmasi</Button>}
        </div>
      </div>
    </div>
  );
}