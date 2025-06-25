import React, { useRef, useEffect } from "react";
import clsx from "clsx";

import "./styles.css";

interface TextareaProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    minRows?: number;
    disabled?: boolean;
    maxHeight?: number;
    value: string;
}

const Textarea: React.FC<TextareaProps> = ({
    placeholder = "Type something...",
    required = false,
    disabled = false,
    className = "",
    minRows = 1,
    maxHeight,
    onChange,
    value,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto"; // Reset
        textarea.style.height = `${textarea.scrollHeight}px`; // Set to content height

        if (maxHeight && textarea.scrollHeight > maxHeight) {
            textarea.style.overflowY = "scroll";
            textarea.style.height = `${maxHeight}px`;
        } else {
            textarea.style.overflowY = "hidden";
        }
    }, [value]);

    return (
        <textarea
            value={value}
            rows={minRows}
            ref={textareaRef}
            disabled={disabled}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className={clsx("auto-grow-textarea", className)}
        />
    );
};

export default Textarea;
