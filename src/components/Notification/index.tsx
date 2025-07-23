import { avoidElementClassName, buttonElmentClassName, notificationElementClassName } from "../../utils/classNames";
import { autoPlacement, autoUpdate, offset, shift, useFloating } from "@floating-ui/react";
import defaultCustomize from "../../utils/defaultCustomize";
import { useState, useEffect, useCallback } from "react";
import { NotificationMessage } from "../../utils/types";
import useRoastWidget from "../../hooks/useRoastWidget";
import clsx from "clsx";
import "./styles.css";

const Notification: React.FC = () => {
    const [currentMessage, setCurrentMessage] = useState<NotificationMessage | null>(null);
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const { customize, active } = useRoastWidget();

    const messages = customize?.notifications?.messages ?? defaultCustomize.notifications?.messages;

    useEffect(() => {
        const element = document.querySelector(`.${buttonElmentClassName}`) as HTMLElement | null;
        setReferenceElement(element);
    }, []);

    const { refs, floatingStyles, placement } = useFloating({
        elements: { reference: referenceElement },
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(8),
            shift(),
            autoPlacement({
                padding: 5,
                allowedPlacements: ["left", "right", "top-start", "top-end"],
            }),
        ],
    });

    const getRandomMessage = useCallback((): NotificationMessage | undefined => {
        if (!messages?.length) return undefined;
        return messages[Math.floor(Math.random() * messages.length)];
    }, []);

    // Show/hide toast at intervals
    useEffect(() => {
        if (active || !customize?.notifications?.enable) {
            setIsVisible(false);
            return;
        }

        const interval = setInterval(() => {
            const message = getRandomMessage();

            if (!message) {
                setCurrentMessage(null);
                setIsVisible(false);
                return;
            }
            setCurrentMessage(message);
            setIsVisible(true);

            // Hide after 5 seconds
            const timeout = setTimeout(() => setIsVisible(false), 5000);
            return () => clearTimeout(timeout);
        }, 15000); // Show every 15 seconds

        return () => clearInterval(interval);
    }, [getRandomMessage, active, customize?.notifications?.enable]);

    if (!isVisible || !currentMessage) return null;

    return (
        <div
            ref={refs.setFloating}
            data-placement={placement}
            className={clsx(notificationElementClassName, avoidElementClassName)}
            style={{ ...floatingStyles, zIndex: 1000000 }}
        >
            <div className="message" data-type={currentMessage?.type}>
                {currentMessage?.message}
            </div>
        </div>
    );
};

export default Notification;
