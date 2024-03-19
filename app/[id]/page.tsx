"use client"
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
	const router = useRouter();
	const [error, setError] = useState<boolean>(false);
	const fetchData = async () => {
		try {
			const { data } = await axios.get(`/api/${params.id}`);
			return data;
		} catch (error) {
			throw new Error("Internal Server Error");
		}
	}

	useEffect(() => {
		fetchData()
			.then((data) => {
				console.log(data);
				router.push(data.data.originalUrl)
			}).catch((error) => {
				setError(true);
			})
		
	}, [params.id]);
		
	return (
		<div className="flex flex-col space-y-2 items-center justify-center h-screen">
			{!error && <LoaderCircle className="animate-spin" size={48} />}
			{!error && <p className="text-2xl sm:text-3xl text-center">
				Loading{" "}
				<a
					className="text-indigo-500 hover:text-indigo-600"
					href="https://souravgoel.com/">
					{`https://souravgoel.com/${params.id}`}
				</a>
			</p>}

			{error && <p className="text-2xl sm:text-3xl text-center">
				Invalid Link!!
				
			</p>}
			
		</div>
	);
}
