export type TCartItem = {
	carId: string;
	quantity: number;
};

export interface ICarGalleryImage {
	url: string;
}

export interface ICar {
	_id: string;
	name: string;
	description: string;
	image: string;
	brand: string;
	model: string;
	type: string;
	category: string;
	year: number;
	price: number;
	color: string;
	rating: number;
	seatCapacity: number;
	isElectric: boolean;
	moreImages: ICarGalleryImage[];
	features: string[];
	transmission: "automatic" | "manual";
	status: "available" | "unavailable";
	stock: number;
	isDeleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
