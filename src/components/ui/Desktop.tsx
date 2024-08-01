import { type PanInfo, motion } from "framer-motion";
import type { LucideProps } from "lucide-react";
import type { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { useEffect, useRef, useState } from "react";
import { useWindowStore } from "../../react-store/window-store";
import { type Project, projects } from "../../utils/projects.tsx";
import { Windows } from "../windows/Windows.tsx";

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
	const [isDragging, setIsDragging] = useState(false);
	const { toggleWindow } = useWindowStore();

	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				const { width, height } = containerRef.current.getBoundingClientRect();
				setContainerSize({ width, height });
				setIconPositions(projects.map(() => getRandomPosition(width, height)));
			}
		};

		updateSize();
		window.addEventListener("resize", updateSize);

		return () => window.removeEventListener("resize", updateSize);
	}, []);

	const onDragStart = () => {
		setIsDragging(true);
	};

	const onDragEnd = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
		index: number,
	) => {
		setIsDragging(false);
		setIconPositions((prevPositions) => {
			const newPositions = [...prevPositions];
			newPositions[index] = { x: info.point.x, y: info.point.y };
			return newPositions;
		});
	};

	const handleIconClick = (project: Project) => {
		if (!isDragging) {
			toggleWindow(project.id);
		}
	};

	return (
		<motion.div
			ref={containerRef}
			className="relative w-full h-full bg-blue-100 overflow-hidden"
		>
			{projects.map((project, index) => (
				<motion.div
					key={project.id}
					className={`absolute flex flex-col items-center justify-center w-20 h-20 ${
						isDragging ? "cursor-move" : "hover:cursor-pointer"
					}`}
					initial={iconPositions[index] || { x: 0, y: 0 }}
					animate={iconPositions[index] || { x: 0, y: 0 }}
					drag
					dragMomentum={false}
					dragConstraints={containerRef}
					onDragStart={onDragStart}
					onDragEnd={(event, info) => onDragEnd(event, info, index)}
					onClick={() => handleIconClick(project)}
				>
					{project.desktopIcon}
					<p className="text-xs">{project.title}</p>
				</motion.div>
			))}
			<Windows />
		</motion.div>
	);
};
