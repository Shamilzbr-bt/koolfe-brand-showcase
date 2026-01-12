import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
                    <h1 className="font-display text-4xl text-primary mb-4">
                        Something went wrong
                    </h1>
                    <p className="text-muted-foreground mb-8 max-w-md">
                        We apologize for the inconvenience. An unexpected error has occurred.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-primary text-white hover:bg-primary/90"
                        >
                            Reload Page
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => (window.location.href = "/")}
                        >
                            Go Home
                        </Button>
                    </div>
                    {process.env.NODE_ENV === "development" && this.state.error && (
                        <div className="mt-8 p-4 bg-secondary/20 rounded-lg text-left max-w-2xl overflow-auto text-xs font-mono">
                            {this.state.error.toString()}
                        </div>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
