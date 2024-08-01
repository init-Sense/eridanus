import { type PanInfo, motion } from "framer-motion";
import { Bird, Grid, type LucideProps, Octagon, Phone } from "lucide-react";
import type { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { useEffect, useRef, useState } from "react";

interface Icon {
	id: number;
	name: string;
	Icon: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>;
}

interface Position {
	x: number;
	y: number;
}

const icons: Icon[] = [
	{ id: 1, name: "Noclip", Icon: Grid },
	{ id: 2, name: "Octant", Icon: Octagon },
	{ id: 3, name: "Phony Game", Icon: Phone },
	{ id: 4, name: "Apus", Icon: Bird },
];

const getRandomPosition = (
	containerWidth: number,
	containerHeight: number,
): Position => ({
	x: Math.random() * (containerWidth - 100),
	y: Math.random() * (containerHeight - 100),
});

export const Home: FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
	const [iconPositions, setIconPositions] = useState<Position[]>([]);

	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				const { width, height } = containerRef.current.getBoundingClientRect();
				setContainerSize({ width, height });
				setIconPositions(icons.map(() => getRandomPosition(width, height)));
			}
		};

		updateSize();
		window.addEventListener("resize", updateSize);

		return () => window.removeEventListener("resize", updateSize);
	}, []);

	const onDragEnd = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
		index: number,
	) => {
		setIconPositions((prevPositions) => {
			const newPositions = [...prevPositions];
			newPositions[index] = { x: info.point.x, y: info.point.y };
			return newPositions;
		});
	};

	return (
		<motion.div
			ref={containerRef}
			className="relative w-full h-full bg-blue-100 overflow-hidden"
		>
			{icons.map((icon, index) => (
				<motion.div
					key={icon.id}
					className="absolute flex flex-col items-center justify-center w-20 h-20 cursor-move"
					initial={iconPositions[index] || { x: 0, y: 0 }}
					animate={iconPositions[index] || { x: 0, y: 0 }}
					drag
					dragMomentum={false}
					dragConstraints={containerRef}
					onDragEnd={(event, info) => onDragEnd(event, info, index)}
				>
					<icon.Icon className="w-8 h-8 text-blue-600" />
					<span className="mt-1 text-xs text-center text-gray-700">
						{icon.name}
					</span>
				</motion.div>
			))}
		</motion.div>
	);
};
