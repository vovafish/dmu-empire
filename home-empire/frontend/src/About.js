import React, { useEffect } from "react";
import { RequireAuth } from "./RequireAuth";
import { useNavigate } from "react-router-dom";
function About() {
  //For Auth Checking
  const navigate = useNavigate();
  useEffect(() => {
    const auth = RequireAuth();
    if (!auth) {
      navigate(`/signIn`);
    }
  }, [])
  return (
    <>
      <div className="container">
        <h1>This is About Page</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nulla
          iusto repellendus voluptatum? Molestias, exercitationem culpa harum
          facilis obcaecati iure pariatur praesentium sed inventore. Deserunt
          qui possimus, omnis assumenda eligendi magni rem consequuntur.
          Corporis voluptatum cum rem porro voluptates deleniti quis obcaecati
          itaque explicabo inventore aperiam neque magnam maxime earum ipsum nam
          dolores officia, consequatur quia quam cupiditate, vero debitis fuga.
          Commodi, autem. Quae, modi nihil. Nisi qui animi temporibus tenetur,
          soluta porro quo, dolor corrupti quibusdam enim impedit tempora
          aliquam alias autem assumenda corporis ipsa cum officiis? Corrupti
          quae a earum aliquam nulla vero non nemo, incidunt quis quam.
        </p>
      </div>
    </>
  );
}

export default About;
