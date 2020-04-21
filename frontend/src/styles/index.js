import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    font-family: Trebuchet, sans-serif;
    font-size: 16px;
    box-sizing: border-box;
    }
    html {
    	height: 100vh;
    }
    body {
    	height: 100%;
    }
    #root {
    	height: 100%;
    	display: flex;
    	justify-content: center;
		background-color: #ffffff;
		}
`;

export const theme = {
	colors: {
		status: {
			requestedold: "rgba(0,0,255,1)",
			requested: "rgb(255,191,0)",
			open: "rgba(0,179,0,1)",
			warning: "#ffbf00",
			closed: "rgba(0,0,0,1)",
			rejected: "rgba(255,0,0,1)",
		},
	},
	colorsOpaque: {
		status: {
			requestedold: "rgba(0,0,255,0.71)",
			requested: "rgba(255,191,0,0.71)",
			open: "rgba(0,179,0,0.71)",
			warning: "#ffbf00",
			closed: "rgba(0,0,0,0.81)",
			rejected: "rgba(255,0,0,0.71)",
		},
	},
};
