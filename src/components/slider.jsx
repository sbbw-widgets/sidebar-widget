import {
    Center,
    Icon,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Stack,
} from '@chakra-ui/react'
import { Fragment, useState } from 'react'

const SliderValue = ({ icon, min, max, value, readOnly, onChangeValue }) => {
    const [valueSlider, setValueSlider] = useState(value)
    const handleChange = (v) => {
        setValueSlider(v)
        if (onChangeValue) onChangeValue(v)
    }

    return (
        <Fragment>
            <Stack
                isInline
                align='center'
                spacing={2}
                justify='center'
                direction='row'
                width='250px'
                mb={2}
            >
                {icon && (
                    <Center width={7} height={7}>
                        <Icon boxSize={7} color='highlight'>
                            {icon}
                        </Icon>
                    </Center>
                )}
                <Slider
                    isReadOnly={readOnly}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    value={valueSlider}
                >
                    <SliderTrack bg='primary'>
                        <SliderFilledTrack bg='highlight' />
                    </SliderTrack>
                    {!readOnly && <SliderThumb bg='highlight' />}
                </Slider>
            </Stack>
        </Fragment>
    )
}

export default SliderValue
