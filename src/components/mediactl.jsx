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
import { getMediaMetadata, getMediaStatus, setMedia } from '../providers/cmd'

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
    const [isPlaying, setIsPlayingValue] = useState(false)
    const [mediaMetadata, setMediaMetadata] = useState({
        title: 'Not Playing Music',
    })

    const handlePlayPause = () => {
        if (!isPlaying) {
            setMedia('play')
                .then(() => {
                    setIsPlayingValue(true)
                })
                .catch((err) => {
                    setIsPlayingValue(false)
                    console.log(err)
                })
        } else {
            setMedia('pause')
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
        setMedia('next')
            .then(() => {
                setIsPlayingValue(true)
            })
            .catch((err) => {
                setIsPlayingValue(false)
                console.log(err)
            })
    }
    const handlePrevious = () => {
        setMedia('prev')
            .then(() => {
                setIsPlayingValue(true)
            })
            .catch((err) => {
                setIsPlayingValue(false)
                console.log(err)
            })
    }

    useEffect(() => {
        const checkStatus = () => {
            getMediaStatus()
                .then((status) => {
                    console.log('status', status)
                    setIsPlayingValue(status.toLowerCase() == 'playing')
                    if (status.toLowerCase() !== 'playing') {
                        setMediaMetadata({ title: 'Not Playing Music' })
                    } else {
                        getMediaMetadata()
                            .then((rawMetadata) => {
                                console.log('raw metadata', rawMetadata)
                                let metas = rawMetadata.split('\n')
                                let title = ''
                                console.log('metas', metas)
                                for (let i = 0; i < metas.length; i++) {
                                    if (metas[i].includes('xesam:title')) {
                                        console.log(metas[i])
                                        title = metas[i]
                                            .split('xesam:title')[1]
                                            .trim()
                                    }
                                }
                                setMediaMetadata({ title })
                            })
                            .catch(console.error)
                    }
                })
                .catch((err) => {
                    console.log('status', err)
                    setMediaMetadata({ title: 'Not Playing Music' })
                })
        }
        const interval = setInterval(() => checkStatus(), 10000)
        checkStatus()

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <Box pb='1.5rem'>
                <HStack p='5' borderRadius='10px' background='primary'>
                    <Image
                        src={Album}
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
                            {mediaMetadata.title}
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
        </>
    )
}

export default MediaCtl
