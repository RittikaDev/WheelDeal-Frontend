import { Sun, Moon, Monitor } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

import { useTheme } from "../../hooks/useTheme";

import { Theme } from "../../types";

export const ThemeSwitcher = () => {
	const { setTheme } = useTheme();

	const handleThemeChange = (theme: Theme) => {
		setTheme(theme);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="" size={"icon"}>
					<Sun className="h-5 w-5 transition-transform dark:rotate-90 dark:scale-0" />
					<Moon className="h-5 w-5 absolute transform rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Switch Theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleThemeChange("light")}>
					<Sun className="h-4 w-4" /> <span>Light Theme</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("dark")}>
					<Moon className="h-4 w-4" /> <span>Dark Theme</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("system")}>
					<Monitor className="h-4 w-4" /> <span>System Default</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
