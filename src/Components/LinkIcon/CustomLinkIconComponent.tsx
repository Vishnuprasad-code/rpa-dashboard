import { SvgIconProps } from "@mui/material";

interface CustomLinkIconComponentPropsType {
    href: string;
    icon: React.ReactElement<SvgIconProps>
}

export function CustomLinkIconComponent(props: CustomLinkIconComponentPropsType) {

    return <a href={props.href} target="_blank">
        {props.icon}
    </a>
}