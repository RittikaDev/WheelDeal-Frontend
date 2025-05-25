/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
	useGetNewslettersQuery,
	useCreateNewsletterMutation,
	useUpdateNewsletterMutation,
} from "../../redux/features/newsletter/newsletter.api";
import Header from "../../components/reusableComponents/Header";

export default function AdminNewsletter() {
	const { data: newsletters, isLoading } = useGetNewslettersQuery(null);
	const [createNewsletter] = useCreateNewsletterMutation();
	const [updateNewsletter] = useUpdateNewsletterMutation();

	const [form, setForm] = useState({ title: "", content: "" });
	const [editId, setEditId] = useState(null);

	const onChange = (e: any) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const onSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if (editId) {
				await updateNewsletter({ id: editId, ...form }).unwrap();
			} else {
				await createNewsletter(form).unwrap();
			}
			setForm({ title: "", content: "" });
			setEditId(null);
		} catch (err: any) {
			alert(err?.data?.message || err.error);
		}
	};

	const onEdit = (newsletter: any) => {
		setForm({ title: newsletter.title, content: newsletter.content });
		setEditId(newsletter._id);
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="p-4 max-w-3xl mx-auto">
			<div className="text-center space-y-1.5 px-2 mb-8 md:px-0">
				{editId ? (
					<Header header={"Profile"} />
				) : (
					<Header header={"Create Newsletter"} />
				)}
			</div>
			<form onSubmit={onSubmit} className="mb-6">
				<input
					name="title"
					placeholder="Title"
					value={form.title}
					onChange={onChange}
					required
					className="border p-2 w-full mb-3"
				/>
				<textarea
					name="content"
					placeholder="Content"
					value={form.content}
					onChange={onChange}
					required
					rows={5}
					className="border p-2 w-full mb-3"
				/>
				<button type="submit" className="bg-orange-400 text-white p-2 rounded">
					{editId ? "Update" : "Create"}
				</button>
				{editId && (
					<button
						type="button"
						onClick={() => {
							setForm({ title: "", content: "" });
							setEditId(null);
						}}
						className="ml-3 p-2 bg-gray-500 text-white rounded"
					>
						Cancel
					</button>
				)}
			</form>

			<h3 className="mb-3">Newsletters</h3>
			<ul>
				{newsletters.data?.map((nl: any) => (
					<li
						key={nl._id}
						className="border-b py-2 flex justify-between items-center"
					>
						<div>
							<h4 className="font-semibold">{nl.title}</h4>
							<small>{new Date(nl.createdAt).toLocaleString()}</small>
						</div>
						<button
							onClick={() => onEdit(nl)}
							className="bg-primary text-primary-foreground px-3 py-1 rounded-md"
						>
							Edit
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
