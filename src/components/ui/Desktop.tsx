import { type PanInfo, motion } from "framer-motion";
import { Bird, Grid, type LucideProps, Octagon, Phone } from "lucide-react";
import type { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { useEffect, useRef, useState } from "react";
import { useWindowStore } from "../../store/window-store";
import { Noclip } from "../windows/Noclip";
import { Window } from "../windows/Window.tsx";

interface Icon {
	id: number;
	name: string;
	Icon: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>;
	setter: (state: boolean) => void;
}

interface Position {
	x: number;
	y: number;
}

interface WindowState {
	id: string;
	zIndex: number;
}

const getRandomPosition = (
	containerWidth: number,
	containerHeight: number,
): Position => ({
	x: Math.random() * (containerWidth - 100),
	y: Math.random() * (containerHeight - 100),
});

export const Desktop: FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
	const [iconPositions, setIconPositions] = useState<Position[]>([]);
	const [windowStates, setWindowStates] = useState<WindowState[]>([]);
	const [highestZIndex, setHighestZIndex] = useState(0);
	const {
		isNoclipOpen,
		setIsNoclipOpen,
		isOctantOpen,
		setIsOctantOpen,
		isPhonyOpen,
		setIsPhonyOpen,
		isApusOpen,
		setIsApusOpen,
	} = useWindowStore();

	const icons: Icon[] = [
		{ id: 1, name: "Noclip", Icon: Grid, setter: setIsNoclipOpen },
		{ id: 2, name: "Octant", Icon: Octagon, setter: setIsOctantOpen },
		{ id: 3, name: "Phony Game", Icon: Phone, setter: setIsPhonyOpen },
		{ id: 4, name: "Apus", Icon: Bird, setter: setIsApusOpen },
	];

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

	const handleIconClick = (icon: Icon) => {
		icon.setter(true);
		focusWindow(icon.name);
	};

	const focusWindow = (id: string) => {
		setHighestZIndex((prev) => prev + 1);
		setWindowStates((prev) => {
			const newStates = prev.filter((state) => state.id !== id);
			return [...newStates, { id, zIndex: highestZIndex + 1 }];
		});
	};

	const getWindowZIndex = (id: string) => {
		const windowState = windowStates.find((state) => state.id === id);
		return windowState ? windowState.zIndex : 0;
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
					onClick={() => handleIconClick(icon)}
				>
					<icon.Icon className="w-8 h-8 text-blue-600" />
					<span className="mt-1 text-xs text-center text-gray-700">
						{icon.name}
					</span>
				</motion.div>
			))}
			{isNoclipOpen && (
				<Window
					title="Noclip"
					onClose={() => setIsNoclipOpen(false)}
					zIndex={getWindowZIndex("Noclip")}
					onFocus={() => focusWindow("Noclip")}
				>
					<Noclip />
				</Window>
			)}
			{isOctantOpen && (
				<Window
					title="Octant"
					onClose={() => setIsOctantOpen(false)}
					zIndex={getWindowZIndex("Octant")}
					onFocus={() => focusWindow("Octant")}
				>
					<div>Octant Content</div>
				</Window>
			)}
			{isPhonyOpen && (
				<Window
					title="Phony Game"
					onClose={() => setIsPhonyOpen(false)}
					zIndex={getWindowZIndex("Phony Game")}
					onFocus={() => focusWindow("Phony Game")}
				>
					<div>Phony Game Content</div>
				</Window>
			)}
			{isApusOpen && (
				<Window
					title="Apus"
					onClose={() => setIsApusOpen(false)}
					zIndex={getWindowZIndex("Apus")}
					onFocus={() => focusWindow("Apus")}
				>
					<div>Apus Content</div>
				</Window>
			)}
		</motion.div>
	);
};
