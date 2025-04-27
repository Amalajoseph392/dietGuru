import React, { useEffect, useState } from "react";

const exists = () => {
  const [loading, setLoading] = useState(true);
  const [planExists, setPlanExists] = useState(false);

  useEffect(() => {
    const checkPlan = async () => {
      try {
        const email = sessionStorage.getItem('user.email');
        if (!email) {
          console.error("No email found in session storage.");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/check-plan?email=${email}`);
        const data = await response.json();

        if (data.planExists) {
          setPlanExists(true);
        } else {
          setPlanExists(false);
        }
      } catch (error) {
        console.error("Error checking plan:", error);
      } finally {
        setLoading(false);
      }
    };

    checkPlan();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {planExists ? (
        <ResultPage />
      ) : (
        <StepperPage />
      )}
    </div>
  );
};

// Dummy components


export default exists;
