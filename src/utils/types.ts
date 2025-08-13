import { ReactNode } from "react";

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface SelectedElement {
    isSelected: boolean;
    position: Position;
    size: Size;
}

export type ToastPlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export type ScreenshotType = "full-screenshot" | "selected-screenshot";

export type ScreenshotBlobs = Array<{
    blob: Blob;
    type: ScreenshotType;
}>;

export interface User {
    id?: string;
    name?: string;
    email: string;
    customData?: Record<string, any>;
}

export interface FormDataProps {
    email?: string;
    message: string;
    screenshotBlobs: ScreenshotBlobs;
}

export interface NotificationMessage {
    message: string;
    type: "info" | "hint" | "offer" | "reward" | "social" | "urgent";
}

export type WidgetPlacement =
    | "left-center"
    | "left-bottom"
    | "right-center"
    | "right-bottom"
    | "bottom-left"
    | "bottom-right";

export type FormSubmitHandler = (data: FormDataProps) => Promise<boolean>;

export interface WidgetCustomizeProps {
    form?: {
        className?: string;
        errorMessage?: string;
        successMessage?: string;
        submitButton?: { label?: string; className?: string };
        cancelButton?: { label?: string; className?: string };
        messageInput?: { placeholder?: string; className?: string };
    };
    island?: {
        placement?: WidgetPlacement;
        className?: string;
        label?: string;
        switchButton?: {
            className?: string;
            thumb?: {
                className?: string;
            };
        };
    };
    notifications?: {
        enable?: boolean;
        messages?: NotificationMessage[];
    };
}

export interface RoastWidgetContextType {
    mode?: "local" | "remote";
    userData?: User;
    active: boolean;
    siteId?: string;
    windowSize: Size;
    IslandHidden: boolean;
    selected: SelectedElement;
    setUser: (user: User) => void;
    screenshotBlobs: ScreenshotBlobs;
    customize?: WidgetCustomizeProps | undefined;
    onFormSubmit?: FormSubmitHandler;
    toggleActive: () => void;
    unSelectElement: () => void;
    setIslandVisiblity: (visible: boolean) => void;
}

// Widget Provider

export interface BaseWidgetProviderProps {
    customize?: WidgetCustomizeProps;
    hideIsland?: boolean;
    children: ReactNode;
}

export interface LocalWidgetProviderProps extends BaseWidgetProviderProps {
    mode: "local";
    siteId?: never;
    onFormSubmit: FormSubmitHandler;
}

export interface RemoteWidgetProviderProps extends BaseWidgetProviderProps {
    siteId: string;
    mode?: "remote";
    onFormSubmit?: never;
}

export type WidgetProviderProps = LocalWidgetProviderProps | RemoteWidgetProviderProps;
