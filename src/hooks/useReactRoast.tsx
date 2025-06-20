import { avoidElementClassName } from "../utils/classNames";
import useRoastWidget from "./useRoastWidget";

const useReactRoast = () => {
    const { active, toggleActive, setIslandVisiblity } = useRoastWidget();

    return {
        isWidgetActive: active,
        toggleWidget: toggleActive,
        avoidElementClassName,
        setIslandVisiblity,
    };
};

export default useReactRoast;
