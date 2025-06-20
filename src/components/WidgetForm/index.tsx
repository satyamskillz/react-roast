import defaultCustomize from "../../utils/defaultCustomize";
import useRoastWidget from "../../hooks/useRoastWidget";
import ApiInstance from "../../utils/api";
import Textarea from "../Textarea";
import { toast } from "../Toaster";

import { useState, FormEvent } from "react";
import clsx from "clsx";

import "./styles.css";

const WidgetForm: React.FC = () => {
    const { mode, customize, siteId, onFormSubmit, elementImageBlob, unSelectElement } = useRoastWidget();

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (mode === "local" && onFormSubmit instanceof Function) {
            setLoading(true);
            const isSubmitted = await onFormSubmit({
                message,
                screenshot: elementImageBlob,
            });
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
        setLoading(true);
        const api = new ApiInstance({ siteId });
        const response = await api.sendRoast({
            message,
            imageBlob: elementImageBlob,
        });

        if (response.success) {
            setMessage("");
            unSelectElement();
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
    };

    const messageInputPlaceholder =
        customize?.form?.messageInput?.placeholder || defaultCustomize.form?.messageInput?.placeholder;

    const submitButtonLabel = customize?.form?.submitButton?.label || defaultCustomize?.form?.submitButton?.label;
    const cancelButtonLabel = customize?.form?.cancelButton?.label || defaultCustomize?.form?.cancelButton?.label;

    return (
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
