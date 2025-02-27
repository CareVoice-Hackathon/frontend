import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getPublicMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/public-movies");
      const data = await response.json();
      console.log("public movies:", data);
      return data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  return (
    <>
      <main className="flex flex-col container mx-auto h-full px-4 py-8 space-y-8 items-center justify-start self-center justify-self-center z-0">
        <div>dkjf;asjdk</div>

        <div className="space-y-4 w-8/12  items-center z-0 ">
          <h1 className="xl:text-4xl font-bold text-center z-0">
            Now playing & upcoming movies at Theater X
          </h1>

          <Link to={`/record/`}>record</Link>
        </div>
      </main>
    </>
  );
};

export default Landing;
