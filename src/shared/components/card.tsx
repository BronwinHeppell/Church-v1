import Image from 'next/image';
import React from 'react';
import { prefix } from '../core/prefix';

interface CardProps {
	title: string;
	description: string;
	imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow-md">
			<Image
				src={`${prefix}/${imageUrl}`}
				alt=""
				width={389}
				height={482}
				className="h-64 w-full object-cover"
			/>
			<div className="min-h-40 p-6 text-center">
				<h3 className="mb-2 text-xl font-medium">{title}</h3>
				<p className="text-base text-gray-700">{description}</p>
			</div>
		</div>
	);
};

export default Card;
