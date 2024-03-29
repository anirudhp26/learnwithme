export const colorTokens = {
	grey: {
		0: "#FFFFFF",
		10: "#F6F6F6",
		50: "#F0F0F0",
		100: "#E0E0E0",
		200: "#C2C2C2",
		300: "#A3A3A3",
		400: "#858585",
		500: "#666666",
		600: "#4D4D4D",
		700: "#333333",
		800: "#1A1A1A",
		900: "#0A0A0A",
		1000: "#000000",
	},
	primary: {
		50: "#cfd6ff",
		100: "#c0c9fa",
		200: "#afbbfa",
		300: "#a1b0ff",
		400: "#8d9ffc",
		500: "#788dfa",
		600: "#6e85ff",
		700: "#5974ff",
		800: "#4c68fc",
		900: "#032afc",
	},
	premium: {
		0: "#0D1821",
		100: "#172533",
		200: "#213144",
		300: "#2B3D55",
		400: "#30435E",
		500: "#324662",
		600: "#344966"
	}
};

// mui theme settings
export const themeSettings = (mode) => {
	return {
		palette: {
			mode: mode,
			...(mode === "dark"
				? {
						// palette values for dark mode
						primary: {
							dark: colorTokens.primary[200],
							main: colorTokens.primary[500],
							light: colorTokens.primary[800],
						},
						neutral: {
							white: colorTokens.grey[1000],
							dark: colorTokens.grey[100],
							main: colorTokens.grey[200],
							mediumMain: colorTokens.grey[300],
							medium: colorTokens.grey[400],
							light: colorTokens.grey[700],
						},
						background: {
							default: colorTokens.grey[900],
							alt: colorTokens.grey[800],
						},
						contrast: {
							default: colorTokens.grey[0],
							alt: colorTokens.premium[0],
						}
				  }
				: {
						// palette values for light mode
						primary: {
							dark: colorTokens.primary[700],
							main: colorTokens.primary[500],
							light: colorTokens.primary[50],
						},
						neutral: {
							dark: colorTokens.grey[700],
							main: colorTokens.grey[500],
							mediumMain: colorTokens.grey[400],
							medium: colorTokens.grey[300],
							light: colorTokens.grey[50],
							white: colorTokens.grey[0]
						},
						background: {
							default: colorTokens.grey[0],
							alt: colorTokens.grey[10],
						},
						contrast: {
							default: colorTokens.premium[0],
							alt: colorTokens.premium[600],
						}
				  }),
		},
		typography: {
			fontFamily: ["Rubik", "sans-serif"].join(","),
			fontSize: 12,
			h1: {
				fontFamily: ["JetBrains Mono", "monospace"].join(","),
				fontSize: 40,
			},
			h2: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 32,
			},
			h3: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 24,
			},
			h4: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 20,
			},
			h5: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 16,
			},
			h6: {
				fontFamily: ["Rubik", "sans-serif"].join(","),
				fontSize: 14,
			},
		},
		overrides: {
			MuiFormLabel: {
			  root: {
				"&$focused": {
				  color: colorTokens.grey[1000],
				  fontWeight: "bold"
				}
			  }, 
			  
			  focused: {}
			}
		}
	};
};
