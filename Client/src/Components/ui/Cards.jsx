import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../../graphql/queries/Transcation.query";

const Cards = () => {
	const{data,loading,error}=useQuery(GET_TRANSACTIONS)
	if(error) return <p>Error {error.message}</p>
	if(loading) return <p>Loading...</p>
	console.log(`cards`,data?.transactions)	
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{/* <Card cardType={"saving"} />
				<Card cardType={"expense"} />
				<Card cardType={"investment"} />
				<Card cardType={"investment"} />
				<Card cardType={"saving"} />
				<Card cardType={"expense"} /> */}
				{
					!loading && data?.transactions.map((item,index)=>{
						return <Card key={item?._id} transaction={item}/>
					})
				}
			</div>
				{
					!loading && data?.transactions.length==0 && (
						<p className="text-2xl text-white font-bold text-center w-full">NO Transaction </p>
					)
				}
		</div>
	);
};
export default Cards;