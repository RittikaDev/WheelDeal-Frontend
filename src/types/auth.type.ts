type TErrorMessage = {
	message: string;
	path: string;
};

export type TError = {
	data: {
		errorMessages?: TErrorMessage[];
		message: string;
		stack: string;
		success: boolean;
	};

	status: number;
};

export type TUser = {
	name: string;
	email: string;
	password?: string;
	phone?: string;
	address?: string;
	city?: string;
};
