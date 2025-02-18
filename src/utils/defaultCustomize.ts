import { WidgetCustomizeProps } from "./types";

const defaultCustomize: WidgetCustomizeProps = {
	form: {
		messageInput: {
			placeholder: "Don't be nice, Just Roast!",
		},
		submitButton: { label: "Roast it" },
		cancelButton: { label: "Cancel" },
	},
	island: {
		direction: "left",
		label: "Roast Mode",
	},
};

export default defaultCustomize;
