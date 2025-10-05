import { FC, PropsWithChildren } from "react";
import { StyledTextProps } from "./types";

const StyledText: FC<PropsWithChildren<StyledTextProps>> = props => {
  const clsString = props.extraClass?.join(' ') || '';
  return (
    <span className={`text text_type_${props.type}-${props.size} ${clsString}`}>
      {props.children}
    </span>
  )
};

export default StyledText;

