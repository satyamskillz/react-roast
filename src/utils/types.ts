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

export interface FormDataProps {
	message: string;
	screenshot: Blob | null;
}

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
		direction?: "left" | "right";
		className?: string;
		label?: string;
		switchButton?: {
			className?: string;
			thumb?: {
				className?: string;
			};
		};
	};
}

export interface RoastWidgetContextType {
	mode?: "local" | "remote";
	active: boolean;
	siteId?: string;
	disable: boolean;
	selected: SelectedElement;
	customize?: WidgetCustomizeProps | undefined;
	onFormSubmit?: FormSubmitHandler;
	toggleActive: () => void;
	unSelectElement: () => void;
	avoidElementClassName: string;
	elementImageBlob: Blob | null;
	windowSize: Size;
}

// Widget Provider

export interface BaseWidgetProviderProps {
	customize?: WidgetCustomizeProps;
	children: ReactNode;
	disable?: boolean;
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
