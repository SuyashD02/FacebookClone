import { Box } from "@mui/material";
import React, { useState } from "react";
import "./page.css";
import { useNavigate } from "react-router-dom";

function Page() {
  const [pageName, setPageName] = useState("");
  const [pageCategory, setPageCategory] = useState("");
  const [pageBio, setPageBio] = useState("");
  const bearerToken = localStorage.getItem("token");
  const [error,setErrorMessage] =useState("");
  const navigate =useNavigate();

  async function handleCreate() {
    console.log("Function is called");
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${bearerToken}`,
            projectID: "f104bi07c490",
          },
          body: JSON.stringify({
            title: pageName,
            description: pageBio,
          }),
        }
      );
      if (response.ok) {
        console.log("Succecfully SignUp");
        const data = await response.json();
        console.log("CreatePage Data:", data);
        navigate("//createPage/page")

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }
  return (
    <div className="pageContent">
      <Box>
        <section className="pageBox">
          <section className="pageHeader">
            <h3>Create a Page</h3>
          </section>
          <section className="pageNameInput">
            <input
              type="text"
              id="pageName"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="Page name (required)"
            />
            <h3 id="pageNameh3">
              Use the name of your business, brand, or organization, or a name that helps explain your Page.
            </h3>
          </section>
          <section className="pageCategoryInput">
            <input
              type="text"
              id="pageCategory"
              value={pageCategory}
              onChange={(e) => setPageCategory(e.target.value)}
              placeholder="Category (required)"
            />
            <h3 id="pageCategoryh3">Enter a category that best describes you</h3>
          </section>
          <section className="pageBioInput">
            <textarea
              id="pageBio"
              value={pageBio}
              onChange={(e) => setPageBio(e.target.value)}
              placeholder="Bio (optional)"
            ></textarea>
            <h3 id="pageBioh3">Tell people a little about what you do.</h3>
          </section>
          <section className="pageCreateBtn">
            <button className="pageBtn" onClick={handleCreate}>
              Create Page
            </button>
          </section>
        </section>
      </Box>
    </div>
  );
}

export default Page;
