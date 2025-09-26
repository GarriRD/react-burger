import { MutableRefObject, RefObject } from "react";
import { IngredientSectionName, TIngredientItem } from "types";
import { ScrollPosition } from "types/scroll";

export type IngredientSectionProps = {
  title: string;
  type: IngredientSectionName;
  ingredientsData: TIngredientItem[];
  scrollRef: MutableRefObject<ScrollPosition | null>;
  sectionRef: RefObject<HTMLElement>;
};