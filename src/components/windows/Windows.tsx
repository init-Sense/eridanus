import { useState } from "react";
import { useWindowStore } from "../../react-store/window-store.ts";
import { apus, noclip, octant, phony } from "../../utils/projects.tsx";
import { Window } from "../Window.tsx";
import { Noclip } from "./Noclip.tsx";

interface State {
	id: string;
	zIndex: number;
}

export const Windows = () => {
	const [windowStates, setWindowStates] = useState<State[]>([]);
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
		setHighestZIndex((prev: number) => prev + 1);
		setWindowStates((prev: State[]) => {
			const newStates = prev.filter((state: State) => state.id !== id);
			return [...newStates, { id, zIndex: highestZIndex + 1 }];
		});
	};

	const getWindowZIndex = (id: string) => {
		const windowState = windowStates.find((state: State) => state.id === id);
		return windowState ? windowState.zIndex : 0;
	};

	const handleReduceWindow = (window: string) => {
		toggleWindow(window);
	};

	return (
		<>
			{isNoclipOpen && (
				<Window
					title={noclip.title}
					onClose={() => closeWindow(noclip.id)}
					onReduce={() => handleReduceWindow(noclip.id)}
					zIndex={getWindowZIndex(noclip.id)}
					onFocus={() => focusWindow(noclip.id)}
				>
					<Noclip />
				</Window>
			)}
			{isOctantOpen && (
				<Window
					title={octant.title}
					onClose={() => closeWindow(octant.id)}
					onReduce={() => handleReduceWindow(octant.id)}
					zIndex={getWindowZIndex(octant.id)}
					onFocus={() => focusWindow(octant.id)}
				>
					<div>Octant Content</div>
				</Window>
			)}
			{isPhonyOpen && (
				<Window
					title={phony.title}
					onClose={() => closeWindow(phony.id)}
					onReduce={() => handleReduceWindow(phony.id)}
					zIndex={getWindowZIndex(phony.id)}
					onFocus={() => focusWindow(phony.id)}
				>
					<div>Phony Game Content</div>
				</Window>
			)}
			{isApusOpen && (
				<Window
					title={apus.title}
					onClose={() => closeWindow(apus.id)}
					onReduce={() => handleReduceWindow(apus.id)}
					zIndex={getWindowZIndex(apus.id)}
					onFocus={() => focusWindow(apus.id)}
				>
					<div>Apus Content</div>
				</Window>
			)}
		</>
	);
};
