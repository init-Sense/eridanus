import { type PanInfo, motion } from "framer-motion";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { useWindowStore } from "../react-store/window-store.ts";
import type { Project } from "../react-utils/project-types.ts";
import { projects } from "../react-utils/projects.tsx";
import { Windows } from "./windows/Windows.tsx";

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
	const [iconPositions, setIconPositions] = useState<Record<string, Position>>(
		{},
	);
	const [isDragging, setIsDragging] = useState(false);
	const { toggleWindow, getWindowState, unReduceWindow } = useWindowStore();

	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				const { width, height } = containerRef.current.getBoundingClientRect();
				setContainerSize({ width, height });
				const newPositions: Record<string, Position> = {};
				projects.map((project: Project) => {
					newPositions[project.id] = getRandomPosition(width, height);
				});
				setIconPositions(newPositions);
			}
		};

		updateSize();
		window.addEventListener("resize", updateSize);

		return () => window.removeEventListener("resize", updateSize);
	}, []);

	const onDragEnd = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
		projectId: string,
	) => {
		setIsDragging(false);
		setIconPositions((prevPositions) => ({
			...prevPositions,
			[projectId]: { x: info.point.x, y: info.point.y },
		}));
	};

	const handleIconClick = (project: Project) => {
		if (!isDragging) {
			const windowState = getWindowState(project.id);
			if (!windowState.isOpen && !windowState.isReduced) {
				toggleWindow(project.id);
			} else if (windowState.isReduced) {
				unReduceWindow(project.id);
			}
		}
	};

	return (
		<motion.div
			ref={containerRef}
			className="relative w-full h-full bg-blue-100 overflow-hidden"
		>
			{projects.map((project) => (
				<motion.div
					key={project.id}
					className={`absolute flex flex-col items-center justify-center w-20 h-20 ${
						isDragging ? "cursor-move" : "hover:cursor-pointer"
					}`}
					initial={iconPositions[project.id] || { x: 0, y: 0 }}
					animate={iconPositions[project.id] || { x: 0, y: 0 }}
					drag
					dragMomentum={false}
					dragConstraints={containerRef}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={(event, info) => onDragEnd(event, info, project.id)}
					onClick={() => handleIconClick(project)}
				>
					{project.desktopIcon}
					<p className="text-xs">{project.title}</p>
				</motion.div>
			))}
			<Windows iconPositions={iconPositions} />
		</motion.div>
	);
};
