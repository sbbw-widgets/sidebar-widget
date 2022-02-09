import { extendTheme } from "@chakra-ui/react"

/*
    *
    * General
    *
*/
const globalStyle = {
    styles: {
        global: (_props) => ({
            body: {
                bg: "transparent",
            },
        }),
    }
}


/*
    *
    * Themes
    *
*/
const light = extendTheme({
    colors: {
        background: "#f5f5f5",
        text: "#505050",
        primary: "",
        secondary: "",
        highlight: "",
        warning: "#EBCB8B",
        success: "#A3BE8C",
        danger: "#BF616A",
    },
    styles: globalStyle.styles
})

const dark = extendTheme({
    colors: {
        background: "#1f2530",
        text: "#fafafa",
        primary: "",
        secondary: "",
        highlight: "",
        warning: "#EBCB8B",
        success: "#A3BE8C",
        danger: "#BF616A",
    },
    styles: globalStyle.styles
})

const nord = extendTheme({
    colors: {
        background: "#2e3440",
        text: "#d8dee9",
        primary: "#3B4252",
        secondary: "#434C5E",
        highlight: "#4C566A",
        warning: "#EBCB8B",
        success: "#A3BE8C",
        danger: "#BF616A",
    },
    styles: globalStyle.styles
})

const catpuccinMorning = extendTheme({
    colors: {
        background: "#f2cdcd",
        text: "#ddb6f2",
        primary: "#F5C2E7",
        secondary: "#E8A2AF",
        highlight: "#F8BD96",
        warning: "#FAE3B0",
        success: "#ABE9B3",
        danger: "#F28FAD",
    },
    styles: globalStyle.styles
})

const rosePine = extendTheme({
    useSystemColorMode: false,
    colors: {
        background: "#191724",
        text: "#e0def4",
        primary: "#1f1d2e",
        secondary: "#26233a",
        highlight: "#524f67",
        warning: "#f6c177",
        success: "#9ccfd8",
        danger: "#eb6f92",
    },
    styles: globalStyle.styles
})

export {
    light,
    dark,
    nord,
    catpuccinMorning,
    rosePine,
}
