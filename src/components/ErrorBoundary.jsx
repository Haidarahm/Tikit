import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "system-ui, sans-serif",
            backgroundColor: "var(--background, #fff)",
            color: "var(--foreground, #1a1a1a)",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: "1rem",
                opacity: 0.7,
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={this.handleRetry}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "#52C3C5",
                border: "none",
                borderRadius: "9999px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1C6F6C")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#52C3C5")}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
