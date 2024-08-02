import { type FC, useState } from "react";
import { useWindowStore } from "../../react-store/window-store.ts";
import type { ProjectId } from "../../react-utils/project-types.ts";
import { projects } from "../../react-utils/projects.tsx";
import { Window } from "../ui/Window.tsx";

interface State {
	id: string;
	zIndex: number;
}

interface Position {
	x: number;
	y: number;
}

interface WindowsProps {
	desktopSize: { width: number; height: number };
}

export const Windows: FC<WindowsProps> = ({ desktopSize }) => {
	const [windowStates, setWindowStates] = useState<State[]>([]);
	const [highestZIndex, setHighestZIndex] = useState(0);
	const [reducingWindow, setReducingWindow] = useState<string | null>(null);

	const { toggleWindow, closeWindow } = useWindowStore();

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

	const handleReduce = (id: ProjectId) => {
		setReducingWindow(id);
		setTimeout(() => {
			toggleWindow(id);
			setReducingWindow(null);
		}, 150);
	};

	return projects.map((project) => {
		const isOpen = useWindowStore((state) => state[project.id].isOpen);
		return (
			<Window
				key={project.id}
				title={project.title}
				onClose={() => closeWindow(project.id)}
				onReduce={() => handleReduce(project.id)}
				zIndex={getWindowZIndex(project.id)}
				onFocus={() => focusWindow(project.id)}
				isOpen={isOpen}
				isReducing={reducingWindow === project.id}
				screenSize={desktopSize}
			>
				{project.content}
			</Window>
		);
	});
};
