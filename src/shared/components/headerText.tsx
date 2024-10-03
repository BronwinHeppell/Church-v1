import { merriweather } from '../core/fonts';

type Props = {
    text: string;
    className?: string;
};

export function HeaderText({ text, className }: Props) {
    return <h1 className={`${merriweather.className} ${className} text-2xl sm:text-4xl`}>{text}</h1>;
}

export function SubHeaderText({ text, className }: Props) {
    return <h2 className={`${className} sm:text-md text-sm font-semibold`}>{text}</h2>;
}
