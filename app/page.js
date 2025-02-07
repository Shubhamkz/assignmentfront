"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://assignmentback-pdc2.onrender.com/artists`
      );

      if (response.data.status === "success") {
        setArtists(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error(
          `Error while matching response: ${response.data.message}`
        );
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || error.data.message);
      console.log("Error while fetching artists", error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="relative w-32 h-32">
              <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin duration-300"></div>

              <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[100vh] w-full flex-col">
      <div className="max-w-[70vw] bg-white max-h-96 overflow-y-scroll px-4 py-4">
        <div>
          <div className="flex justify-between">
            <h2 className="font-bold">Add User</h2>
            <button
              onClick={() => router.push("/add-user")}
              className="bg-blue-700 text-white font-bold rounded-sm px-2 py-1"
            >
              Add User
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td className="min-w-32">Artist ID</td>
              <td>Artist Name</td>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => {
              return (
                <tr key={artist.artist_id}>
                  <td>{artist.artist_id}</td>
                  <td>{artist.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
