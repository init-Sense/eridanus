import { useState } from "react";
import { useWindowStore } from "../../react-store/window-store.ts";
import { Projects } from "../../utils/projects.ts";
import { Window } from "../Window.tsx";
import { Noclip } from "./Noclip.tsx";

interface WindowState {
	id: string;
	zIndex: number;
}

export const Windows = () => {
	const [windowStates, setWindowStates] = useState<WindowState[]>([]);
	const [highestZIndex, setHighestZIndex] = useState(0);

	const {
		isNoclipOpen,
		isOctantOpen,
		isPhonyOpen,
		isApusOpen,
		toggleWindow,
		closeWindow,
	} = useWindowStore();

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

	const handleReduceWindow = (window: string) => {
		toggleWindow(window);
	};

	return (
		<>
			{isNoclipOpen && (
				<Window
					title="Noclip"
					onClose={() => closeWindow(Projects.Noclip)}
					onReduce={() => handleReduceWindow(Projects.Noclip)}
					zIndex={getWindowZIndex(Projects.Noclip)}
					onFocus={() => focusWindow(Projects.Noclip)}
				>
					<Noclip />
				</Window>
			)}
			{isOctantOpen && (
				<Window
					title="Octant"
					onClose={() => closeWindow(Projects.Octant)}
					onReduce={() => handleReduceWindow(Projects.Octant)}
					zIndex={getWindowZIndex(Projects.Octant)}
					onFocus={() => focusWindow(Projects.Octant)}
				>
					<div>Octant Content</div>
				</Window>
			)}
			{isPhonyOpen && (
				<Window
					title="Phony Game"
					onClose={() => closeWindow(Projects.Phony)}
					onReduce={() => handleReduceWindow(Projects.Phony)}
					zIndex={getWindowZIndex(Projects.Phony)}
					onFocus={() => focusWindow(Projects.Phony)}
				>
					<div>Phony Game Content</div>
				</Window>
			)}
			{isApusOpen && (
				<Window
					title="Apus"
					onClose={() => closeWindow(Projects.Apus)}
					onReduce={() => handleReduceWindow(Projects.Apus)}
					zIndex={getWindowZIndex(Projects.Apus)}
					onFocus={() => focusWindow(Projects.Apus)}
				>
					<div>Apus Content</div>
				</Window>
			)}
		</>
	);
};
