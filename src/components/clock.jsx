import { Container, Center, Stack, Text } from '@chakra-ui/react'
import { Fragment, useEffect, useState } from 'react'

const addZero = (num) => (num < 10 ? `0${num}` : num)

const Clock = () => {
    let date = new Date()
    let formatDate = new Intl.DateTimeFormat('default', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    }).format(date)
    const [time, setTime] = useState(
        `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
    )
    const [dateString, setDateString] = useState(`${formatDate}`)

    useEffect(() => {
        const interval = setInterval(() => {
            let date = new Date()
            let formatDate = new Intl.DateTimeFormat('default', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            }).format(date)
            setTime(`${addZero(date.getHours())}:${addZero(date.getMinutes())}`)
            setDateString(`${formatDate}`)
        }, 1000)

        return () => clearInterval(interval)
    }, [time])

    return (
        <Fragment>
            <Container>
                <Stack>
                    <Center>
                        <Text
                            unselectable='on'
                            fontSize='8xl'
                            color='text'
                            fontWeight='bold'
                        >
                            {time}
                        </Text>
                    </Center>
                    <Center>
                        <Text unselectable='on' color='text' fontWeight='bold'>
                            {dateString}
                        </Text>
                    </Center>
                </Stack>
            </Container>
        </Fragment>
    )
}

export default Clock
