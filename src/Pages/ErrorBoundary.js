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
    console.error("Erreur capturée par ErrorBoundary :", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red" }}>
          <h2>Une erreur s'est produite.</h2>
          <p>{this.state.error?.message || "Erreur inconnue"}</p>
          <button
            style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer" }}
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
