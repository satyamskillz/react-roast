import { RoastWidgetContextType } from "./types";
import { createContext } from "react";

export const RoastWidgetContext = createContext<RoastWidgetContextType | undefined>(undefined);
