import { useContext } from "react";
import { RoastWidgetContext } from "../utils/context";

const useRoastWidget = () => {
	const context = useContext(RoastWidgetContext);
	if (!context) throw new Error("useRoastWidget must be used within a WidgetProvider");
	return context;
};

export default useRoastWidget;
