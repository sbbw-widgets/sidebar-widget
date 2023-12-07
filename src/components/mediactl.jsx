import {
    Box,
    Center,
    HStack,
    IconButton,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react'
import {
    BsFillPlayFill,
    BsFillPauseFill,
    BsFillSkipBackwardFill,
    BsFillSkipForwardFill,
} from 'react-icons/bs'
import DefaultAlbum from '../assets/default_album.png'
import Album from '../assets/album.png'

import '../index.css'
import { useEffect, useState } from 'react'
import {
    isPlayerActive,
    setNext,
    getState,
    setPlayPause,
    setPrev,
} from '../providers/cmd'

const CustomIconButton = ({ icon, onClick }) => {
    return (
        <IconButton
            variant='ghost'
            _hover={{ background: 'transparent' }}
            icon={icon}
            color='highlight'
            colorScheme='highlight'
            size='lg'
            onClick={onClick}
        />
    )
}

const MediaCtl = () => {
    const [hasPlayer, setHasPlayer] = useState(false)
    const [isPlaying, setIsPlayingValue] = useState(false)
    const [mediaMetadata, setMediaMetadata] = useState(null)

    const handlePlayPause = () => {
        if (!isPlaying) {
            setPlayPause(true)
                .then(() => {
                    setIsPlayingValue(true)
                })
                .catch((err) => {
                    setIsPlayingValue(false)
                    console.log(err)
                })
        } else {
            setPlayPause(false)
                .then(() => {
                    setIsPlayingValue(false)
                })
                .catch((err) => {
                    setIsPlayingValue(false)
                    console.log(err)
                })
        }
    }
    const handleNext = () => {
        setNext()
            .then((data) => {
                console.log(data)
                setMediaMetadata(data)
                setIsPlayingValue(true)
            })
            .catch((err) => {
                setIsPlayingValue(false)
                setMediaMetadata(null)
                console.log(err)
            })
    }
    const handlePrevious = () => {
        setPrev()
            .then((data) => {
                console.log(data)
                setMediaMetadata(data)
                setIsPlayingValue(true)
            })
            .catch((err) => {
                setIsPlayingValue(false)
                setMediaMetadata(null)
                console.log(err)
            })
    }

    useEffect(() => {
        const checkStatus = () => {
            isPlayerActive()
                .then((active) => {
                    setHasPlayer(active)
                    if (active)
                        getState()
                            .then((data) => {
                                setMediaMetadata(data)
                            })
                            .catch((e) => {
                                console.log(e)
                                setMediaMetadata(null)
                            })
                })
                .catch((e) => {
                    console.log(e)
                    setHasPlayer(false)
                })
        }
        const interval = setInterval(() => checkStatus(), 1000)
        checkStatus()

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {hasPlayer && mediaMetadata && (
                <Box pb='1.5rem'>
                    <HStack p='5' borderRadius='10px' background='primary'>
                        <Image
                            src={mediaMetadata.metadata.art_url}
                            htmlWidth='80px'
                            htmlHeight='80px'
                            borderRadius='10%'
                            fallbackSrc={DefaultAlbum}
                        />
                        <VStack width='200px' overflow='hidden' spacing='2'>
                            <Text
                                className='media_name_animated'
                                whiteSpace='nowrap'
                                display='inline-flex'
                                color='text'
                                align='center'
                            >
                                {mediaMetadata.metadata.title}
                            </Text>
                            <Center>
                                <HStack spacing={1}>
                                    <CustomIconButton
                                        onClick={handlePrevious}
                                        icon={<BsFillSkipBackwardFill />}
                                    />
                                    <CustomIconButton
                                        onClick={handlePlayPause}
                                        icon={
                                            isPlaying ? (
                                                <BsFillPauseFill />
                                            ) : (
                                                <BsFillPlayFill />
                                            )
                                        }
                                    />
                                    <CustomIconButton
                                        onClick={handleNext}
                                        icon={<BsFillSkipForwardFill />}
                                    />
                                </HStack>
                            </Center>
                        </VStack>
                    </HStack>
                </Box>
            )}
        </>
    )
}

export default MediaCtl
