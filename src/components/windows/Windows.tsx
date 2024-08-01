import { useState } from "react";
import { useWindowStore } from "../../react-store/window-store.ts";
import { apus, noclip, octant, phony } from "../../utils/projects.tsx";
import { Window } from "../ui/Window.tsx";
import { Noclip } from "./Noclip.tsx";

interface WindowState {
	id: string;
	zIndex: number;
}

export const Windows = () => {
	const [windowStates, setWindowStates] = useState<WindowState[]>([]);
	const [highestZIndex, setHighestZIndex] = useState(0);
	const [reducingWindow, setReducingWindow] = useState<string | null>(null);

	const {
		noclip: { isOpen: isNoclipOpen },
		octant: { isOpen: isOctantOpen },
		phony: { isOpen: isPhonyOpen },
		apus: { isOpen: isApusOpen },
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

	const handleReduce = (id: string) => {
		setReducingWindow(id);
		setTimeout(() => {
			toggleWindow(id);
			setReducingWindow(null);
		}, 50);
	};

	return (
		<>
			<Window
				title={noclip.title}
				onClose={() => closeWindow(noclip.id)}
				onReduce={() => handleReduce(noclip.id)}
				zIndex={getWindowZIndex(noclip.id)}
				onFocus={() => focusWindow(noclip.id)}
				isOpen={isNoclipOpen}
				isReducing={reducingWindow === noclip.id}
			>
				<Noclip />
			</Window>
			<Window
				title={octant.title}
				onClose={() => closeWindow(octant.id)}
				onReduce={() => handleReduce(octant.id)}
				zIndex={getWindowZIndex(octant.id)}
				onFocus={() => focusWindow(octant.id)}
				isOpen={isOctantOpen}
				isReducing={reducingWindow === octant.id}
			>
				ciao
				{/*<Octant />*/}
			</Window>
			<Window
				title={phony.title}
				onClose={() => closeWindow(phony.id)}
				onReduce={() => handleReduce(phony.id)}
				zIndex={getWindowZIndex(phony.id)}
				onFocus={() => focusWindow(phony.id)}
				isOpen={isPhonyOpen}
				isReducing={reducingWindow === phony.id}
			>
				{/*<Phony />*/}
			</Window>
			<Window
				title={apus.title}
				onClose={() => closeWindow(apus.id)}
				onReduce={() => handleReduce(apus.id)}
				zIndex={getWindowZIndex(apus.id)}
				onFocus={() => focusWindow(apus.id)}
				isOpen={isApusOpen}
				isReducing={reducingWindow === apus.id}
			>
				ciao
				{/*<Apus />*/}
			</Window>
		</>
	);
};
