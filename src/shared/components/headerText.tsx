import { Merriweather } from 'next/font/google';
import React from 'react';

type Props = {
    text: string;
    className?: string;
};

const merriweather = Merriweather({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export function HeaderText({ text, className }: Props) {
    return <h1 className={`${merriweather.className} ${className} text-2xl sm:text-4xl`}>{text}</h1>;
}

export function SubHeaderText({ text, className }: Props) {
    return <h2 className={`${className} sm:text-md text-sm font-semibold text-gray-800`}>{text}</h2>;
}
