// "use client";
// import { useEffect, useState } from 'react';
// import Button from '@/components/Button';
// import Navbar from '@/components/Navbar';
// import withAuth from "../../hoc/withAuth.js";
// import apiService from '@/components/apiService.js';

// function Leaderboard() {
//     const [leaderboardData, setLeaderboardData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [sortType, setSortType] = useState(null);
//     const [contestId, setContestId] = useState(null); // Contest ID Track Karna

//     useEffect(() => {
//         fetchLeaderboard();
//     }, []);

//     //  Backend se Leaderboard Data Fetch Karna
//     const fetchLeaderboard = async () => {
//         try {
//             const response = await apiService.fetchData("/leaderboard");
//             if (response.data?.contests.length > 0) {
//                 setLeaderboardData(response.data.contests[0].players);
//                 setContestId(response.data.contests[0]._id); //  Contest ID Automatically Fetch
//             } else {
//                 setLeaderboardData([]);
//                 setContestId(null);
//             }
//         } catch (error) {
//             console.error("Error fetching leaderboard:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     //  Scores Calculate Karne Ka Function (Backend Call)
//     const handleCalculateScores = async () => {
//         try {
//             await apiService.postData("/leaderboard/calculate/scores"); //  Match ID Required Nahi Hai!
//             fetchLeaderboard(); //  Data Refresh Karega
//         } catch (error) {
//             console.error("Error calculating scores:", error);
//         }
//     };

//     //  Match Finalize Karne Ka Function (Backend Call)
//     const handleFinalizeMatch = async () => {
//         if (!contestId) {
//             console.error("Contest ID not found!");
//             return;
//         }
//         try {
//             await apiService.postData(`/leaderboard/finalize/${contestId}`);
//             fetchLeaderboard(); // Data Refresh Karega
//         } catch (error) {
//             console.error("Error finalizing match:", error);
//         }
//     };

//     //  Sorting Functionality for Rank, Points, Winning
//     const handleSort = (type) => {
//         setSortType(type);
//         const sortedData = [...leaderboardData].sort((a, b) => {
//             if (type === "rank") return a.rank - b.rank;
//             if (type === "points") return b.score - a.score;
//             if (type === "winning") return b.winning - a.winning;
//             return 0;
//         });
//         setLeaderboardData(sortedData);
//     };

//     if (loading) {
//         return <p className="text-center text-white text-2xl">Loading...</p>;
//     }

//     if (!user) {
//         return <p className="text-center text-white text-2xl">User not found</p>;
//     }

//     return (
//         <div
//             className="min-h-screen pt-20 w-full bg-cover bg-center flex items-center justify-center"
//             style={{
//                 backgroundImage: "url(/Images/leaderboardBackground.jpeg)",
//                 backgroundSize: "cover",
//                 backgroundRepeat: "no-repeat"
//             }}
//         >
//             <Navbar />

//             <div className="w-full max-w-4xl mx-auto text-center p-8 bg-opacity-50 bg-white">
//                 {/* Title Section */}
//                 <div className="text-[#152669DB] sm:text-xl md:text-2xl lg:text-3xl font-alegreya font-semibold">
//                     <div>WHERE PASSION MEETS PERSEVERANCE,</div>
//                     <p>
//                         VICTORY FINDS ITS PLACE ON THE
//                         {' '}
//                         <span className='text-[#305612] font-bold'>LEADERBOARD</span>
//                         {'.'}
//                     </p>
//                 </div>

//                 {/* Leaderboard Data Section */}
//                 <div className="my-5">
//                     <div className="text-2xl font-aleo font-bold">
//                         <div>Hii, {leaderboardData.length > 0 ? leaderboardData[0].username : "User"}</div>
//                     </div >
//                 </div >

//                 {/* Leaderboard Container */}
//                 < div className="bg-[#5672B8]/30 shadow-lg rounded-xl p-3 pb-5" >
//                     <div className="w-1/2 mx-auto">
//                         <Button text='Live Contest' color='white' />
//                     </div>

//                     {/*  Leaderboard Table Section */}
//                     <div className="bg-[#040B29DB]/50 backdrop-blur-md shadow-lg w-full h-28 rounded-lg mt-3 overflow-y-auto">
//                         {loading ? (
//                             <p className="text-white text-xl py-5">Loading...</p>
//                         ) : leaderboardData.length > 0 ? (
//                             <ul className="text-white p-3 text-left">
//                                 {leaderboardData.map((player, index) => (
//                                     <li key={index} className="flex justify-between border-b border-gray-500 p-2">
//                                         <span>#{player.rank}</span>
//                                         <span>{player.username}</span>
//                                         <span>{player.score} pts</span>
//                                         <span className="text-green-400">${player.winning}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p className="text-white text-xl py-5">No Leaderboard Data</p>
//                         )}
//                     </div>

//                     {/*  Sorting & Actions */}
//                     <div className="flex justify-evenly items-center gap-3 font-medium text-white mt-5">
//                         <button onClick={() => handleSort("rank")} className={`bg-[#0A044033] px-4 py-1 rounded-md w-full sm:w-auto ${sortType === "rank" ? "bg-green-500 text-white" : ""}`}>
//                             Rank
//                         </button>
//                         <button onClick={() => handleSort("points")} className={`bg-[#0A044033] text-[#0A0440] px-4 py-1 rounded-md w-full sm:w-auto ${sortType === "points" ? "bg-blue-500 text-white" : ""}`}>
//                             Points
//                         </button>
//                         <button onClick={() => handleSort("winning")} className={`bg-[#0A044033] text-[#305612] px-4 py-1 rounded-md w-full sm:w-auto ${sortType === "winning" ? "bg-yellow-500 text-white" : ""}`}>
//                             Winning
//                         </button>
//                     </div>

//                     {/*  Finalize & Calculate Scores Buttons */}
//                     <div className="flex justify-evenly items-center mt-5">
//                         <button onClick={handleCalculateScores} className="bg-blue-600 text-white px-4 py-2 rounded-md">
//                             Calculate Scores
//                         </button>
//                         <button onClick={handleFinalizeMatch} className="bg-red-600 text-white px-4 py-2 rounded-md">
//                             Finalize Match
//                         </button>
//                     </div>
//                 </div >
//             </div >
//         </div >
//     );
// }

// export default withAuth(Leaderboard);




"use client";
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import withAuth from "../../hoc/withAuth.js";
import apiService from '@/components/apiService.js';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState(null);
    const [contestId, setContestId] = useState(null);
    const [matchId, setMatchId] = useState("65d1b3c8e7a1f8a3b4c2c319"); // ✅ Match ID Track Karna

    // const matchId = "65d1b3c8e7a1f8a3b4c2c319";
    useEffect(() => {
        const match = JSON.parse(localStorage.getItem("matchId")) || '';
        console.log("mere id ", match)
        fetchLeaderboard();
    }, []);

    // const matchId = JSON.parse(localStorage.getItem("matchId")) || null;
    console.log(matchId)


    // ✅ Backend se Leaderboard Data Fetch Karna
    const fetchLeaderboard = async () => {
        try {
            const response = await apiService.fetchData(`/leaderboard?matchId=${matchId}`); // ✅ Match ID send kiya
            if (response.data?.contests.length > 0) {
                setLeaderboardData(response.data.contests[0].players);
                setContestId(response.data.contests[0]._id);
                setMatchId(response.data.contests[0].matchId); // ✅ Match ID Store Karo
            } else {
                setLeaderboardData([]);
                setContestId(null);
                setMatchId(null);
            }
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Scores Calculate Karne Ka Function (Backend Call)
    const handleCalculateScores = async () => {
        if (!matchId) {
            console.error("Match ID not found!");
            return;
        }
        try {
            await apiService.postData("/leaderboard/calculate/scores", { matchId }); // ✅ Match ID Send Karo
            fetchLeaderboard();
        } catch (error) {
            console.error("Error calculating scores:", error);
        }
    };

    // ✅ Match Finalize Karne Ka Function (Backend Call)
    const handleFinalizeMatch = async () => {
        if (!contestId || !matchId) {
            console.error("Contest ID or Match ID not found!");
            return;
        }
        try {
            await apiService.postData(`/leaderboard/finalize/${contestId}`, { matchId }); // ✅ Match ID Send Karo
            fetchLeaderboard();
        } catch (error) {
            console.error("Error finalizing match:", error);
        }
    };

    // ✅ Sorting Functionality
    const handleSort = (type) => {
        setSortType(type);
        const sortedData = [...leaderboardData].sort((a, b) => {
            if (type === "rank") return a.rank - b.rank;
            if (type === "points") return b.score - a.score;
            if (type === "winning") return b.winning - a.winning;
            return 0;
        });
        setLeaderboardData(sortedData);
    };

    if (loading) {
        return <p className="text-center text-white text-2xl">Loading...</p>;
    }

    return (
        <div className="min-h-screen pt-20 w-full bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: "url(/Images/leaderboardBackground.jpeg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Navbar />

            <div className="w-full max-w-4xl mx-auto text-center p-8 bg-opacity-50 bg-white">
                <div className="text-[#152669DB] sm:text-xl md:text-2xl lg:text-3xl font-alegreya font-semibold">
                    <div>WHERE PASSION MEETS PERSEVERANCE,</div>
                    <p>
                        VICTORY FINDS ITS PLACE ON THE
                        <span className='text-[#305612] font-bold'> LEADERBOARD</span>.
                    </p>
                </div>

                <div className="my-5">
                    <div className="text-2xl font-aleo font-bold">
                        <div>Hii, {leaderboardData.length > 0 ? leaderboardData[0].username : "User"}</div>
                    </div>
                </div>

                <div className="bg-[#5672B8]/30 shadow-lg rounded-xl p-3 pb-5">
                    <div className="w-1/2 mx-auto">
                        <Button text='Live Contest' color='white' />
                    </div>

                    <div className="bg-[#040B29DB]/50 backdrop-blur-md shadow-lg w-full h-28 rounded-lg mt-3 overflow-y-auto">
                        {loading ? (
                            <p className="text-white text-xl py-5">Loading...</p>
                        ) : leaderboardData.length > 0 ? (
                            <ul className="text-white p-3 text-left">
                                {leaderboardData.map((player, index) => (
                                    <li key={index} className="flex justify-between border-b border-gray-500 p-2">
                                        <span>#{player.rank}</span>
                                        <span>{player.username}</span>
                                        <span>{player.score} pts</span>
                                        <span className="text-green-400">${player.winning}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white text-xl py-5">No Leaderboard Data</p>
                        )}
                    </div>

                    <div className="flex justify-evenly items-center gap-3 font-medium text-white mt-5">
                        <button onClick={() => handleSort("rank")} className={`bg-[#0A044033] px-4 py-1 rounded-md ${sortType === "rank" ? "bg-green-500 text-white" : ""}`}>
                            Rank
                        </button>
                        <button onClick={() => handleSort("points")} className={`bg-[#0A044033] px-4 py-1 rounded-md ${sortType === "points" ? "bg-blue-500 text-white" : ""}`}>
                            Points
                        </button>
                        <button onClick={() => handleSort("winning")} className={`bg-[#0A044033] px-4 py-1 rounded-md ${sortType === "winning" ? "bg-yellow-500 text-white" : ""}`}>
                            Winning
                        </button>
                    </div>

                    <div className="flex justify-evenly items-center mt-5">
                        <button onClick={handleCalculateScores} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                            Calculate Scores
                        </button>
                        <button onClick={handleFinalizeMatch} className="bg-red-600 text-white px-4 py-2 rounded-md">
                            Finalize Match
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Leaderboard);

