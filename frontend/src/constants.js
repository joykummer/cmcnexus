let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
	baseUrl = 'http://0.0.0.0:8000/backend/api/'
} else {
	baseUrl = ''
}

baseUrl = ''
export default baseUrl;
