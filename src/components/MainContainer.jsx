import React from 'react'

export default function MainContainer({ children }) {
    return (
        <div className="flex-1 overflow-auto">
            <div className="p-8">
                {children}
            </div>
        </div>
    )
}
