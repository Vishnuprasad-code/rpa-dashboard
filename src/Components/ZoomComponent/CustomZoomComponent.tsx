import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "./ZoomComponent.scss"


export default function CustomZoomPinchComponent(props: any){
return (
    <TransformWrapper initialPositionY={props.initialPositionY}>
        <TransformComponent wrapperClass="zoom-component" contentClass="zoom-component">
            {props.children}
        </TransformComponent>
    </TransformWrapper>
)
};