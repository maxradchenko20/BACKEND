export type GetProducts = Product[];
export type GetUsers = User[];
interface Product {
    id: number,
    title: string,
}
interface User {
    id: number,
    name: string,
    age: number
}