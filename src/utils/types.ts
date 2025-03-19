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
	position: Position;
	size: Size;
	isSelected: boolean;
}

export interface FormDataProps {
	message: string;
	screenshot: Blob | null;
}

export type FormSubmitHandler = (data: FormDataProps) => Promise<boolean>;

export interface WidgetCustomizeProps {
	form?: {
		className?: string;
		messageInput?: {
			placeholder?: string;
		};
		submitButton?: { label?: string };
		cancelButton?: { label?: string };
	};
	island?: {
		direction?: "left" | "right";
		className?: string;
		label?: string;
	};
}

export interface RoastWidgetContextType {
	mode?: "local" | "remote";
	active: boolean;
	disable: boolean;
	selected: SelectedElement;
	toggleActive: () => void;
	customize?: WidgetCustomizeProps | undefined;
	windowSize: Size;
	onFormSubmit?: FormSubmitHandler;
	unSelectElement: () => void;
	elementImageBlob: Blob | null;
	avoidElementClassName: string;
}

// Widget Provider

export interface BaseWidgetProviderProps {
	customize?: WidgetCustomizeProps;
	children: ReactNode;
	disable?: boolean;
}

export interface LocalWidgetProviderProps extends BaseWidgetProviderProps {
	mode: "local";
	onFormSubmit: FormSubmitHandler;
}

export interface RemoteWidgetProviderProps extends BaseWidgetProviderProps {
	mode?: "remote";
	onFormSubmit?: FormSubmitHandler;
}

export type WidgetProviderProps = LocalWidgetProviderProps | RemoteWidgetProviderProps;
