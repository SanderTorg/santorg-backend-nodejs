export interface Games {
  id: string | number;
  title: string;
  genre: string;
  releaseYear: number;
  price?: number;
  rating?: number;
}

const gamesList: Games[] = [
  {
    id: "1",
    title: "The Legend of Zelda",
    genre: "Adventure",
    releaseYear: 1986,
    price: 59.99,
    rating: 4.9,
  },
  {
    id: "2",
    title: "Super Mario Bros.",
    genre: "Platformer",
    releaseYear: 1985,
    price: 39.99,
    rating: 4.8,
  },
  {
    id: "3",
    title: "Minecraft",
    genre: "Sandbox",
    releaseYear: 2011,
    price: 29.99,
    rating: 4.7,
  },
  {
    id: "4",
    title: "Valorant",
    genre: "Shooter",
    releaseYear: 2020,
    price: 0,
    rating: 4.5,
  },
  {
    id: "5",
    title: "Counter Strike",
    genre: "Shooter",
    releaseYear: 2000,
    price: 14.99,
    rating: 4.6,
  },
  {
    id: "6",
    title: "FIFA 23",
    genre: "Sports",
    releaseYear: 2022,
    price: 69.99,
    rating: 4.0,
  },
];

export default gamesList;
