import type { IAppIconProps } from './AppIcon.types'

const AppIcon = (props: IAppIconProps) => {
    return (
        <img width={props.width} height={props.height} src={props.icon} />
    )
}

export default AppIcon
