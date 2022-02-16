import { Text, HStack, VStack, Icon } from '@chakra-ui/react'
import { MdNetworkWifi } from 'react-icons/md'

const Network = () => {
    return (
        <HStack spacing={4}>
            <Icon as={MdNetworkWifi} color='text' />
            <VStack spacing={0}>
                <Text color='text' fontWeight='bold'>
                    El WIFI
                </Text>
            </VStack>
        </HStack>
    )
}

export default Network
