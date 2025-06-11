// src/components/RandomText.tsx
import type { FC } from 'react';

const RandomText: FC = () => {
	// Generate random Lorem Ipsum-like text
	const generateRandomText = (length: number): string => {
		const words = [
			'lorem',
			'ipsum',
			'dolor',
			'sit',
			'amet',
			'consectetur',
			'adipiscing',
			'elit',
			'sed',
			'do',
			'eiusmod',
			'tempor',
			'incididunt',
			'ut',
			'labore',
			'et',
			'dolore',
			'magna',
			'aliqua',
			'enim',
			'ad',
			'minim',
			'veniam',
			'quis',
			'nostrud',
			'exercitation',
			'ullamco',
			'laboris',
			'nisi',
			'aliquip',
			'ex',
			'ea',
			'commodo',
			'consequat',
			'duis',
			'aute',
			'irure',
			'in',
			'reprehenderit',
			'voluptate',
			'velit',
			'esse',
			'cillum',
			'fugiat',
			'nulla',
			'pariatur',
			'excepteur',
			'sint',
			'occaecat',
			'cupidatat',
			'non',
			'proident',
			'sunt',
			'culpa',
			'qui',
			'officia',
			'deserunt',
			'mollit',
			'anim',
			'id',
			'est',
			'laborum',
		];

		let text = '';
		let currentLength = 0;

		while (currentLength < length) {
			const word = words[Math.floor(Math.random() * words.length)];
			const capitalizedWord =
				currentLength === 0 || text.endsWith('. ')
					? word.charAt(0).toUpperCase() + word.slice(1)
					: word;

			text += capitalizedWord;
			currentLength += word.length;

			if (currentLength < length) {
				// Randomly add punctuation
				const random = Math.random();
				if (random < 0.1) {
					text += '. ';
					currentLength += 3;
				} else if (random < 0.15) {
					text += ', ';
					currentLength += 3;
				} else {
					text += ' ';
					currentLength += 1;
				}
			}
		}

		// Ensure it ends with a period and is exactly 1000 characters
		text = text.trim();
		if (text.length > length) {
			text = `${text.substring(0, length - 1)}.`;
		} else if (text.length < length) {
			text = `${text.padEnd(length - 1, ' ')}.`;
		}

		return text;
	};

	const randomText = generateRandomText(2000);

	return (
		<div>
			<p className="text-gray-600 break-words">{randomText}</p>
			<p className="mt-2 text-sm text-gray-400 pb-2">Character count: {randomText.length}</p>
		</div>
	);
};

export default RandomText;
