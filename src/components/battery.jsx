import { HStack, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsBattery, BsBatteryHalf, BsBatteryFull } from 'react-icons/bs'
import { FiBatteryCharging } from 'react-icons/fi'
import { getBattery } from '../providers/cmd'

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
    const [batteryCharging, setBatteryCharging] = useState(false)

    useEffect(() => {
        const checkStatus = () => {
            getBattery()
                .then((bat) => {
                    let p = Math.floor(bat.percentage)
                    setBatteryLevel(p)
                    setBatteryCharging(
                        bat.state == 'unknown' || bat.state == 'charging'
                    )
                    setIsBattery(true)
                })
                .catch((err) => {
                    console.log(err)
                    setIsBattery(false)
                })
        }
        const interval = setInterval(checkStatus, 5000)
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
