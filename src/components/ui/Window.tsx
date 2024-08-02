import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface WindowProps {
	title: string;
	onClose: () => void;
	onReduce: () => void;
	children: ReactNode;
	zIndex: number;
	onFocus: () => void;
	isOpen: boolean;
	isReducing: boolean;
	screenSize: { width: number; height: number };
}

const windowVariants = {
	open: ({ x, y }: { x: number; y: number }) => ({
		scale: 1,
		opacity: 1,
		x,
		y,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			y: { type: "spring", stiffness: 500, damping: 30 },
		},
	}),
	closedExit: {
		scale: 0.5,
		opacity: 0,
		y: "100%",
		transition: { duration: 0.2 },
	},
	reducedExit: {
		scale: 0.2,
		opacity: 0,
		y: "100vh",
		transition: { duration: 0.3 },
	},
};

export const Window: FC<WindowProps> = ({
	title,
	onClose,
	onReduce,
	children,
	zIndex,
	onFocus,
	isOpen,
	isReducing,
	screenSize,
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [position, setPosition] = useState(() => {
		const centerX = window.innerWidth / 2 - 200;
		const centerY = window.innerHeight / 2 - 150;
		return {
			x: centerX + (Math.random() - 0.5) * 100,
			y: centerY + (Math.random() - 0.5) * 100,
		};
	});

	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isOpen) {
			if (isInitialMount.current) {
				onFocus();
				isInitialMount.current = false;
			}
		} else {
			isInitialMount.current = true;
		}
	}, [isOpen, onFocus]);

	const handleMouseDown = useCallback(
		(e: MouseEvent) => {
			onFocus();
			e.stopPropagation();
		},
		[onFocus],
	);

	const handleDragEnd = useCallback(() => {
		setIsDragging(false);
	}, []);

	const toggleFullScreen = useCallback(() => {
		setIsFullScreen(!isFullScreen);
	}, [isFullScreen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					drag={!isFullScreen}
					dragMomentum={false}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={handleDragEnd}
					className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
					variants={windowVariants}
					custom={position}
					initial={{
						...position,
						y: window.innerHeight / 2,
						opacity: 0,
						scale: 0.5,
					}}
					animate={{
						...windowVariants.open({ x: position.x, y: position.y }),
						...(isFullScreen
							? {
									x: 0,
									y: 0,
									width: screenSize.width,
									height: screenSize.height,
								}
							: { width: "400px", height: "300px" }),
					}}
					exit={isReducing ? "reducedExit" : "closedExit"}
					onMouseDown={() => handleMouseDown}
					style={{
						zIndex,
					}}
				>
					<div
						className="bg-gray-200 px-4 py-2 flex justify-between items-center cursor-move"
						onMouseDown={() => handleMouseDown}
					>
						<h2 className="text-sm font-semibold">{title}</h2>
						<div className="flex items-center">
							<button
								type="button"
								onClick={toggleFullScreen}
								className="text-gray-500 hover:text-gray-700 mr-2"
								style={{ pointerEvents: isDragging ? "none" : "auto" }}
							>
								{isFullScreen ? (
									<Minimize2 size={16} />
								) : (
									<Maximize2 size={16} />
								)}
							</button>
							<button
								type="button"
								onClick={onReduce}
								className="text-gray-500 hover:text-gray-700 mr-2"
								style={{ pointerEvents: isDragging ? "none" : "auto" }}
							>
								<Minus size={16} />
							</button>
							<button
								type="button"
								onClick={onClose}
								className="text-gray-500 hover:text-gray-700"
								style={{ pointerEvents: isDragging ? "none" : "auto" }}
							>
								<X size={16} />
							</button>
						</div>
					</div>
					<div
						className={`p-4 overflow-auto ${isFullScreen ? "h-[calc(100%-40px)]" : "h-[calc(300px-40px)]"}`}
					>
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
