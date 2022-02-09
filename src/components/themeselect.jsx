import { Center, Icon, Stack, theme } from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { light, dark, nord } from "../providers/themes"

const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props} style={{cursor: 'pointer'}}>
        <path
            fill='currentColor'
            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        />
    </Icon>
)

const themes = [
    { name: "light", color: "#fafaf", theme: light },
    { name: "dark", color: "#1f2530", theme: dark },
    { name: "nord", color: "#4C566A", theme: nord },
    { name: "catpuccin-morning", color: "#f2cdcd", theme },
    { name: "rose-pine", color: "#c4a7a7", theme },
]

// made storable theme in local storage
const ThemeSelect = ({ onChangeTheme }) => {
    if (onChangeTheme)
        onChangeTheme(JSON.parse(localStorage.getItem("theme")) || themes[0].theme)

    const handleChange = (t) => {
        localStorage.setItem("theme", JSON.stringify(t))
        onChangeTheme(t)
    }

    return (
        <Fragment>
            <Center>
                <Stack isInline spacing={4}>
                    {themes.map((t) => (
                        <CircleIcon
                            key={t.name}
                            size='24px'
                            color={t.color}
                            onClick={() => handleChange(t.theme)}
                        />
                    ))}
                </Stack>
            </Center>
        </Fragment>
    )
}

export default ThemeSelect
