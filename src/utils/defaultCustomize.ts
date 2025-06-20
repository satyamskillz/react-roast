import { WidgetCustomizeProps } from "./types";

const defaultCustomize: WidgetCustomizeProps = {
    form: {
        messageInput: {
            placeholder: "Don't be nice, Just Roast!",
        },
        submitButton: { label: "Roast it" },
        cancelButton: { label: "Cancel" },
        errorMessage: "Failed to submit message",
        successMessage: "Message Submitted",
    },
    island: {
        label: "Roast Mode",
        placement: "left-center",
    },
};

export default defaultCustomize;
