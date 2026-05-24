import { useState } from 'react'

const Bg = (props) => {
    return(
        <div className="Wrapper min-h-screen w-full h-full bg-background text-foreground flex items-center justify-center p-4">
            {props.children}{}
        </div>
    )
}

export default Bg;