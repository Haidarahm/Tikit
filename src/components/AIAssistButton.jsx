import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useChatbotStore } from "../store/chatbotStore";

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-[var(--secondary)]"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

function AIAssistButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { messages, loading, sendMessage } = useChatbotStore();
  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    await sendMessage(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (text) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("*   ") || trimmed.startsWith("* ")) {
        return (
          <p key={i} className="mt-1 first:mt-0 flex gap-2">
            <span>•</span>
            <span>{trimmed.replace(/^\*\s*/, "")}</span>
          </p>
        );
      }
      const segments = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="mt-1 first:mt-0">
          {segments.map((s, j) =>
            s.startsWith("**") && s.endsWith("**") ? (
              <strong key={j}>{s.slice(2, -2)}</strong>
            ) : (
              s
            )
          )}
        </p>
      );
    });
  };

  return (
    <>
      {/* Fixed button - hidden when modal is open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--secondary)] text-white dark:text-[var(--background)] shadow-lg shadow-[var(--secondary)]/30 dark:shadow-[var(--foreground)]/20 dark:border dark:border-[var(--foreground)]/20 transition-shadow hover:shadow-xl hover:shadow-[var(--secondary)]/40 dark:hover:shadow-[var(--foreground)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            aria-label="Open AI assistant"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <MessageCircle className="h-7 w-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-end justify-end overflow-hidden p-4 pb-24 md:p-6 md:pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              data-lenis-prevent
              className="relative flex h-[480px] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[var(--foreground)]/10 dark:border-[var(--foreground)]/20 bg-[var(--background)] shadow-2xl dark:shadow-[var(--foreground)]/10"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--foreground)]/10 dark:border-[var(--foreground)]/20 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--secondary)]/20 dark:bg-[var(--foreground)]/15">
                    <MessageCircle className="h-5 w-5 text-[var(--secondary)] dark:text-[var(--foreground)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Tikit AI Assist</h3>
                    <p className="text-xs text-[var(--foreground)]/60 dark:text-[var(--foreground)]/70">Ask anything about Tikit Agency</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-[var(--foreground)]/60 dark:text-[var(--foreground)]/70 transition-colors hover:bg-[var(--foreground)]/10 dark:hover:bg-[var(--foreground)]/20 hover:text-[var(--foreground)]"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages - scroll container (data-lenis-prevent + stopPropagation for Lenis) */}
              <div
                data-lenis-prevent
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-4"
                style={{
                  WebkitOverflowScrolling: "touch",
                  touchAction: "pan-y",
                }}
                onWheelCapture={(e) => e.stopPropagation()}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-[var(--secondary)] text-white dark:text-[var(--background)]"
                          : "bg-[var(--foreground)]/5 dark:bg-[var(--foreground)]/10 text-[var(--foreground)]"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div className="whitespace-pre-wrap [&>strong]:font-semibold">
                          {formatMessage(msg.content)}
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-[var(--foreground)]/5 dark:bg-[var(--foreground)]/10 px-4 py-3">
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-[var(--foreground)]/10 dark:border-[var(--foreground)]/20 p-3">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about services, contact, pricing..."
                    className="flex-1 rounded-xl border border-[var(--foreground)]/20 dark:border-[var(--foreground)]/30 bg-transparent px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 dark:placeholder:text-[var(--foreground)]/50 focus:border-[var(--secondary)] focus:outline-none"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--secondary)] text-white dark:text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIAssistButton;
