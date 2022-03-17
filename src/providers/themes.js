import { extendTheme } from '@chakra-ui/react'

/*
 *
 * General
 *
 */
const globalStyle = {
    styles: {
        global: (_props) => ({
            body: {
                bg: 'transparent',
            },
        }),
    },
}

/*
 *
 * Themes
 *
 */
const light = extendTheme({
    colors: {
        background: '#f5f5f5',
        text: '#404040',
        primary: '#eaeaea',
        secondary: '#eaeaee',
        highlight: '#606060',
        warning: '#EBCB8B',
        success: '#A3BE8C',
        danger: '#BF616A',
    },
    styles: globalStyle.styles,
})

const dark = extendTheme({
    colors: {
        background: '#2e3440',
        text: '#d8dee9',
        primary: '#3B4252',
        secondary: '#434C5E',
        highlight: '#4C566A',
        warning: '#EBCB8B',
        success: '#A3BE8C',
        danger: '#BF616A',
    },
    styles: globalStyle.styles,
})

export { light, dark }
