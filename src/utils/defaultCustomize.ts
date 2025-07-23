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
    notifications: {
        enable: true,
        messages: [
            {
                message: "✨ Feedback help us improve!",
                type: "info",
            },
            {
                message: "👈 Click here to share feedback",
                type: "hint",
            },
            {
                message: "🎁 Give feedback and get discount",
                type: "offer",
            },
            {
                message: "💎 You’ve earned discount! Redeem them now.",
                type: "reward",
            },
            {
                message: "⭐ Users love this feature!",
                type: "social",
            },
            {
                message: "⏰ Last chance! discount ends in 2 days.",
                type: "urgent",
            },
        ],
    },
};

export default defaultCustomize;
