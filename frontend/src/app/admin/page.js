'use client';

import { useEffect, useState } from 'react';
import apiService from '@/components/apiService';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");

      const matchesData = Array.from({ length: 10 }, (_, i) => ({
        _id: `match${i + 1}`,  
        home_team: `Home Team ${i + 1}`,  
        away_team: `Away Team ${i + 1}`,  
        match_date: new Date().toISOString(),
        status: ["Upcoming", "Live", "Completed"][i % 3]
      }));
      setMatches(matchesData);

      const teamsData = Array.from({ length: 10 }, (_, i) => ({
        _id: `team${i + 1}`,  
        userId: `user${i + 1}`,  
        matchId: `match${Math.ceil((i + 1) / 2)}`,  
        selectedPlayers: Array.from({ length: 6 }, (_, j) => `Player${j + 1}`),  
        substitutes: ["Sub1", "Sub2"],
        totalPoints: Math.floor(Math.random() * 100)
      }));
      setTeams(teamsData);

      const contestsData = Array.from({ length: 10 }, (_, i) => ({
        _id: `contest${i + 1}`,  
        name: `Contest ${i + 1}`,  
        entryFee: Math.floor(Math.random() * 100) + 10,
        maxPlayers: 10,
        prizePool: Math.floor(Math.random() * 5000) + 1000,
        playersJoined: Math.floor(Math.random() * 10),
        matchId: `match${Math.ceil((i + 1) / 2)}`,  
        teams: [`team${Math.ceil((i + 1) / 2)}`],  
        is_full: Math.random() < 0.5
      }));
      setContests(contestsData);
    } catch (error) {
      toast.error("Error fetching data");
      console.error("API Call Failed:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>
      
      <Section title="Matches" data={matches} />
      <Section title="Teams" data={teams} />
      <Section title="Contests" data={contests} />
    </div>
  );
}

function Section({ title, data }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <th key={key} className="border p-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border">
                  {Object.values(item).map((value, i) => (
                    <td key={i} className="border p-2">{String(value)}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%" className="text-center p-4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
 );
}