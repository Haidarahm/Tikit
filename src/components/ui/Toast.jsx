import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "../../store/toastStore";
import { X, CheckCircle, AlertCircle } from "lucide-react";

const ToastItem = ({ id, message, type, onRemove }) => {
  const isSuccess = type === "success";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-md 
        ${
          isSuccess
            ? "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
            : "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
        }`}
    >
      {isSuccess ? (
        <CheckCircle className="h-5 w-5 shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 shrink-0" />
      )}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="shrink-0 rounded-full p-1 opacity-70 transition-opacity hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[10000] flex flex-col items-center gap-2 p-4 pt-8">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};
