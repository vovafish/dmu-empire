const API_URL = 'http://localhost:3000';

export async function getBooks() {
    const response = await fetch(`${API_URL}/books`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ email, password,first_name,last_name }),
    });

    const data = await response.json();
    return data;
}



export async function searchBooks(q) {
    const response = await fetch(`${API_URL}/books/search/${q}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ email, password,first_name,last_name }),
    });

    const data = await response.json();
    return data;
}
export const getDetailsById = function (id) {

    return new Promise((resolve, reject) => {
        // return mock json 
        resolve({
            "id": "12345",
            "title": "Example Product",
            "description": "This is an example product description.",
            "price": 9.99,
            "brand": "Example Brand",
            "category": "Example Category",
            "image": "https://example.com/product-image.jpg"
        }
        );
    })
}