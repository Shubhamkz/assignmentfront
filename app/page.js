"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchArtists = async () => {
    try {
      const response = await axios.get(
        `https://assignmentback-pdc2.onrender.com/artists`
      );

      if (response.data.status === "success") {
        setArtists(response.data.data);
      } else {
        throw new Error(
          `Error while matching response: ${response.data.message}`
        );
      }
    } catch (error) {
      setError(error.message || error.data.message);
      console.log("Error while fetching artists", error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

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
                <tr>
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
