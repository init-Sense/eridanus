import { motion } from "framer-motion";
import { DotIcon } from "lucide-react";
import type React from "react";
import { useWindowStore } from "../react-store/window-store.ts";
import type { Project, ProjectId } from "../react-utils/project-types.ts";
import { projects } from "../react-utils/projects.tsx";

export const Footer: React.FC = () => {
	const { toggleWindowFromFooter } = useWindowStore();

	const handleIconClick = (id: ProjectId) => {
		toggleWindowFromFooter(id);
	};

	const handleKeyDown = (event: React.KeyboardEvent, id: ProjectId) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleIconClick(id);
		}
	};

	return (
		<footer className="flex flex-row bg-gray-800 text-white px-2 py-2 gap-4">
			<DotIcon size={16} />
			{projects.map((project: Project) => {
				const { isReduced, isOpen } = useWindowStore(
					(state) => state[project.id],
				);

				return (
					<motion.div
						key={project.id}
						onClick={() => handleIconClick(project.id)}
						onKeyDown={(e) => handleKeyDown(e, project.id)}
						className="cursor-pointer hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
						tabIndex={0}
						role="button"
						aria-label={`${isOpen ? "Reduce" : isReduced ? "Restore" : "Open"} ${project.title}`}
						initial={{ opacity: 0.5 }}
						animate={{
							opacity: isReduced || isOpen ? 1 : 0.5,
							scale: isReduced || isOpen ? 1.1 : 1,
						}}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.2 }}
					>
						{project.footerIcon}
					</motion.div>
				);
			})}
		</footer>
	);
};
