import { HStack, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsBattery, BsBatteryHalf, BsBatteryFull } from 'react-icons/bs'
import { FiBatteryCharging } from 'react-icons/fi'
import { getBattery, getBatteryStatus } from '../providers/cmd'

const BatteryIcon = (level, isCharging) => {
    let LevelIcon = BsBattery

    if (level > 50) LevelIcon = BsBatteryFull
    else LevelIcon = BsBatteryHalf
    if (level <= 10) LevelIcon = BsBattery

    return isCharging ? (
        <Icon as={FiBatteryCharging} color='text' />
    ) : (
        <Icon as={LevelIcon} color='text' />
    )
}

const Battery = () => {
    const [isBattery, setIsBattery] = useState(false)
    const [batteryLevel, setBatteryLevel] = useState(100)
    const [batteryCharging, setBatteryCharging] = useState('charging')

    useEffect(() => {
        const checkStatus = () => {
            getBattery()
                .then((level) => {
                    if (level !== null) {
                        level = level.match(/\d+/)[0]
                        setBatteryLevel(parseInt(level))
                        setIsBattery(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setIsBattery(false)
                })

            if (isBattery) {
                getBatteryStatus()
                    .then((status) => {
                        setBatteryCharging(new Boolean(status.trim()).valueOf())
                    })
                    .catch((err) => {
                        console.log(err)
                        setBatteryCharging(false)
                    })
            }
        }
        const interval = setInterval(checkStatus, 10000)
        checkStatus()

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {isBattery && (
                <HStack>
                    {BatteryIcon(batteryLevel, batteryCharging)}
                    <Text color='text' fontWeight='bold'>
                        {batteryLevel}%
                    </Text>
                </HStack>
            )}
        </>
    )
}

export default Battery
