import { DotIcon } from "lucide-react";
import type React from "react";
import { useWindowStore } from "../react-store/window-store.ts";
import { apus, noclip, octant, phony } from "../utils/projects.tsx";

export const Footer: React.FC = () => {
	const {
		noclip: { isReduced: isNoclipReduced },
		octant: { isReduced: isOctantReduced },
		phony: { isReduced: isPhonyReduced },
		apus: { isReduced: isApusReduced },
		toggleWindow,
	} = useWindowStore();

	const handleKeyDown = (event: React.KeyboardEvent, id: string) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			toggleWindow(id);
		}
	};

	return (
		<footer className="flex flex-row bg-gray-800 text-white px-2 py-2 gap-4">
			<DotIcon size={16} />
			{isNoclipReduced && (
				<div
					onClick={() => toggleWindow(noclip.id)}
					onKeyDown={(e) => handleKeyDown(e, noclip.id)}
					className="cursor-pointer hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
					tabIndex={0}
					role="button"
					aria-label="Open Noclip"
				>
					{noclip.footerIcon}
				</div>
			)}
			{isOctantReduced && (
				<div
					onClick={() => toggleWindow(octant.id)}
					onKeyDown={(e) => handleKeyDown(e, octant.id)}
					className="cursor-pointer hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
					tabIndex={0}
					role="button"
					aria-label="Open Octant"
				>
					{octant.footerIcon}
				</div>
			)}
			{isPhonyReduced && (
				<div
					onClick={() => toggleWindow(phony.id)}
					onKeyDown={(e) => handleKeyDown(e, phony.id)}
					className="cursor-pointer hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
					tabIndex={0}
					role="button"
					aria-label="Open Phony Game"
				>
					{phony.footerIcon}
				</div>
			)}
			{isApusReduced && (
				<div
					onClick={() => toggleWindow(apus.id)}
					onKeyDown={(e) => handleKeyDown(e, apus.id)}
					className="cursor-pointer hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
					tabIndex={0}
					role="button"
					aria-label="Open Apus"
				>
					{apus.footerIcon}
				</div>
			)}
		</footer>
	);
};
