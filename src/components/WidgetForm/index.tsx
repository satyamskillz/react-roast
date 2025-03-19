import useRoastWidget from "../../hooks/useRoastWidget";
import { useState, FormEvent } from "react";
import "./styles.css";
import defaultCustomize from "../../utils/defaultCustomize";

const WidgetForm: React.FC = () => {
	const { mode, customize, onFormSubmit, elementImageBlob, unSelectElement } = useRoastWidget();
	const [isLoading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (mode === "local" && onFormSubmit) {
			setLoading(true);
			const isSubmitted = await onFormSubmit({ message, screenshot: elementImageBlob });
			if (isSubmitted) unSelectElement();
			setLoading(false);
			return;
		}

		const fd = new FormData();
		fd.append("message", message);
		if (elementImageBlob) {
			fd.append("screenshot", elementImageBlob, "screenshot.png");
		}
	};

	const onCancel = () => {
		setMessage("");
		setLoading(false);
		unSelectElement();
	};

	return (
		<form className={`rrn-form ${customize?.form?.className || ""}`} onSubmit={handleSubmit}>
			<div className="form-inputs">
				<textarea
					rows={5}
					required
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder={
						customize?.form?.messageInput?.placeholder ||
						defaultCustomize.form?.messageInput?.placeholder
					}
				/>
			</div>
			<div className="form-btns">
				<button type="button" className="button" onClick={onCancel} disabled={isLoading}>
					{customize?.form?.cancelButton?.label ||
						defaultCustomize?.form?.cancelButton?.label}
				</button>
				<button type="submit" className="submit" disabled={isLoading}>
					{isLoading
						? "Submitting..."
						: customize?.form?.submitButton?.label ||
						  defaultCustomize?.form?.submitButton?.label}
				</button>
			</div>
		</form>
	);
};

export default WidgetForm;
