import React, { Fragment, StrictMode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
    Box,
    Center,
    ChakraProvider,
    HStack,
    Slide,
    Stack,
    VStack,
} from '@chakra-ui/react'
import {
    catpuccinMorning,
    dark,
    light,
    nord,
    rosePine,
} from './providers/themes'
import Clock from './components/clock'
import SliderValue from './components/slider'
import ThemeSelect from './components/themeselect'
import MediaCtl from './components/mediactl'
import { BsBrightnessHigh, BsSoundwave } from 'react-icons/bs'
import Battery from './components/battery'
import Network from './components/network'
import Power from './components/power'
import {
    getBrightness,
    getVolume,
    setBrightness,
    setVolume,
} from './providers/cmd'

const App = ({ onChangeTheme }) => {
    const [canBrightness, setCanBrightness] = useState(false)
    const [brightness, setBrightnessValue] = useState(0)
    const [canSound, setCanSound] = useState(false)
    const [volume, setVolumeValue] = useState(0)

    const handleChangeBrightness = (v) => {
        console.log('handleChangeBrightness', v)
        setBrightness(v).then(console.log).catch(console.error)
    }

    const handleChangeVolume = (v) => {
        console.log('handleChangeVolume', v)
        setVolume(v).then(console.log).catch(console.error)
    }

    useEffect(() => {
        console.log('useEffect')
        getBrightness()
            .then((level) => {
                level = level.match(/\d+/)[0]
                console.log('getBrightness', level)
                setCanBrightness(true)
                setBrightnessValue(parseInt(level))
            })
            .catch((err) => {
                console.log(err)
                setCanBrightness(false)
            })

        getVolume()
            .then((level) => {
                level = level.match(/\d+/)[0]
                console.log('getVolume', level)
                setCanSound(true)
                setVolumeValue(level)
            })
            .catch((err) => {
                console.log(err)
                setCanSound(false)
            })

        return () => {}
    }, [])

    return (
        <Fragment>
            <Center>
                <VStack
                    width='100%'
                    maxW='100%'
                    height='100vh'
                    px={4}
                    m={0}
                    pt='3rem'
                    bg='background'
                >
                    <Stack mb={7} spacing={4}>
                        <Clock />
                        <ThemeSelect onChangeTheme={onChangeTheme} />
                    </Stack>
                    <MediaCtl />
                    <VStack height='100%' justifyContent='space-between'>
                        <VStack>
                            <Box paddingTop='35px' paddingBottom='35px'>
                                <VStack spacing={4}>
                                    {canBrightness && (
                                        <SliderValue
                                            value={brightness}
                                            onChangeValue={
                                                handleChangeBrightness
                                            }
                                            icon={<BsBrightnessHigh />}
                                            min={10}
                                            max={100}
                                            readOnly={false}
                                        />
                                    )}
                                    {canSound && (
                                        <SliderValue
                                            value={volume}
                                            onChangeValue={handleChangeVolume}
                                            icon={<BsSoundwave />}
                                            min={0}
                                            max={100}
                                            readOnly={false}
                                        />
                                    )}
                                </VStack>
                            </Box>
                            <HStack spacing={10}>
                                <Battery />
                                <Network />
                            </HStack>
                        </VStack>
                        <HStack py={20}>
                            <Power />
                        </HStack>
                    </VStack>
                </VStack>
            </Center>
        </Fragment>
    )
}

const AppTheming = () => {
    const [theme, _setTheme] = useState(nord)

    return (
        <ChakraProvider resetCSS width='100vw' height='100vh' theme={theme}>
            <Slide direction='left' in mountOnEnter unmountOnExit>
                <App onChangeTheme={(_t) => {}} />
            </Slide>
        </ChakraProvider>
    )
}

ReactDOM.render(
    <StrictMode>
        <AppTheming />
    </StrictMode>,
    document.getElementById('root')
)
