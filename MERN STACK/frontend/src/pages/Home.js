import React, { useEffect } from "react";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutsDetails from "../components/WorkoutsDetails";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("https://mern-stack-ninja.herokuapp.com/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutsDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
