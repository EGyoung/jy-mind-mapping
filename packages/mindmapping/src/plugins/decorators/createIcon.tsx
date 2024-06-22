import React, { useEffect } from 'react'
import { AddSvg } from "./addSvg"

interface ICreateIcon {
    onClick?: () => void
    key: string
    style: React.CSSProperties
}

const CreateIcon = ({ onClick, style }: ICreateIcon) => {
    const ref = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClick = (e: Event) => {
            e.stopPropagation()
            onClick?.()
        }
        ref.current?.addEventListener('click', handleClick)
        return () => {
            ref.current?.removeEventListener('click', handleClick)
        }
    }, [])
    return (
        <div ref={ref} style={style}>
            {AddSvg}
        </div>
    )
}


export { CreateIcon }