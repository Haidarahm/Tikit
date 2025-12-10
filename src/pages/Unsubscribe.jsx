import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { unsubscribe } from "../apis/unsubscribe";
import { CheckCircleOutlined, HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Unsubscribe = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleUnsubscribe = async () => {
      if (!token) {
        setError("Invalid token");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await unsubscribe(token);
        
        if (response?.status === true) {
          setSuccess(true);
        } else {
          setError(response?.message || "Unsubscription failed");
        }
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "An error occurred while processing your request"
        );
      } finally {
        setLoading(false);
      }
    };

    handleUnsubscribe();
  }, [token]);

  return (
    <div data-nav-color="black" className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-[var(--container-bg)] dark:bg-[var(--container-bg)] border border-[var(--foreground)]/10 dark:border-[var(--foreground)]/20 rounded-2xl shadow-lg p-8 md:p-12 text-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-6 py-12">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 48, color: "var(--secondary)" }}
                    spin
                  />
                }
              />
              <p className="text-[var(--foreground)] text-lg font-medium">
                Processing your request...
              </p>
            </div>
          ) : success ? (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center mb-4">
                <CheckCircleOutlined
                  style={{
                    fontSize: 48,
                    color: "var(--secondary)",
                  }}
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                Successfully Unsubscribed
              </h1>
              <p className="text-[var(--foreground)]/80 text-lg mb-2">
                You have been successfully unsubscribed from our newsletter.
              </p>
              <p className="text-[var(--foreground)]/60 text-base mb-8">
                We're sorry to see you go. If you change your mind, you can always subscribe again anytime.
              </p>
              <button
                onClick={() => navigate("/home")}
                className="inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary)]/90 text-[var(--background)] font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-[var(--secondary)]/30 hover:shadow-[var(--secondary)]/50"
              >
                <HomeOutlined />
                <span>Back to Home</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <CheckCircleOutlined
                  style={{
                    fontSize: 48,
                    color: "#ef4444",
                  }}
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                Unsubscription Failed
              </h1>
              <p className="text-[var(--foreground)]/80 text-lg mb-8">
                {error || "Something went wrong. Please try again later."}
              </p>
              <button
                onClick={() => navigate("/home")}
                className="inline-flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--secondary)]/90 text-[var(--background)] font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-[var(--secondary)]/30 hover:shadow-[var(--secondary)]/50"
              >
                <HomeOutlined />
                <span>Back to Home</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
