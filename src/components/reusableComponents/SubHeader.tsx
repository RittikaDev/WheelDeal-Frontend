interface ISubHeader {
	heading: string;
	className: string;
}

const Subheader = ({ heading, className }: ISubHeader) => {
	return (
		<>
			<h2
				className={`${className} 2xl:text-4xl text-3xl  font-bold  uppercase`}
			>
				{heading}
			</h2>
			<div className="border-b-4 w-20 mx-auto py-2 border-primary"></div>
		</>
	);
};

export default Subheader;
