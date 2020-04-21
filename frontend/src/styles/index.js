import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    font-family: Helvetica, sans-serif;
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
			created:"#00f",
			open: "#00b300",
			warning: "#ffbf00",
			closed: "#000",
			rejected: "#f00",
		},
	},
};
