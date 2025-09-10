import { createContext, useState, useCallback, useEffect, ReactNode } from "react";
import { avoidElementClassName } from "../../utils/classNames";
import { ToastPlacement } from "../../utils/types";
import CheckIcon from "../../icons/check";
import CrossIcon from "../../icons/cross";
import InfoIcon from "../../icons/info";
import clsx from "clsx";

import "./styles.css";

type ToastType = "success" | "error" | "info";

interface ToastData {
    id: number;
    type: ToastType;
    icon?: ReactNode;
    closing: boolean;
    msg: string | ReactNode;
}

interface ToastOptions {
    icon?: ReactNode;
    duration?: number;
}

interface ToastContextType {
    show: (params: { msg: ReactNode; type: ToastType; icon?: ReactNode; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let externalShowToast: ToastContextType["show"] | null = null;

export const toast = {
    success: (msg: ReactNode, options: ToastOptions = {}) => externalShowToast?.({ msg, type: "success", ...options }),
    error: (msg: ReactNode, options: ToastOptions = {}) => externalShowToast?.({ msg, type: "error", ...options }),
    info: (msg: ReactNode, options: ToastOptions = {}) => externalShowToast?.({ msg, type: "info", ...options }),
};

interface ToastProviderProps {
    position?: ToastPlacement;
    children: ReactNode;
    max?: number;
}

export function ToastProvider({ children, position = "top-right", max = 3 }: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, closing: true } : t)));
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 300);
    }, []);

    const show = useCallback(
        ({
            msg,
            type,
            icon,
            duration = 3000,
        }: {
            msg: ReactNode;
            type: ToastType;
            icon?: ReactNode;
            duration?: number;
        }) => {
            const id = Date.now() + Math.random();
            setToasts((prev) => {
                const updated = [...prev, { id, msg, type, icon, closing: false }];
                return updated.length > max ? updated.slice(updated.length - max) : updated;
            });
            setTimeout(() => removeToast(id), duration);
        },
        [removeToast, max]
    );

    useEffect(() => {
        externalShowToast = show;
        return () => {
            externalShowToast = null;
        };
    }, [show]);

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <div className={clsx("rrn-toaster", avoidElementClassName)} data-position={position}>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        data-type={toast.type}
                        className="rrn-toaster_toast"
                        data-animation={toast.closing ? "fade-out" : "fade-in"}
                    >
                        <span className="rrn-toaster_toast_icon">{toast.icon ?? getDefaultIcon(toast.type)}</span>
                        <div className="rrn-toaster_toast_message">
                            {typeof toast.msg === "string" ? <span>{toast.msg}</span> : toast.msg}
                        </div>
                        <button
                            className="rrn-toaster_toast_close_btn"
                            onClick={() => removeToast(toast.id)}
                            aria-label="Dismiss"
                        >
                            &#x2715;
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function getDefaultIcon(type: ToastType): ReactNode {
    if (type === "success") return <CheckIcon />;
    if (type === "error") return <CrossIcon />;
    return <InfoIcon />;
}
