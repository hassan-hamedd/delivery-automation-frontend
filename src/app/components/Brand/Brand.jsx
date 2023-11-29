import React from 'react'
// import { MatxLogo } from 'src/app/components'
import { Span } from '../Typography'
import { styled, Box } from '@mui/system'
import useSettings from 'src/app/hooks/useSettings'

const BrandRoot = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 18px 20px 29px',
}))

const StyledSpan = styled(Span)(({ theme, mode }) => ({
    fontSize: 18,
    marginLeft: '.5rem',
    display: mode === 'compact' ? 'none' : 'block',
}))

const Brand = ({ children }) => {
    const { settings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    return (
        <BrandRoot>
            <Box display="flex" alignItems="center">
                {/* <MatxLogo /> */}
                <img src="https://www.strategizeai.com/static/media/LogoDark.a8cf76ad.png" alt="StrategizeAI"  style={{width:'150px'}}/>
                <StyledSpan mode={mode} className="sidenavHoverShow">
                    {/* StrategizeAI */}
                </StyledSpan>
            </Box>
            <Box
                className="sidenavHoverShow"
                sx={{ display: mode === 'compact' ? 'none' : 'block' }}
            >
                {children || null}
            </Box>
        </BrandRoot>
    )
}

export default Brand
