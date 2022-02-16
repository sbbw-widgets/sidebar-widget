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
import { useState } from 'react'

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
    const [playing, setPlaying] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <>
            {playing && (
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
                                MediaCt asdhkasld lkaskd ashkldasjdskhd kashl
                            </Text>
                            <Center>
                                <HStack spacing={1}>
                                    <CustomIconButton
                                        icon={<BsFillSkipBackwardFill />}
                                    />
                                    <CustomIconButton
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        icon={
                                            isPlaying ? (
                                                <BsFillPauseFill />
                                            ) : (
                                                <BsFillPlayFill />
                                            )
                                        }
                                    />
                                    <CustomIconButton
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
