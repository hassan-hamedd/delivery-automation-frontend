import React, { Suspense } from 'react'
import { MatxLoading } from 'src/app/components'

const MatxSuspense = ({ children }) => {
    return <Suspense fallback={<MatxLoading />}>{children}</Suspense>
}

export default MatxSuspense
