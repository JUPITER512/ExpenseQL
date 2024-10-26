import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/ui/Cards";
import TransactionForm from "../components/ui/TransactionForm";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOG_OUT } from "../graphql/mutations/User.mutation";

import toast from "react-hot-toast";
import { GET_TRANSACTION_STATS } from "../graphql/queries/Transcation.query";
import { useState } from "react";
import { useEffect } from "react";


import {GET_AUTHENTICATED_USER} from '../graphql/queries/User.query.js'

ChartJS.register(ArcElement, Tooltip, Legend);

// const chartData = {
//   labels: ["Saving", "Expense", "Investment"],
//   datasets: [
//     {
//       label: "%",
//       data: [89, 8, 3],
//       backgroundColor: [
//         "rgba(75, 192, 192)",
//         "rgba(255, 99, 132)",
//         "rgba(54, 162, 235)",
//       ],
//       borderColor: [
//         "rgba(75, 192, 192)",
//         "rgba(255, 99, 132)",
//         "rgba(54, 162, 235, 1)",
//       ],
//       borderWidth: 1,
//       borderRadius: 30,
//       spacing: 10,
//       cutout: 120,
//     },
//   ],
// };
const HomePage = () => {
  const {data:authenticatedUserData}=useQuery(GET_AUTHENTICATED_USER)

  const { data } = useQuery(GET_TRANSACTION_STATS);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 120,
      },
    ],
  });

  const [logout, { loading, error, client }] = useMutation(LOG_OUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const handleLogout = async () => {
    try {
      await logout();
      client.resetStore();
    } catch (error) {
      console.log("Error", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = data.categoryStatistics.map(
        (stat) => stat.totalAmount
      );

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "saving") {
          backgroundColors.push("rgba(75, 192, 192)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(54, 162, 235)");
          borderColors.push("rgba(54, 162, 235)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);
  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          <img
            src={authenticatedUserData?.auth.profilePicture}
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
            <Doughnut data={chartData} />
          </div>

          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
