let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
	baseUrl = 'http://localhost:8000/backend/api/'
} else {
	baseUrl = 'https://cmc-nexus.propulsion-learn.ch/backend/api/'
}

export default baseUrl;
