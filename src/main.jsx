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
import { dark } from './providers/themes'
import Clock from './components/clock'
import SliderValue from './components/slider'
import MediaCtl from './components/mediactl'
import { BsBrightnessHigh, BsSoundwave } from 'react-icons/bs'
import Battery from './components/battery'
import Power from './components/power'
import { getBrightness, setBrightness } from '@sbbw/api/brightness'

const App = () => {
    const [canBrightness, setCanBrightness] = useState(false)
    const [brightness, setBrightnessValue] = useState(0)
    const [canSound, _setCanSound] = useState(false)
    const [volume, _setVolumeValue] = useState(0.0)

    const handleChangeBrightness = (v) => {
        console.log('handleChangeBrightness', v)
        // window.rpc.call("brightness.set_main", v)
        setBrightness(v)
            .then((data) => {
                console.log(data)
                setBrightnessValue(v)
            })
            .catch(console.log)
    }

    const handleChangeVolume = (v) => {
        console.log('handleChangeVolume', v / 100)
        // setVolume(v / 100).then(console.log).catch(console.error)
    }

    useEffect(() => {
        getBrightness()
            .then((device) => {
                console.log('getBrightness', device.value)
                setCanBrightness(true)
                setBrightnessValue(device.value)
            })
            .catch((err) => {
                console.log('Get Brightness Error', err)
                setCanBrightness(false)
            })

        // getVolume()
        //     .then((level) => {
        //         console.log('getVolume', level, level * 100)
        //         setCanSound(true)
        //         setVolumeValue(level * 100)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         setCanSound(false)
        //     })

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
    return (
        <ChakraProvider resetCSS width='100vw' height='100vh' theme={dark}>
            <Slide direction='left' in mountOnEnter unmountOnExit>
                <App />
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
