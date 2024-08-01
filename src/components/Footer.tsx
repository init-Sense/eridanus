import { Bird, CircleDotIcon, Grid, Octagon, Phone } from "lucide-react";
import type React from "react";
import { useWindowStore } from "../react-store/window-store.ts";
import { Projects } from "../utils/projects.ts";

export const Footer: React.FC = () => {
	const {
		isNoclipReduced,
		isOctantReduced,
		isPhonyReduced,
		isApusReduced,
		toggleWindow,
	} = useWindowStore();

	const reducedWindows = [
		{ name: Projects.Noclip, icon: Grid, isReduced: isNoclipReduced },
		{ name: Projects.Octant, icon: Octagon, isReduced: isOctantReduced },
		{ name: Projects.Phony, icon: Phone, isReduced: isPhonyReduced },
		{ name: Projects.Apus, icon: Bird, isReduced: isApusReduced },
	];

	return (
		<footer className="flex flex-row bg-gray-800 text-white px-2 py-2 gap-4">
			<CircleDotIcon size={14} />
			{reducedWindows?.map(
				(window) =>
					window.isReduced && (
						<window.icon
							key={window.name}
							size={14}
							className="cursor-pointer hover:text-blue-400"
							onClick={() => toggleWindow(window.name)}
						/>
					),
			)}
		</footer>
	);
};
