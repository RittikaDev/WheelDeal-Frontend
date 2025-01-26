interface IHeader {
	header: string;
}

const Header = ({ header }: IHeader) => {
	return (
		<h4 className="text-primary text-xl font-medium uppercase">{header}</h4>
	);
};

export default Header;
