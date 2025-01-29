interface IProps {
	title: string;
}

const DashboardHeading: React.FC<IProps> = ({ title }) => {
	return (
		<div className="flex flex-col mb-10">
			<h1 className="text-2xl font-semibold inline-block relative w-fit">
				{title}
				<span className="absolute left-0 -bottom-2 h-1 bg-primary rounded-full w-1/2"></span>
			</h1>
		</div>
	);
};

export default DashboardHeading;
