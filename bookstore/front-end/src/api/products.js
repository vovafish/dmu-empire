

const baseUrl = 'https://api.mercadolibre.com/sites/MLA';

// export  const getDetailsById = function(id) {
//     return new Promise((resolve, reject) => {
//         let url = `${this.baseUrl}/products/${id}`;
//         fetch(url)
//             .then(response => response.json())
//             .then(data => resolve(data))
//             .catch(error => reject(error));
//     });
// }


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