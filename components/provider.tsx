'use client'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import React, { ReactNode } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <TonConnectUIProvider
        manifestUrl='https://tono-abfu.vercel.app/'
        >
            {
                children
            }
        </TonConnectUIProvider>
    )
}

export default Provider
