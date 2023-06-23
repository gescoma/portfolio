import 'astro/astro-jsx'

declare global {
    namespace JSX {
        type Element = (_props: Props) => any
        // type Element = astroHTML.JSX.Element // We want to use this, but it is defined as any.
        type IntrinsicElements = astroHTML.JSX.IntrinsicElements
        type Component = (_props: Props) => any
    }
}