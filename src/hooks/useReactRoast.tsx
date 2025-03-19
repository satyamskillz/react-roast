import useRoastWidget from "./useRoastWidget";

const useReactRoast = () => {
	const { active, toggleActive, avoidElementClassName } = useRoastWidget();
	return { isWidgetActive: active, toggleWidget: toggleActive, avoidElementClassName };
};

export default useReactRoast;
