import { SvgIconProps } from "../types";

export const SvgIcon = ({ src, width = "24px", height = "24px" }: SvgIconProps) => {
    return (
        <img
            src={`/img/svg/${src}`}
            alt={src.replace(".svg", "")} 
            width={width}
            height={height}
            style={{ display: "inline-block" }}
        />
    );
};

