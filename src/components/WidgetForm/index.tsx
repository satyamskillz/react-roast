import defaultCustomize from "../../utils/defaultCustomize";
import useRoastWidget from "../../hooks/useRoastWidget";
import ApiInstance from "../../utils/api";
import CheckIcon from "../../icons/check";
import Textarea from "../Textarea";
import { toast } from "../Toaster";

import { useState, FormEvent } from "react";
import clsx from "clsx";

import "./styles.css";

const WidgetForm: React.FC = () => {
    const { mode, customize, siteId, screenshotBlobs, onFormSubmit, unSelectElement } = useRoastWidget();

    const [trackingUrl, setTrackingUrl] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (mode === "local" && onFormSubmit instanceof Function) {
            setLoading(true);
            const isSubmitted = await onFormSubmit({ message, screenshotBlobs });
            if (isSubmitted) {
                setMessage("");
                unSelectElement();
            }
            setLoading(false);
            return;
        }

        if (!siteId) {
            console.error("siteId is required");
            return;
        }

        setLoading(true);
        const api = new ApiInstance({ siteId });
        const response = await api.sendRoast({ message, screenshotBlobs });

        if (response.success) {
            setMessage("");
            setTrackingUrl(response.trackingUrl);
            const successMsg = customize?.form?.successMessage || defaultCustomize?.form?.successMessage;
            if (successMsg) toast.success(successMsg);
        } else {
            const errorMsg = customize?.form?.errorMessage || defaultCustomize?.form?.errorMessage;
            if (errorMsg) toast.error(errorMsg, { duration: 5000 });
        }

        setLoading(false);
    };

    const onCancel = () => {
        setMessage("");
        setLoading(false);
        unSelectElement();
        setTrackingUrl(null);
    };

    const openTrackingUrl = () => trackingUrl && window.open(trackingUrl, "_blank");

    const messageInputPlaceholder =
        customize?.form?.messageInput?.placeholder || defaultCustomize.form?.messageInput?.placeholder;

    const submitButtonLabel = customize?.form?.submitButton?.label || defaultCustomize?.form?.submitButton?.label;
    const cancelButtonLabel = customize?.form?.cancelButton?.label || defaultCustomize?.form?.cancelButton?.label;

    return !trackingUrl ? (
        <div className={clsx("rrn-form-success")}>
            <div className="content-group">
                <CheckIcon />
                <p>Thanks for the feedback!</p>
            </div>
            <div className="btns-group">
                <button type="button" onClick={onCancel} disabled={isLoading}>
                    Close
                </button>
                <button type="button" onClick={openTrackingUrl}>
                    Track Progress
                </button>
            </div>
        </div>
    ) : (
        <form className={clsx("rrn-form", customize?.form?.className)} onSubmit={handleSubmit}>
            <div className="form-inputs">
                <Textarea
                    className={customize?.form?.messageInput?.className}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={messageInputPlaceholder}
                    disabled={isLoading}
                    value={message}
                    required={true}
                    maxHeight={300}
                    minRows={3}
                />
            </div>
            <div className="form-btns">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className={clsx(customize?.form?.cancelButton?.className)}
                >
                    {cancelButtonLabel}
                </button>
                <button type="submit" disabled={isLoading} className={clsx(customize?.form?.submitButton?.className)}>
                    {isLoading ? "Submitting..." : submitButtonLabel}
                </button>
            </div>
        </form>
    );
};

export default WidgetForm;
