import { avoidElementClassName } from "../utils/classNames";
import useRoastWidget from "./useRoastWidget";

const useReactRoast = () => {
    const { active, toggleActive, setIslandVisiblity, setUser } = useRoastWidget();

    return {
        isWidgetActive: active,
        toggleWidget: toggleActive,
        avoidElementClassName,
        setIslandVisiblity,
        setUser,
    };
};

export default useReactRoast;
